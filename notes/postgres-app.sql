/* Connects to db */
\c sample_db


-- CREATE TABLE users(
--   id uuid primary key,
--   ip cidr,
--   browser text,
--   screenSizeX int,
--   screenSizeY int
-- );

-- Always use text
-- http://blog.jonanin.com/2013/11/20/postgresql-char-varchar/
-- CREATE TABLE logs(
--     id uuid primary key,
--     msg text,
--     type text,
--     url text,
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
-- INSERT INTO "logs" (msg,website,stacktrace,userID) VALUES ('hi there', 'www.google.com', 'stacked', 4);


\dt
-- delete from logs
-- select * from users where id='d86e510e-199a-4883-bde2-1a73f7287266';
-- select * from logs limit 10;

-- select url from logs GROUP BY url limit 10;
-- select url, logdate, type from logs where logdate >= '2016-04-1';

-- select msg from logs group by msg;
-- select msg from logs where logdate >= '2016-04-1' GROUP BY msg;

select distinct msg from logs
where logdate >= '2016-04-09T00:00:00.000Z' AND msg NOT IN (
  SELECT distinct msg from logs where logdate < '2016-04-08T23:59:59.999Z'
);
-- select COUNT(DISTINCT msg) from logs where logdate >= '2016-04-1';


-- drop table logs;
-- drop table users
-- drop table admin