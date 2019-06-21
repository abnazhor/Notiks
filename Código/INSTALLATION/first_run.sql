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
    bg_id VARCHAR(200) NOT NULL,
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
    categ_id VARCHAR(25),
    PRIMARY KEY (note_id, board_id),
    CONSTRAINT fk_notes_boards FOREIGN KEY(board_id)
    REFERENCES boards(board_id)
    ON DELETE CASCADE
);

DROP TABLE categories;
CREATE TABLE categories(
    categ_id VARCHAR(25),
    style VARCHAR(350) NOT NULL,
    title VARCHAR(40) NOT NULL,
    PRIMARY KEY (categ_id)
);

DROP TABLE groups;
CREATE TABLE groups(
    group_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    PRIMARY KEY (group_id)
);

DROP TABLE group_note;
CREATE TABLE group_note(
    note_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY(note_id, group_id),
    CONSTRAINT fk_categ_categories FOREIGN KEY(group_id)
    REFERENCES groups(group_id)
    ON DELETE CASCADE,
    CONSTRAINT fk_categ_notes FOREIGN KEY(note_id)
    REFERENCES notes(note_id)
    ON DELETE CASCADE
);

INSERT INTO categories VALUES("categ_1","background-color: #ff65a5;", "Do not forget");
INSERT INTO categories VALUES("categ_2","background-color: #ffce65;", "Warning");
INSERT INTO categories VALUES("categ_3","background-color: #65ff72;", "Others");
INSERT INTO categories VALUES("categ_4","background-color: #6565ff;", "To do");
INSERT INTO categories VALUES("categ_5","background-color: #ff6565;", "Important");
INSERT INTO categories VALUES("categ_6","background-color: #65faff;", "Remember");
INSERT INTO categories VALUES("categ_7","background-color: #c165ff;", "Done");
INSERT INTO categories VALUES("categ_default", "background-color: #ffff;", "Default");

INSERT INTO groups(title) VALUES("Finances");
INSERT INTO groups(title) VALUES("Cooking");
INSERT INTO groups(title) VALUES("Extras");
INSERT INTO groups(title) VALUES("Animals");
INSERT INTO groups(title) VALUES("Food");
INSERT INTO groups(title) VALUES("General");
INSERT INTO groups(title) VALUES("Videogames");

DROP TABLE group_note;
DROP TABLE groups;
DROP TABLE categories;
DROP TABLE notes;
DROP TABLE boards;
DROP TABLE users;