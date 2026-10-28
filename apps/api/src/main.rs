use actix_cors::Cors;
use actix_web::{
    get, http::header, middleware, post, put, web, App, HttpRequest, HttpResponse, HttpServer,
    Responder,
};
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sqlx::{FromRow, PgPool, Row};
use std::{env, str::FromStr, time::Duration};
use uuid::Uuid;

struct AppState {
    pool: PgPool,
    secure_cookie: bool,
}

#[derive(Serialize, FromRow)]
struct AdminView {
    user_id: String,
    display_name: String,
    role: String,
}

#[derive(Deserialize)]
struct LoginInput {
    user_id: String,
    password: String,
}

#[derive(Deserialize)]
struct CreateAdminInput {
    user_id: String,
    display_name: String,
    password: String,
    role: String,
}

#[derive(Deserialize)]
struct PhoneInput {
    name: String,
    manufacturer: String,
    launch_price: String,
    release_status: String,
    display: String,
    chipset: String,
    battery: String,
    camera: String,
    operating_system: String,
    ram: String,
    storage: String,
    charging: String,
    highlights: String,
}

#[derive(Serialize, FromRow)]
struct PhoneRecord {
    slug: String,
    name: String,
    manufacturer: String,
    launch_price: Option<String>,
    release_status: Option<String>,
    display: Option<String>,
    chipset: Option<String>,
    battery: Option<String>,
    camera: Option<String>,
    operating_system: String,
    ram: String,
    storage: String,
    charging: String,
    highlights: String,
}

#[derive(Serialize, FromRow)]
struct ManufacturerRecord {
    slug: String,
    name: String,
    country: Option<String>,
    description: Option<String>,
    website: Option<String>,
}

#[derive(Deserialize)]
struct ArticleInput {
    title: String,
    category: String,
    excerpt: String,
    body: String,
    author: String,
    status: String,
}

#[derive(Serialize, FromRow)]
struct ArticleRecord {
    slug: String,
    title: String,
    category: Option<String>,
    excerpt: Option<String>,
    body: String,
    author: Option<String>,
    status: String,
}

#[derive(Deserialize, Serialize)]
struct BrandingInput {
    brand_name: String,
    logo_text: String,
    hero_title: String,
    accent_color: String,
}

fn json_error(status: actix_web::http::StatusCode, message: &'static str) -> HttpResponse {
    HttpResponse::build(status).json(serde_json::json!({ "error": message }))
}

fn slugify(value: &str) -> String {
    let mut slug = String::new();
    let mut separator = false;
    for ch in value.chars().flat_map(char::to_lowercase) {
        if ch.is_ascii_alphanumeric() {
            slug.push(ch);
            separator = false;
        } else if !separator && !slug.is_empty() {
            slug.push('-');
            separator = true;
        }
    }
    slug.trim_matches('-').to_string()
}

#[cfg(test)]
mod tests {
    use super::slugify;

    #[test]
    fn slugify_normalizes_spaces_and_punctuation() {
        assert_eq!(slugify("Phone Model X!"), "phone-model-x");
    }

    #[test]
    fn slugify_handles_empty_and_repeated_separators() {
        assert_eq!(slugify("  "), "");
        assert_eq!(slugify("A / B"), "a-b");
    }
}

fn token_hash(token: &str) -> String {
    format!("{:x}", Sha256::digest(token.as_bytes()))
}

