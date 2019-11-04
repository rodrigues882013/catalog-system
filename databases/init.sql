CREATE DATABASE IF NOT EXISTS `pb`;
USE `pb`;

CREATE TABLE IF NOT EXISTS `pb`.`collection` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `description` varchar(255),
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_collection_id ON collection(id);

CREATE TABLE IF NOT EXISTS `pb`.`disc` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255),
    `collection_id` int NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collection(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_disc_id ON disc(id);
CREATE UNIQUE INDEX idx_disc_collection_id ON disc(collection_id);

CREATE USER 'app'@'192.168.99.100' IDENTIFIED BY 'root';
CREATE USER 'app'@'localhost' IDENTIFIED BY 'root';

GRANT ALL ON `pb`.* TO 'app'@'192.168.99.100';
GRANT ALL ON `pb`.* TO 'app'@'localhost';


