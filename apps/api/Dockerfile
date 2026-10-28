FROM rust:1.88-slim-bookworm AS build
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY migrations ./migrations
COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/target/release/techatlas-api /usr/local/bin/techatlas-api
EXPOSE 8080
ENTRYPOINT ["techatlas-api"]
