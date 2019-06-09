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
    content VARCHAR(300) NOT NULL,
    posX VARCHAR(7) NOT NULL,
    posY VARCHAR(7) NOT NULL,
    categ_id INT,
    PRIMARY KEY (note_id, board_id),
    CONSTRAINT fk_notes_boards FOREIGN KEY(board_id)
    REFERENCES boards(board_id)
    ON DELETE CASCADE
);

DROP TABLE categories;
CREATE TABLE categories(
    categ_id INT NOT NULL AUTO_INCREMENT,
    style VARCHAR(350) NOT NULL,
    title VARCHAR(40) NOT NULL,
    PRIMARY KEY (categ_id)
);

DROP TABLE categ_note;
CREATE TABLE categ_note(
    note_id INT NOT NULL,
    categ_id INT NOT NULL,
    PRIMARY KEY(note_id, categ_id),
    CONSTRAINT fk_categ_categories FOREIGN KEY(categ_id)
    REFERENCES categories(categ_id)
    ON DELETE CASCADE,
    CONSTRAINT fk_categ_notes FOREIGN KEY(note_id)
    REFERENCES notes(note_id)
    ON DELETE CASCADE
);

DROP TABLE groups;
CREATE TABLE groups(
    table_id INT,
    group_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    PRIMARY KEY (group_id)
);

INSERT INTO categories(style, title) VALUES("background-color: #ff65a5;", "violet");
INSERT INTO categories(style, title) VALUES("background-color: #ffce65;", "orange");
INSERT INTO categories(style, title) VALUES("background-color: #65ff72;", "green");
INSERT INTO categories(style, title) VALUES("background-color: #6565ff;", "blue");
INSERT INTO categories(style, title) VALUES("background-color: #ff6565;", "red");
INSERT INTO categories(style, title) VALUES("background-color: #65faff;", "cyan");
INSERT INTO categories(style, title) VALUES("background-color: #c165ff;", "purple");