/* Connects to db */
\c sample_db


-- CREATE TABLE users(
--   id uuid primary key,
--   ip cidr,
--   browser text,
--   screenSizeX int,
--   screenSizeY int
-- );

-- CREATE TABLE logs(
--     id uuid primary key,
--     msg text,
--     website text,
--     logDate timestamp default current_timestamp,
--     stacktrace text,
--     userid uuid references users(id)
-- );

-- CREATE TABLE admin(
--   id BIGSERIAL primary key,
--   email text,
--   username text,
--   password text
-- );



-- drop table admin` CASCADE;
-- drop table logs;

-- INSERT INTO "users" (id, ip, browser, screenSizeX, screenSizeY) VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '127.0.0.1', 'chrome', 300, 700);
-- INSERT INTO "logs" (msg,website,stacktrace,webuserID) VALUES ('hi there', 'www.google.com', 'stacked', 4);


\dt
-- select * from users;
-- select * from logs limit 10;


-- drop table logs;
-- drop table users
-- drop table admin