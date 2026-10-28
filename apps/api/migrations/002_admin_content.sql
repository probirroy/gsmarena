CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'moderator')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    token_hash TEXT PRIMARY KEY,
    admin_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_sessions_expiry_idx ON admin_sessions(expires_at);

CREATE TABLE IF NOT EXISTS admin_login_attempts (
    ip_hash TEXT NOT NULL,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_login_attempts_window_idx
    ON admin_login_attempts(ip_hash, attempted_at DESC);

CREATE TABLE IF NOT EXISTS site_settings (
    setting_key TEXT PRIMARY KEY,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE phones
    ADD COLUMN IF NOT EXISTS highlights TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS operating_system TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS ram TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS storage TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS charging TEXT NOT NULL DEFAULT '';

ALTER TABLE articles
    ADD COLUMN IF NOT EXISTS body TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
        CHECK (status IN ('draft', 'published'));

INSERT INTO manufacturers (slug, name, country, description, website)
VALUES
    ('samsung', 'Samsung', 'South Korea', 'Global electronics manufacturer.', 'https://www.samsung.com'),
    ('google', 'Google', 'United States', 'Android device manufacturer.', 'https://store.google.com'),
    ('apple', 'Apple', 'United States', 'Consumer electronics manufacturer.', 'https://www.apple.com'),
    ('oneplus', 'OnePlus', 'China', 'Smartphone and consumer electronics brand.', 'https://www.oneplus.com'),
    ('nothing', 'Nothing', 'United Kingdom', 'Consumer technology manufacturer.', 'https://www.nothing.tech')
ON CONFLICT (slug) DO NOTHING;
