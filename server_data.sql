CREATE DATABASE server_data;
USE server_data;

CREATE TABLE users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);
CREATE TABLE books (
    bookid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    copiesAvailable SMALLINT UNSIGNED
);
CREATE TABLE checkouts (
    checkoutid INT UNSIGNED PRIMARY KEY,
    ofBook VARCHAR(255),
    byUser VARCHAR(255),
    status ENUM('pending', 'issued', 'checkinDenied'),
    FOREIGN KEY (ofBook) REFERENCES books(bookid),
    FOREIGN KEY (byUser) REFERENCES users(username)
    );