async fn authenticated_admin(
    request: &HttpRequest,
    pool: &PgPool,
) -> Result<AdminView, HttpResponse> {
    let token = request
        .cookie("ta_admin")
        .map(|cookie| cookie.value().to_string())
        .ok_or_else(|| {
            json_error(
                actix_web::http::StatusCode::UNAUTHORIZED,
                "Admin login required",
            )
        })?;
    let row = sqlx::query_as::<_, AdminView>(
        "SELECT u.user_id, u.display_name, u.role
         FROM admin_sessions s
         JOIN admin_users u ON u.id = s.admin_id
         WHERE s.token_hash = $1 AND s.expires_at > NOW()",
    )
    .bind(token_hash(&token))
    .fetch_optional(pool)
    .await
    .map_err(|error| {
        eprintln!("admin session lookup failed: {error}");
        json_error(
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            "Unable to verify admin session",
        )
    })?
    .ok_or_else(|| {
        json_error(
            actix_web::http::StatusCode::UNAUTHORIZED,
            "Admin session expired",
        )
    })?;

    if row.role != "admin" {
        return Err(json_error(
            actix_web::http::StatusCode::FORBIDDEN,
            "Administrator permission required",
        ));
    }
    Ok(row)
}

fn valid_text(value: &str, max_len: usize) -> bool {
    !value.trim().is_empty() && value.len() <= max_len
}

fn set_session_cookie(response: &mut HttpResponse, token: &str, secure: bool) {
    let mut value = format!(
        "ta_admin={token}; HttpOnly; SameSite=Strict; Path=/; Max-Age={}",
        60 * 60 * 12
    );
    if secure {
        value.push_str("; Secure");
    }
    response.headers_mut().insert(
        header::SET_COOKIE,
        header::HeaderValue::from_str(&value).expect("valid session cookie header"),
    );
}

async fn record_failed_login(pool: &PgPool, ip_hash: &str) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM admin_login_attempts WHERE attempted_at < NOW() - INTERVAL '1 day'")
        .execute(pool)
        .await?;
    sqlx::query("INSERT INTO admin_login_attempts (ip_hash) VALUES ($1)")
        .bind(ip_hash)
        .execute(pool)
        .await?;
    Ok(())
}

#[get("/health")]
async fn health(state: web::Data<AppState>) -> impl Responder {
    match sqlx::query("SELECT 1").execute(&state.pool).await {
        Ok(_) => HttpResponse::Ok().json(serde_json::json!({
            "status": "ok",
            "service": "techatlas-api",
            "database": "ready"
        })),
        Err(error) => {
            eprintln!("readiness check failed: {error}");
            json_error(
                actix_web::http::StatusCode::SERVICE_UNAVAILABLE,
                "Database is unavailable",
            )
        }
    }
}

