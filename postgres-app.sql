/* Connects to db */
\c sample_db


-- CREATE TABLE webusers(
--   id BIGSERIAL primary key,
--   ip cidr,
--   browser text,
--   screenSizeX int,
--   screenSizeY int
-- );

-- CREATE TABLE logs(
--     id BIGSERIAL primary key,
--     msg text,
--     website text,
--     logDate timestamp default current_timestamp,
--     stacktrace text,
--     webuserID BIGSERIAL references webusers(id)
-- );

-- CREATE TABLE appusers(
--   id BIGSERIAL primary key,
--   email text,
--   username text,
--   password text
-- );



-- drop table appuser,logs,webuser CASCADE;
-- drop table logs;

-- INSERT INTO "webusers" (ip, browser, screenSizeX, screenSizeY) VALUES ('127.0.0.1', 'chrome', 300, 700);
-- INSERT INTO "logs" (msg,website,stacktrace,webuserID) VALUES ('hi there', 'www.google.com', 'stacked', 4);


-- \dt
select * from logs limit 10;
-- drop table logs;