DROP USER notiks@'localhost';
DROP DATABASE notiks_db;

CREATE USER notiks@'localhost' identified by '12345';
CREATE DATABASE notiks_db;
GRANT ALL PRIVILEGES ON notiks_db.* to notiks@'localhost';

USE notiks_db;
DROP TABLE users;
CREATE TABLE users(
    email VARCHAR(100) NOT NULL,
    name VARCHAR(40) NOT NULL,
    password VARCHAR(250) NOT NULL,
    PRIMARY KEY (email)
);

DROP TABLE boards;
CREATE TABLE boards(
    user_id VARCHAR(100) NOT NULL,
    board_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(35) NOT NULL,
    PRIMARY KEY (board_id),
    CONSTRAINT fk_boards_users FOREIGN KEY(user_id)
    REFERENCES users(email)
    ON DELETE CASCADE
);

DROP TABLE notes;
CREATE TABLE notes(
    board_id INT NOT NULL,
    note_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(35) NOT NULL,
    content VARCHAR(250) NOT NULL,
    categ_id INT,
    PRIMARY KEY (note_id, board_id),
    CONSTRAINT fk_notes_boards FOREIGN KEY(board_id)
    REFERENCES boards(board_id)
    ON DELETE CASCADE
);

DROP TABLE categories;
CREATE TABLE categories(
    user_id VARCHAR(100) NOT NULL,
    categ_id INT NOT NULL,
    style VARCHAR(350) NOT NULL,
    PRIMARY KEY (table_id, categ_id),
    CONSTRAINT fk_categs_users FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

CREATE TABLE groups(
    table_id INT,
    group_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (table_id, group_id)
);

SHOW DATABASES;