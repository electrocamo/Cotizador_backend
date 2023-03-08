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
    password  VARCHAR(100) NOT NULL,
    roles VARCHAR(100) 
);

CREATE TABLE cotizaciones (
    nrocotizacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    asesor VARCHAR(100) NOT NULL,
    nitocc VARCHAR(100) NOT NULL,  
    direccion VARCHAR(100) NOT NULL, 
    contacto VARCHAR(100) NOT NULL, 
    correo VARCHAR(100) NOT NULL, 
    telefono VARCHAR(100) NOT NULL,
    abono VARCHAR(100) NOT NULL, 
    nrofactura VARCHAR(100) NOT NULL, 
    producto VARCHAR(100),
    nrocantidad VARCHAR(100),
    material VARCHAR(100),
    calibre VARCHAR(100),
    largo VARCHAR(100),
    ancho VARCHAR(100),
    precioitem VARCHAR(100),
    total VARCHAR(100),
    debe VARCHAR(100),
    cantidadItem VARCHAR(100),
    cliente VARCHAR(100),
    image VARCHAR(100),
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    fechaentrega DATE NOT NULL
);

CREATE TABLE clientes (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    cliente VARCHAR(100) NOT NULL, 
    telefono VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    nitocc VARCHAR(100) NOT NULL, 
    contacto VARCHAR(100) NOT NULL, 
    direccion VARCHAR(100) NOT NULL
);

SHOW tables;

describe clientes;