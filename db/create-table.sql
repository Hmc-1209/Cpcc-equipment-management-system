-- Prevent recreating database
DROP DATABASE IF EXISTS CpccEMS;
DROP USER IF EXISTS 'CpccEMSRoot'@'localhost';
DROP USER IF EXISTS 'CpccEMSAdmin'@'%';

-- Setting configuration
SET @db_password = LOAD_FILE('/tmp/config.txt');

CREATE DATABASE CpccEMS;
USE CpccEMS;

-- Create root user
SET @create_user_sql = CONCAT('CREATE USER ''CpccEMSRoot''@''localhost'' IDENTIFIED BY ''', @db_password, ''';');
PREPARE stmt FROM @create_user_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
GRANT ALL PRIVILEGES ON *.* TO 'CpccEMSRoot'@'localhost';

-- Create admin user
SET @create_user_sql = CONCAT('CREATE USER ''CpccEMSAdmin''@''%'' IDENTIFIED BY ''', @db_password, ''';');
PREPARE stmt FROM @create_user_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, EXECUTE, INDEX ON CpccEMS.* TO 'CpccEMSAdmin'@'%';


-- Create USER table
CREATE TABLE User
(
    user_id  INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL
);

-- Create IMAGE table
CREATE TABLE Image
(
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    data     BLOB NOT NULL
);

-- Create ITEM_CLASS table
CREATE TABLE ItemClass
(
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(25) NOT NULL UNIQUE
);

-- Create ITEM table
CREATE TABLE Item
(
    item_id       INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(25) NOT NULL,
    description   VARCHAR(255),
    serial_number VARCHAR(25) NOT NULL,
    model         VARCHAR(25) NOT NULL,
    status        INT         NOT NULL,
    class_id      INT         NOT NULL,
    FOREIGN KEY (class_id) REFERENCES ItemClass (class_id),
    image_id      INT,
    FOREIGN KEY (image_id) REFERENCES Image (image_id)
);

-- Create RENTAL_FORM table
CREATE TABLE RentalForm
(
    rental_id    INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    student_name VARCHAR(16)                           NOT NULL,
    student_id   CHAR(9)                               NOT NULL,
    phone_number CHAR(10)                              NOT NULL,
    contact_info VARCHAR(55),
    note         VARCHAR(55),
    lend_date    DATE                                  NOT NULL,
    due_date     DATE                                  NOT NULL,
    return_date  DATE,
    rent         INT                                   NOT NULL,
    pay_date     DATE                                  NOT NULL,
    status       INT                                   NOT NULL,
    item_id      INT                                   NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Item (item_id)
);