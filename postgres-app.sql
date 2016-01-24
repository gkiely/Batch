/* Connects to db */
\c sample_db


-- CREATE TABLE webuser(
--   id BIGSERIAL primary key,
--   ip cidr,
--   browser text,
--   screenSize text,
--   dateFirstSeen date
-- );

-- CREATE TABLE logs(
--     id BIGSERIAL primary key,
--     msg text,
--     website text,
--     logDate date,
--     stacktrace text,
--     browser text,
--     webuserID BIGSERIAL references webuser(id)
-- );

-- CREATE TABLE appuser(
--   id BIGSERIAL primary key,
--   email text,
--   username text,
--   password text
-- );



-- drop table appuser,logs,webuser CASCADE;


\dt
-- select * from logs limit 10;
-- drop table logs;