#[post("/api/v1/auth/login")]
async fn login(
    state: web::Data<AppState>,
    request: HttpRequest,
    input: web::Json<LoginInput>,
) -> HttpResponse {
    if !valid_text(&input.user_id, 80) || !valid_text(&input.password, 256) {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Invalid login details",
        );
    }

    let remote_address = request
        .peer_addr()
        .map(|address| address.ip().to_string())
        .unwrap_or_else(|| "unknown".to_string());
    let remote_hash = token_hash(&remote_address);
    let recent_attempts = match sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM admin_login_attempts
         WHERE ip_hash=$1 AND attempted_at > NOW() - INTERVAL '15 minutes'",
    )
    .bind(&remote_hash)
    .fetch_one(&state.pool)
    .await
    {
        Ok(count) => count,
        Err(error) => {
            eprintln!("admin login throttle lookup failed: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to process sign-in",
            );
        }
    };
    if recent_attempts >= 10 {
        return json_error(
            actix_web::http::StatusCode::TOO_MANY_REQUESTS,
            "Too many sign-in attempts. Try again in 15 minutes.",
        );
    }

    let row = match sqlx::query("SELECT id, password_hash FROM admin_users WHERE user_id = $1")
        .bind(input.user_id.trim())
        .fetch_optional(&state.pool)
        .await
    {
        Ok(Some(row)) => row,
        Ok(None) => {
            if let Err(error) = record_failed_login(&state.pool, &remote_hash).await {
                eprintln!("failed admin login attempt could not be recorded: {error}");
                return json_error(
                    actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                    "Unable to process sign-in",
                );
            }
            return json_error(
                actix_web::http::StatusCode::UNAUTHORIZED,
                "Invalid admin ID or password",
            );
        }
        Err(error) => {
            eprintln!("admin login lookup failed: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to sign in",
            );
        }
    };

    let admin_id: i64 = row.get("id");
    let password_hash: String = row.get("password_hash");
    let parsed_hash = match PasswordHash::new(&password_hash) {
        Ok(hash) => hash,
        Err(error) => {
            eprintln!("stored admin password hash is invalid: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to verify credentials",
            );
        }
    };
    if Argon2::default()
        .verify_password(input.password.as_bytes(), &parsed_hash)
        .is_err()
    {
        if let Err(error) = record_failed_login(&state.pool, &remote_hash).await {
            eprintln!("failed admin login attempt could not be recorded: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to process sign-in",
            );
        }
        return json_error(
            actix_web::http::StatusCode::UNAUTHORIZED,
            "Invalid admin ID or password",
        );
    }

    if let Err(error) = sqlx::query("DELETE FROM admin_login_attempts WHERE ip_hash=$1")
        .bind(&remote_hash)
        .execute(&state.pool)
        .await
    {
        eprintln!("admin login attempt cleanup failed: {error}");
    }

    let token = Uuid::new_v4().simple().to_string();
    if let Err(error) = sqlx::query(
        "INSERT INTO admin_sessions (token_hash, admin_id, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '12 hours')",
    )
    .bind(token_hash(&token))
    .bind(admin_id)
    .execute(&state.pool)
    .await
    {
        eprintln!("admin session creation failed: {error}");
        return json_error(
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            "Unable to create admin session",
        );
    }

    let mut response = HttpResponse::Ok().json(serde_json::json!({ "signed_in": true }));
    set_session_cookie(&mut response, &token, state.secure_cookie);
    response
}

#[post("/api/v1/auth/logout")]
async fn logout(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    if let Some(cookie) = request.cookie("ta_admin") {
        if let Err(error) = sqlx::query("DELETE FROM admin_sessions WHERE token_hash = $1")
            .bind(token_hash(cookie.value()))
            .execute(&state.pool)
            .await
        {
            eprintln!("admin logout failed: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to end session",
            );
        }
    }
    let mut response = HttpResponse::Ok().json(serde_json::json!({ "signed_in": false }));
    response.headers_mut().insert(
        header::SET_COOKIE,
        header::HeaderValue::from_static("ta_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"),
    );
    response
}

#[get("/api/v1/admin/me")]
async fn admin_me(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    match authenticated_admin(&request, &state.pool).await {
        Ok(admin) => HttpResponse::Ok().json(admin),
        Err(response) => response,
    }
}

#[get("/api/v1/admin/users")]
async fn admin_users(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query_as::<_, AdminView>(
        "SELECT user_id, display_name, role FROM admin_users ORDER BY created_at",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok().json(rows),
        Err(error) => {
            eprintln!("admin list failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load admin accounts",
            )
        }
    }
}

#[post("/api/v1/admin/users")]
async fn create_admin(
    state: web::Data<AppState>,
    request: HttpRequest,
    input: web::Json<CreateAdminInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.user_id, 80)
        || !valid_text(&input.display_name, 120)
        || input.password.len() < 12
        || input.role != "admin"
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Provide a valid administrator ID and name, with a password of at least 12 characters",
        );
    }

    let salt = SaltString::generate(&mut OsRng);
    let hash = match Argon2::default().hash_password(input.password.as_bytes(), &salt) {
        Ok(value) => value.to_string(),
        Err(error) => {
            eprintln!("admin password hashing failed: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to create admin account",
            );
        }
    };
    match sqlx::query_as::<_, AdminView>(
        "INSERT INTO admin_users (user_id, display_name, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING user_id, display_name, role",
    )
    .bind(input.user_id.trim())
    .bind(input.display_name.trim())
    .bind(hash)
    .bind(&input.role)
    .fetch_one(&state.pool)
    .await
    {
        Ok(admin) => HttpResponse::Created().json(admin),
        Err(error) if error.to_string().contains("duplicate key") => json_error(
            actix_web::http::StatusCode::CONFLICT,
            "That admin ID already exists",
        ),
        Err(error) => {
            eprintln!("admin account creation failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to create admin account",
            )
        }
    }
}

