CREATE TABLE IF NOT EXISTS manufacturers (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT,
    description TEXT,
    website TEXT
);

CREATE TABLE IF NOT EXISTS phones (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    manufacturer_id INTEGER REFERENCES manufacturers(id),
    name TEXT NOT NULL,
    launch_price TEXT,
    release_status TEXT,
    display TEXT,
    chipset TEXT,
    battery TEXT,
    camera TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    excerpt TEXT,
    author TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW()
);
