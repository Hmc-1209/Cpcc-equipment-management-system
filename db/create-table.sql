-- Prevent recreating database
DROP DATABASE IF EXISTS CpccEMS;
DROP USER IF EXISTS 'CpccEMSRoot'@'localhost';
DROP USER IF EXISTS 'CpccEMSAdmin'@'%';

-- Setting configuration
SOURCE /tmp/CpccEMSconfig.sql;

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

-- Create ITEM_CLASS table
CREATE TABLE ItemClass
(
    class_id   INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Model
(
    model_id   INT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(25) NOT NULL UNIQUE,
    class_id   INT         NOT NULL,
    FOREIGN KEY (class_id) REFERENCES ItemClass (class_id)
);

-- Create ITEM table
CREATE TABLE Item
(
    item_id       INT AUTO_INCREMENT PRIMARY KEY,
    item_name     VARCHAR(25) NOT NULL,
    description   VARCHAR(255),
    serial_number VARCHAR(25) NOT NULL,
    status        INT         NOT NULL,
    model_id      INT         NOT NULL,
    FOREIGN KEY (model_id) REFERENCES Model (model_id),
    image         BLOB
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