#[get("/api/v1/admin/phones")]
async fn admin_phones(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query_as::<_, PhoneRecord>(
        "SELECT p.slug, p.name, m.slug AS manufacturer, p.launch_price, p.release_status,
                p.display, p.chipset, p.battery, p.camera, p.operating_system, p.ram,
                p.storage, p.charging, p.highlights
         FROM phones p JOIN manufacturers m ON m.id = p.manufacturer_id
         ORDER BY p.created_at DESC",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok().json(rows),
        Err(error) => {
            eprintln!("admin phone list failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load phones",
            )
        }
    }
}

#[post("/api/v1/admin/phones")]
async fn create_phone(
    state: web::Data<AppState>,
    request: HttpRequest,
    input: web::Json<PhoneInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.name, 160)
        || !valid_text(&input.manufacturer, 80)
        || !["Released", "Upcoming", "Rumored"].contains(&input.release_status.as_str())
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Phone name, manufacturer, or release status is invalid",
        );
    }
    let slug = slugify(&input.name);
    if slug.is_empty() {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Phone name must contain letters or numbers",
        );
    }
    match sqlx::query(
        "INSERT INTO phones
         (slug, manufacturer_id, name, launch_price, release_status, display, chipset, battery, camera,
          operating_system, ram, storage, charging, highlights)
         SELECT $1, id, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
         FROM manufacturers WHERE slug = $14",
    )
    .bind(&slug)
    .bind(input.name.trim())
    .bind(&input.launch_price)
    .bind(&input.release_status)
    .bind(&input.display)
    .bind(&input.chipset)
    .bind(&input.battery)
    .bind(&input.camera)
    .bind(&input.operating_system)
    .bind(&input.ram)
    .bind(&input.storage)
    .bind(&input.charging)
    .bind(&input.highlights)
    .bind(slugify(&input.manufacturer))
    .execute(&state.pool)
    .await
    {
        Ok(result) if result.rows_affected() == 1 => {
            HttpResponse::Created().json(serde_json::json!({ "slug": slug }))
        }
        Ok(_) => json_error(actix_web::http::StatusCode::BAD_REQUEST, "Manufacturer was not found"),
        Err(error) if error.to_string().contains("duplicate key") => {
            json_error(actix_web::http::StatusCode::CONFLICT, "A phone with that name already exists")
        }
        Err(error) => {
            eprintln!("phone creation failed: {error}");
            json_error(actix_web::http::StatusCode::INTERNAL_SERVER_ERROR, "Unable to save phone")
        }
    }
}

#[put("/api/v1/admin/phones/{slug}")]
async fn update_phone(
    state: web::Data<AppState>,
    request: HttpRequest,
    slug: web::Path<String>,
    input: web::Json<PhoneInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.name, 160)
        || !valid_text(&input.manufacturer, 80)
        || !["Released", "Upcoming", "Rumored"].contains(&input.release_status.as_str())
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Phone name, manufacturer, or release status is invalid",
        );
    }
    match sqlx::query(
        "UPDATE phones p SET
            name=$2, launch_price=$3, release_status=$4, display=$5, chipset=$6, battery=$7, camera=$8,
            operating_system=$9, ram=$10, storage=$11, charging=$12, highlights=$13,
            manufacturer_id=(SELECT id FROM manufacturers WHERE slug=$14)
         WHERE p.slug=$1 AND EXISTS (SELECT 1 FROM manufacturers WHERE slug=$14)",
    )
    .bind(slug.as_str())
    .bind(input.name.trim())
    .bind(&input.launch_price)
    .bind(&input.release_status)
    .bind(&input.display)
    .bind(&input.chipset)
    .bind(&input.battery)
    .bind(&input.camera)
    .bind(&input.operating_system)
    .bind(&input.ram)
    .bind(&input.storage)
    .bind(&input.charging)
    .bind(&input.highlights)
    .bind(slugify(&input.manufacturer))
    .execute(&state.pool)
    .await
    {
        Ok(result) if result.rows_affected() == 1 => HttpResponse::Ok().finish(),
        Ok(_) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Phone or manufacturer not found"),
        Err(error) => {
            eprintln!("phone update failed: {error}");
            json_error(actix_web::http::StatusCode::INTERNAL_SERVER_ERROR, "Unable to update phone")
        }
    }
}

