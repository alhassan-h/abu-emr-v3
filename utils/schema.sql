DROP DATABASE IF EXISTS `HospitalManagementSystem`;

CREATE DATABASE `HospitalManagementSystem`;

USE `HospitalManagementSystem`;

-- Admin Table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_no VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

INSERT INTO `admin` (`first_name`, `last_name`, `email`, `phone_no`, `designation`, `salary`, `address`, `password`)
VALUES ('fatima', 'isah', 'admin@gmail.com', '08198765432', '', '80000', 'kano', '$2b$10$.ofb3M31CIiRmKxVhGNDIeuU85nMQ9nsVVe/Y7X8WgQjPYtj4OdGa');


-- Doctors Table
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    -- phone_no VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    shift_time  VARCHAR(255),
    salary INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

-- Doctor Data
-- INSERT INTO `doctors` (`first_name`, `last_name`, `email`, `specialization`, `salary`, `address`, `password`)
-- VALUES ('alhassan', 'hassan', 'alhassanh@gmail.com', 'gynechologist', '800000', 'zaria', '$2b$10$.ofb3M31CIiRmKxVhGNDIeuU85nMQ9nsVVe/Y7X8WgQjPYtj4OdGa');


-- Employee Table
CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    designation VARCHAR(255) DEFAULT 'employee',
    `address` VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

-- Employee Data
-- INSERT INTO `employee` (`first_name`, `last_name`, `email`, `designation`, `address`, `salary`, `password`)
-- VALUES ('ahmad', 'aliyu', 'ahmada@gmail.com', 'clerk', 'kaduna', '100000', '$2b$10$.ofb3M31CIiRmKxVhGNDIeuU85nMQ9nsVVe/Y7X8WgQjPYtj4OdGa');

-- Patient Table
CREATE TABLE patient (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_no VARCHAR(255) NOT NULL,
    `disease` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

-- Patient Data
-- INSERT INTO `patient` (`first_name`, `last_name`, `email`, `phone_no`, `password`, `disease`, `address`)
-- VALUES ('safiya', 'ahmad', 'safiaa@gmail.com', '08123456789', '$2b$10$.ofb3M31CIiRmKxVhGNDIeuU85nMQ9nsVVe/Y7X8WgQjPYtj4OdGa', 'fever', 'kaduna');


-- Assign_doctor Table
CREATE TABLE assign_doctor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT
);

