-- following is Data Definition Language (DDL)

-- create new database
CREATE DATABASE "bitly-clone-kp";

-- delete existing database
DROP DATABASE "bitly-clone-kp-2";

-- create new table
CREATE TABLE urls(
	id serial PRIMARY KEY,
	long_url varchar(255) NOT NULL,
	short_url varchar(255) UNIQUE NOT NULL,
	visit_count integer DEFAULT 0 NOT NULL,
	created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
-- eyword 'unique' was added to make each data in the short_url column unique and not duplicate
-- 'NOT NULL' means the data shall not be null
-- 'DEFAULT' means the default data of the column if not stated

-- add new column into existing table
ALTER TABLE urls
ADD COLUMN active boolean;

-- rename existing column in a table
ALTER TABLE urls
RENAME COLUMN long_url TO url;

-- change data type of a column
ALTER TABLE urls
ALTER COLUMN visit_count TYPE integer;

-- delete existing column in a table
ALTER TABLE urls
DROP COLUMN active;

-- delete existing table
DROP TABLE urls_2;