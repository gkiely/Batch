/* Connects to db */
\c sample_db


-- CREATE TABLE logs(
--     id BIGSERIAL,
--     msg text,
--     website text,
--     ip cidr,
--     logDate date,
--     stacktrace text,
--     browser text
-- )
-- appUserID int

select * from logs limit 10;