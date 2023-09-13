-- Prevent recreating database
DROP DATABASE IF EXISTS CpccEMS;
DROP USER IF EXISTS 'CpccEMSRoot'@'localhost';
DROP USER IF EXISTS 'CpccEMSAdmin'@'%';

-- Setting configuration
SOURCE ~/Documents/CpccEMS/db/config.sql;

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
CREATE TABLE User(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(64) NOT NULL
);

-- Create IMAGE table
CREATE TABLE Image(
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_data BLOB NOT NULL
);

-- Create ITEM_CLASS table
CREATE TABLE Item_Class(
    item_class_id INT AUTO_INCREMENT PRIMARY KEY,
    item_class_name VARCHAR(25) NOT NULL
);

-- Create ITEM table
CREATE TABLE Item(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(25) NOT NULL,
    item_description VARCHAR(255),
    item_serial_number VARCHAR(25) NOT NULL,
    item_status INT NOT NULL,
    item_class_id INT NOT NULL,
    FOREIGN KEY (item_class_id) REFERENCES Item_Class(item_class_id),
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES Image(image_id)
);

-- Create RENTAL_FORM table
CREATE TABLE RentalForm(
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    renter_name VARCHAR(10) NOT NULL,
    renter_student_id VARCHAR(10) NOT NULL,
    renter_phone_number VARCHAR(10) NOT NULL,
    renter_contact_info VARCHAR(55),
    rental_note VARCHAR(55),
    rental_item_lend_date DATE NOT NULL,
    rental_item_due_date DATE NOT NULL,
    rental_rent INT NOT NULL,
    rental_rent_pay_date DATE NOT NULL,
    rental_item_return_date DATE,
    rental_item_id INT NOT NULL,
    FOREIGN KEY (rental_item_id) REFERENCES Item(item_id)
);

-- Create AbandonedRentalForm
CREATE TABLE AbandonedRentalForm(
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    renter_name VARCHAR(10) NOT NULL,
    renter_student_id VARCHAR(10) NOT NULL,
    renter_phone_number VARCHAR(10) NOT NULL,
    renter_contact_info VARCHAR(55),
    rental_note VARCHAR(55),
    rental_item_lend_date DATE NOT NULL,
    rental_item_due_date DATE NOT NULL,
    rental_rent INT NOT NULL,
    rental_rent_pay_date DATE NOT NULL,
    rental_item_return_date DATE,
    rental_item_id INT NOT NULL,
    FOREIGN KEY (rental_item_id) REFERENCES Item(item_id)
);