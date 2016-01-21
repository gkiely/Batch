/* Connects to db */
\c sample_db



CREATE TABLE people(
    id SERIAL,
    msg text,
    website
    ip
    logDate date,
    stacktrace text,
    browser
    browser size
    FK appUserID
)