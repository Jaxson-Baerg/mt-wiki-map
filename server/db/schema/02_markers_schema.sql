DROP TABLE IF EXISTS markers CASCADE;

CREATE TABLE markers (
    id SERIAL PRIMARY KEY NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    thumbnail_photo_url VARCHAR(500),
    rating SMALLINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    public BOOLEAN NOT NULL,
    category VARCHAR(100) NOT NULL
);