#[actix_web::delete("/api/v1/admin/phones/{slug}")]
async fn delete_phone(
    state: web::Data<AppState>,
    request: HttpRequest,
    slug: web::Path<String>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query("DELETE FROM phones WHERE slug = $1")
        .bind(slug.as_str())
        .execute(&state.pool)
        .await
    {
        Ok(result) if result.rows_affected() == 1 => HttpResponse::NoContent().finish(),
        Ok(_) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Phone not found"),
        Err(error) => {
            eprintln!("phone deletion failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to delete phone",
            )
        }
    }
}

#[get("/api/v1/admin/articles")]
async fn admin_articles(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query_as::<_, ArticleRecord>(
        "SELECT slug, title, category, excerpt, body, author, status FROM articles ORDER BY published_at DESC",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok().json(rows),
        Err(error) => {
            eprintln!("admin article list failed: {error}");
            json_error(actix_web::http::StatusCode::INTERNAL_SERVER_ERROR, "Unable to load articles")
        }
    }
}

#[post("/api/v1/admin/articles")]
async fn create_article(
    state: web::Data<AppState>,
    request: HttpRequest,
    input: web::Json<ArticleInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.title, 240)
        || !valid_text(&input.author, 120)
        || !["draft", "published"].contains(&input.status.as_str())
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Article title, author, or status is invalid",
        );
    }
    let slug = slugify(&input.title);
    match sqlx::query(
        "INSERT INTO articles (slug, title, category, excerpt, body, author, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)",
    )
    .bind(&slug)
    .bind(input.title.trim())
    .bind(&input.category)
    .bind(&input.excerpt)
    .bind(&input.body)
    .bind(input.author.trim())
    .bind(&input.status)
    .execute(&state.pool)
    .await
    {
        Ok(_) => HttpResponse::Created().json(serde_json::json!({ "slug": slug })),
        Err(error) if error.to_string().contains("duplicate key") => json_error(
            actix_web::http::StatusCode::CONFLICT,
            "An article with that title already exists",
        ),
        Err(error) => {
            eprintln!("article creation failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to save article",
            )
        }
    }
}

#[put("/api/v1/admin/articles/{slug}")]
async fn update_article(
    state: web::Data<AppState>,
    request: HttpRequest,
    slug: web::Path<String>,
    input: web::Json<ArticleInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.title, 240)
        || !valid_text(&input.author, 120)
        || !["draft", "published"].contains(&input.status.as_str())
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Article title, author, or status is invalid",
        );
    }
    match sqlx::query(
        "UPDATE articles SET title=$2, category=$3, excerpt=$4, body=$5, author=$6, status=$7
         WHERE slug=$1",
    )
    .bind(slug.as_str())
    .bind(input.title.trim())
    .bind(&input.category)
    .bind(&input.excerpt)
    .bind(&input.body)
    .bind(input.author.trim())
    .bind(&input.status)
    .execute(&state.pool)
    .await
    {
        Ok(result) if result.rows_affected() == 1 => HttpResponse::Ok().finish(),
        Ok(_) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Article not found"),
        Err(error) => {
            eprintln!("article update failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to update article",
            )
        }
    }
}

