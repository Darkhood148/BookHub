CREATE DATABASE server_data
USE server_data

CREATE TABLE users (
    username VARCHAR(31) NOT NULL,
    fullName VARCHAR(63) NOT NULL,
    salt VARCHAR(127) NOT NULL,
);