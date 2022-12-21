sudo mysql;

SHOW databases;

CREATE DATABASE IF NOT EXISTS backendcotizador;

use backendcotizador;

CREATE TABLE users (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(100) NOT NULL, 
    apellidos VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL, 
    cc VARCHAR(100) NOT NULL, 
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    password  varchar(100) NO NULL,
);

CREATE TABLE cotizaciones (
    nrocotizacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    fechaentrega DATETIME NOT NULL,
    asesor VARCHAR(100) NOT NULL, 
    nitocc VARCHAR(100) NOT NULL, 
    direccion VARCHAR(100) NOT NULL,
    contacto VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    abono VARCHAR(100) NOT NULL,
    nrofactura VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(100) NOT NULL, 
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    nitocc VARCHAR(100) NOT NULL, 
    empresa VARCHAR(100) NOT NULL, 
    direccion VARCHAR(100) NOT NULL
);

SHOW tables;

describe clientes;