#[actix_web::delete("/api/v1/admin/articles/{slug}")]
async fn delete_article(
    state: web::Data<AppState>,
    request: HttpRequest,
    slug: web::Path<String>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query("DELETE FROM articles WHERE slug = $1")
        .bind(slug.as_str())
        .execute(&state.pool)
        .await
    {
        Ok(result) if result.rows_affected() == 1 => HttpResponse::NoContent().finish(),
        Ok(_) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Article not found"),
        Err(error) => {
            eprintln!("article deletion failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to delete article",
            )
        }
    }
}

#[get("/api/v1/admin/branding")]
async fn get_branding(state: web::Data<AppState>, request: HttpRequest) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    match sqlx::query_scalar::<_, serde_json::Value>(
        "SELECT setting_value FROM site_settings WHERE setting_key='branding'",
    )
    .fetch_optional(&state.pool)
    .await
    {
        Ok(Some(value)) => HttpResponse::Ok().json(value),
        Ok(None) => HttpResponse::Ok().json(serde_json::json!({
            "brand_name": "TechAtlas",
            "logo_text": "T",
            "hero_title": "Find the right phone faster.",
            "accent_color": "#2563eb"
        })),
        Err(error) => {
            eprintln!("branding load failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load site branding",
            )
        }
    }
}

#[put("/api/v1/admin/branding")]
async fn save_branding(
    state: web::Data<AppState>,
    request: HttpRequest,
    input: web::Json<BrandingInput>,
) -> HttpResponse {
    if let Err(response) = authenticated_admin(&request, &state.pool).await {
        return response;
    }
    if !valid_text(&input.brand_name, 80)
        || !valid_text(&input.logo_text, 3)
        || !valid_text(&input.hero_title, 160)
        || input.accent_color.len() != 7
        || !input.accent_color.is_ascii()
        || !input.accent_color.starts_with('#')
        || !input.accent_color[1..]
            .chars()
            .all(|ch| ch.is_ascii_hexdigit())
    {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Branding values are invalid",
        );
    }
    let setting_value = match serde_json::to_value(&*input) {
        Ok(value) => value,
        Err(error) => {
            eprintln!("branding serialization failed: {error}");
            return json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to save site branding",
            );
        }
    };
    match sqlx::query(
        "INSERT INTO site_settings (setting_key, setting_value, updated_at)
         VALUES ('branding', $1, NOW())
         ON CONFLICT (setting_key) DO UPDATE
         SET setting_value=EXCLUDED.setting_value, updated_at=NOW()",
    )
    .bind(setting_value)
    .execute(&state.pool)
    .await
    {
        Ok(_) => HttpResponse::Ok().json(&*input),
        Err(error) => {
            eprintln!("branding save failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to save site branding",
            )
        }
    }
}

#[get("/api/v1/phones")]
async fn public_phones(state: web::Data<AppState>) -> HttpResponse {
    match sqlx::query_as::<_, PhoneRecord>(
        "SELECT p.slug, p.name, m.slug AS manufacturer, p.launch_price, p.release_status,
                p.display, p.chipset, p.battery, p.camera, p.operating_system, p.ram,
                p.storage, p.charging, p.highlights
         FROM phones p JOIN manufacturers m ON m.id = p.manufacturer_id
         ORDER BY p.created_at DESC",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok()
            .insert_header((
                header::CACHE_CONTROL,
                "public, max-age=60, stale-while-revalidate=300",
            ))
            .json(rows),
        Err(error) => {
            eprintln!("public phone list failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load phones",
            )
        }
    }
}

#[get("/api/v1/phones/{slug}")]
async fn public_phone(state: web::Data<AppState>, slug: web::Path<String>) -> HttpResponse {
    match sqlx::query_as::<_, PhoneRecord>(
        "SELECT p.slug, p.name, m.slug AS manufacturer, p.launch_price, p.release_status,
                p.display, p.chipset, p.battery, p.camera, p.operating_system, p.ram,
                p.storage, p.charging, p.highlights
         FROM phones p JOIN manufacturers m ON m.id = p.manufacturer_id
         WHERE p.slug=$1",
    )
    .bind(slug.as_str())
    .fetch_optional(&state.pool)
    .await
    {
        Ok(Some(phone)) => HttpResponse::Ok()
            .insert_header((header::CACHE_CONTROL, "public, max-age=60"))
            .json(phone),
        Ok(None) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Phone not found"),
        Err(error) => {
            eprintln!("public phone lookup failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load phone",
            )
        }
    }
}

#[get("/api/v1/manufacturers")]
async fn public_manufacturers(state: web::Data<AppState>) -> HttpResponse {
    match sqlx::query_as::<_, ManufacturerRecord>(
        "SELECT slug, name, country, description, website
         FROM manufacturers ORDER BY name",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok()
            .insert_header((header::CACHE_CONTROL, "public, max-age=300"))
            .json(rows),
        Err(error) => {
            eprintln!("public manufacturer list failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load manufacturers",
            )
        }
    }
}

#[get("/api/v1/search/phones")]
async fn search_phones(
    state: web::Data<AppState>,
    query: web::Query<std::collections::HashMap<String, String>>,
) -> HttpResponse {
    let term = query.get("q").map(String::as_str).unwrap_or("").trim();
    if term.is_empty() || term.len() > 100 {
        return json_error(
            actix_web::http::StatusCode::BAD_REQUEST,
            "Search query must contain 1 to 100 characters",
        );
    }
    let pattern = format!("%{term}%");
    let manufacturer = query
        .get("brand")
        .cloned()
        .filter(|value| !value.is_empty());
    match sqlx::query_as::<_, PhoneRecord>(
        "SELECT p.slug, p.name, m.slug AS manufacturer, p.launch_price, p.release_status,
                p.display, p.chipset, p.battery, p.camera, p.operating_system, p.ram,
                p.storage, p.charging, p.highlights
         FROM phones p JOIN manufacturers m ON m.id = p.manufacturer_id
         WHERE ($1::TEXT IS NULL OR m.slug=$1)
           AND (p.name ILIKE $2 OR m.name ILIKE $2 OR p.display ILIKE $2
                OR p.chipset ILIKE $2 OR p.battery ILIKE $2 OR p.camera ILIKE $2)
         ORDER BY p.created_at DESC LIMIT 50",
    )
    .bind(manufacturer)
    .bind(pattern)
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok().json(rows),
        Err(error) => {
            eprintln!("phone search failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to search phones",
            )
        }
    }
}

#[get("/api/v1/articles")]
async fn public_articles(state: web::Data<AppState>) -> HttpResponse {
    match sqlx::query_as::<_, ArticleRecord>(
        "SELECT slug, title, category, excerpt, body, author, status FROM articles
         WHERE status='published' ORDER BY published_at DESC",
    )
    .fetch_all(&state.pool)
    .await
    {
        Ok(rows) => HttpResponse::Ok()
            .insert_header((
                header::CACHE_CONTROL,
                "public, max-age=60, stale-while-revalidate=300",
            ))
            .json(rows),
        Err(error) => {
            eprintln!("public article list failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load articles",
            )
        }
    }
}

#[get("/api/v1/articles/{slug}")]
async fn public_article(state: web::Data<AppState>, slug: web::Path<String>) -> HttpResponse {
    match sqlx::query_as::<_, ArticleRecord>(
        "SELECT slug, title, category, excerpt, body, author, status FROM articles
         WHERE status='published' AND slug=$1",
    )
    .bind(slug.as_str())
    .fetch_optional(&state.pool)
    .await
    {
        Ok(Some(article)) => HttpResponse::Ok()
            .insert_header((header::CACHE_CONTROL, "public, max-age=60"))
            .json(article),
        Ok(None) => json_error(actix_web::http::StatusCode::NOT_FOUND, "Article not found"),
        Err(error) => {
            eprintln!("public article lookup failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load article",
            )
        }
    }
}

#[get("/api/v1/branding")]
async fn public_branding(state: web::Data<AppState>) -> HttpResponse {
    match sqlx::query_scalar::<_, serde_json::Value>(
        "SELECT setting_value FROM site_settings WHERE setting_key='branding'",
    )
    .fetch_optional(&state.pool)
    .await
    {
        Ok(Some(value)) => HttpResponse::Ok()
            .insert_header((
                header::CACHE_CONTROL,
                "public, max-age=60, stale-while-revalidate=300",
            ))
            .json(value),
        Ok(None) => HttpResponse::Ok()
            .insert_header((header::CACHE_CONTROL, "public, max-age=60"))
            .json(serde_json::json!({
                "brand_name": "TechAtlas",
                "logo_text": "T",
                "hero_title": "Find the right phone faster.",
                "accent_color": "#2563eb"
            })),
        Err(error) => {
            eprintln!("public branding load failed: {error}");
            json_error(
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to load site branding",
            )
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url)
        .await
        .expect("unable to connect to PostgreSQL");
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("database migrations failed");

    let bootstrap_user = env::var("ADMIN_ID").ok();
    let bootstrap_password = env::var("ADMIN_PASSWORD").ok();
    match (bootstrap_user, bootstrap_password) {
        (Some(user_id), Some(password)) if password.len() >= 12 => {
            let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM admin_users")
                .fetch_one(&pool)
                .await
                .expect("unable to inspect admin account state");
            if count == 0 {
                let salt = SaltString::generate(&mut OsRng);
                let hash = Argon2::default()
                    .hash_password(password.as_bytes(), &salt)
                    .expect("unable to hash bootstrap password")
                    .to_string();
                sqlx::query(
                    "INSERT INTO admin_users (user_id, display_name, password_hash, role)
                     VALUES ($1, 'Administrator', $2, 'admin')",
                )
                .bind(user_id)
                .bind(hash)
                .execute(&pool)
                .await
                .expect("unable to create bootstrap administrator");
                println!("Created initial administrator from ADMIN_ID/ADMIN_PASSWORD.");
            }
        }
        (Some(_), Some(_)) => panic!("ADMIN_PASSWORD must contain at least 12 characters"),
        _ => println!("No initial admin bootstrap requested. Set ADMIN_ID and ADMIN_PASSWORD before first startup."),
    }

    let state = web::Data::new(AppState {
        pool,
        secure_cookie: env::var("COOKIE_SECURE")
            .map(|value| value == "true")
            .unwrap_or(false),
    });
    let allowed_origin =
        env::var("WEB_ORIGIN").unwrap_or_else(|_| "http://localhost:4321".to_string());

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&allowed_origin)
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![header::CONTENT_TYPE, header::ACCEPT])
            .supports_credentials()
            .max_age(600);
        App::new()
            .app_data(state.clone())
            .app_data(web::JsonConfig::default().limit(64 * 1024))
            .wrap(middleware::Logger::default())
            .wrap(cors)
            .service(health)
            .service(login)
            .service(logout)
            .service(admin_me)
            .service(admin_users)
            .service(create_admin)
            .service(admin_phones)
            .service(create_phone)
            .service(update_phone)
            .service(delete_phone)
            .service(admin_articles)
            .service(create_article)
            .service(update_article)
            .service(delete_article)
            .service(get_branding)
            .service(save_branding)
            .service(public_phones)
            .service(public_phone)
            .service(public_manufacturers)
            .service(search_phones)
            .service(public_articles)
            .service(public_article)
            .service(public_branding)
    })
    .keep_alive(Duration::from_secs(30))
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
