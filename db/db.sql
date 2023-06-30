-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: backendcotizador
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nitocc` varchar(100) NOT NULL,
  `contacto` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `documentType` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `index_users` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Alonzo Moncada','2167656','arturocalle123@gmail.com','7654376678','3942944898','calle 45 #45-21',''),(10,'Antonio Uribe Gonzales','2315898','antoni123@gmail.com','7654376690','3023833989','calle 33a #33-37',''),(11,'Diego Herazo','4123456','diegoherazo@hotmail.com','1234567890','3001234567','Cra 1   2 3',''),(12,'juan galvis','4563219','hola@mail.com','987654321','3009876543','cr 1   2 3',''),(13,'Adrian camilo ','222','electrocamo@gmail.com','71293664','3136948249','calle 75 sur # 33-03',''),(15,'pablo','123412341','asdf@asdf.com','123456','12354123','cr 1   4 5',''),(17,'Marco Fidel Herrera','3217519951','p_h900@hotmail.com','3490364','3217519951','Gomez Plata',''),(18,'Cordoblez MA SAS ','2328954','facturacioelectronica@cordoblez.com','900682026-1','3108993009','Calle 39 52 a 26 Medellín',''),(24,'REMMAQ SAS','3108954971','gerencia.remmaq@gmail.com','900333282-4','3108954971','Calle 60 sur # 44-06',''),(25,'Diana Arboleda','2328954','dcaritoq@hotmail.com','43278587','3108993009','calle 19 # 57 22',''),(26,'Maria Inirida Machado Correa','300665381','miniridamc@yahoo.es','42964797','300665381','CRA 65 # 5 a 42',''),(27,'SISDECAR SAS','3665931','sisdecar@hotmail.com','900333282','3148908548','Carrera 52 # 117-15',''),(30,'Alejandro Alex','2435676','andersonhernandez2001@gmail.com','1001139591','3126847590','calle 45 #45-21','Cedula de ciudadania');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cotizaciones` (
  `nrocotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `asesor` varchar(100) DEFAULT NULL,
  `nitocc` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `contacto` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `abono` varchar(100) DEFAULT '0',
  `nrofactura` varchar(100) DEFAULT NULL,
  `total` varchar(100) DEFAULT NULL,
  `debe` varchar(100) DEFAULT NULL,
  `cantidadItem` varchar(100) DEFAULT NULL,
  `cliente` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaentrega` datetime DEFAULT NULL,
  `preciofinal` varchar(100) NOT NULL,
  `itemfinal` varchar(100) NOT NULL,
  `estado` enum('cotizado','aprobado','terminado','facturado','entregado') NOT NULL DEFAULT 'cotizado',
  `observation` varchar(100) DEFAULT NULL,
  `documentType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nrocotizacion`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
INSERT INTO `cotizaciones` VALUES (5,'Juan Arturo','7654376678','calle 45 #45-21','3942944898','arturocalle123@gmail.com','2167656','100000','548',NULL,'37839200',NULL,'Alonzo Moncada','','2023-03-15 19:31:01','2023-02-07 00:00:00','37939200','8','entregado',NULL,NULL),(8,'Santiago Cuello','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.com','2315898','20000','2',NULL,'27600',NULL,'Antonio Uribe Gonzales','','2023-03-16 18:03:22','2023-02-02 00:00:00','47600','2','entregado',NULL,NULL),(9,'pepito','1234567890','Cra 1   2 3','3001234567','diegoherazo@hotmail.com','4123456','887500','0',NULL,'-629550',NULL,'Diego Herazo','','2023-03-23 08:29:38','2023-03-31 00:00:00','13387500','3','entregado',NULL,NULL),(11,'','987654321','cr 1   2 3','3009876543','hola@mail.com','4563219','','',NULL,'59500',NULL,'juan galvis','','2023-03-23 19:41:35',NULL,'59500','1','entregado',NULL,NULL),(12,'','71293664','calle 75 sur # 33-03','3136948249','electrocamo@gmail.com','222','','',NULL,'210000',NULL,'Adrian camilo ','','2023-03-23 19:54:05','2023-03-30 00:00:00','210000','35','aprobado',NULL,NULL),(13,'','71293664','calle 75 sur # 33-03','3136948249','electrocamo@gmail.com','222','','',NULL,'18900',NULL,'Adrian camilo ','','2023-03-23 19:56:41','2023-03-24 00:00:00','18900','3','cotizado',NULL,NULL),(14,'','123456','cr 1   4 5','12354123','asdf@asdf.com','123412341','','',NULL,'59500',NULL,'pablo','','2023-03-24 10:31:21',NULL,'59500','1','cotizado',NULL,NULL),(15,'','987654321','cr 1   2 3','3009876543','hola@mail.co','4563219','','',NULL,'14395500',NULL,'juan galvis','','2023-03-27 11:19:18',NULL,'14395500','13','cotizado',NULL,NULL),(16,'','7654376678','calle 45 #45-21','3942944898','arturocalle123@gmail.comm','2167656','','',NULL,'316750',NULL,'Alonzo Moncada','','2023-03-27 11:26:22',NULL,'316750','7','cotizado',NULL,NULL),(17,'Diego','7654376678','calle 45 #45-21','3942944898','arturocalle123@gmail.co','2167656','50000','',NULL,'1163800',NULL,'Alonzo Moncada','','2023-04-01 10:46:08','2023-04-05 00:00:00','1213800','20','cotizado',NULL,NULL),(18,'Lorenzo','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.co','2315898','120000','97565456',NULL,'715200',NULL,'Antonio Uribe Gonzales','','2023-04-03 15:02:17','2023-04-20 00:00:00','835200','12','cotizado',NULL,NULL),(19,'trevor','987654321','cr 1   2 3','3009876543','hola@mail.co','4563219','500000','65',NULL,'9679000',NULL,'juan galvis','','2023-04-03 15:05:18','2023-04-30 00:00:00','10179000','45','cotizado',NULL,NULL),(20,'DIEGO RUIZ','123456','123456','123456','ASDF@ASDF.COM','123456','10000','',NULL,'109000',NULL,'ASDF','image (1).png','2023-04-04 09:53:58','2023-04-04 00:00:00','119000','2','cotizado',NULL,NULL),(21,'PABLO MARIN','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.com','2315898','','',NULL,'2338560',NULL,'Antonio Uribe Gonzales','','2023-04-04 10:39:27',NULL,'2338560','56','cotizado',NULL,NULL),(23,'pablo marin','7654376678','calle 45 #45-21','3942944898','arturocalle123@gmail.com','2167656','200000','',NULL,'514000',NULL,'Alonzo Moncada','WhatsApp Image 2022-10-24 at 12.49.00 PM.jpeg','2023-04-15 10:30:45','2023-04-15 01:30:00','714000','2','cotizado',NULL,NULL),(24,'PABLO MARIN','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.com','2315898','50000','',NULL,'39250',NULL,'Antonio Uribe Gonzales','','2023-04-26 12:02:21','2023-04-27 16:02:00','89250','5','cotizado',NULL,NULL),(25,'PABLO MARIN','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.com','2315898','50000','',NULL,'39250',NULL,'Antonio Uribe Gonzales','','2023-04-26 12:02:21','2023-04-27 16:02:00','89250','10','cotizado',NULL,NULL),(26,'Pablo Marin','1234567890','Cra 1   2 3','3001234567','diegoherazo@hotmail.com','4123456','','',NULL,'682080',NULL,'Diego Herazo','','2023-05-05 10:48:06',NULL,'682080','2','cotizado',NULL,NULL),(27,'Jose Hugo','7654376690','calle 33a #33-37','3023833989','antoni123@gmail.com','2315898','','',NULL,'2168040',NULL,'Antonio Uribe Gonzales','','2023-05-05 12:32:49',NULL,'2168040','7','cotizado',NULL,NULL),(28,'Alonzo','1234567890','Cra 1   2 3','3001234567','diegoherazo@hotmail.com','4123456','','',NULL,'7443720',NULL,'Diego Herazo','','2023-05-05 12:37:00','2023-05-15 13:18:00','7443720','23','cotizado','chaooo',NULL),(29,'Pablo Marin','7654376678','calle 45 #45-21','3942944898','arturocalle123@gmail.com','2167656','600000','4277',NULL,'14275000',NULL,'Alonzo Moncada','','2023-05-11 08:23:57','2023-05-11 11:21:00','14875000','2','entregado','guardar centros ',NULL),(30,'Diego Ruiz','3490364','Gomez Plata','3217519951','p_h900@hotmail.com','3217519951','1024000','',NULL,'-448',NULL,'Marco Fidel Herrera','','2023-05-11 14:50:51','2023-05-15 10:00:00','1023552','32','facturado','Revisar planos. Cta CTE Bancolombia',NULL),(32,'Diego Ruiz','42964797','CRA 65 # 5 a 42','300665381','miniridamc@yahoo.es','300665381','531252','',NULL,'0',NULL,'Maria Inirida Machado Correa','','2023-05-15 07:41:54','2023-05-15 16:00:00','531252','36','entregado','1. transf $500.000 cta cte bancolombia 13/05/2023\n2. transf $31.252 cta cte bancolombia 16/05/2023',NULL),(34,'Prueba ','43278587','calle 19 # 57 22','3108993009','dcaritoq@hotmail.com','2328954','','',NULL,'323545',NULL,'Diana Arboleda','','2023-05-15 17:37:54','2001-02-21 11:11:00','323545','3','cotizado',NULL,NULL),(35,'','42964797','CRA 65 # 5 a 42','300665381','miniridamc@yahoo.es','300665381','31251.7','',NULL,'965818.3',NULL,'Maria Inirida Machado Correa','','2023-05-15 18:14:30','2021-02-21 12:43:00','997070','8','cotizado',NULL,NULL);
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialproductos`
--

DROP TABLE IF EXISTS `historialproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialproductos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `producto` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `calibre` varchar(100) NOT NULL,
  `largo` varchar(100) NOT NULL,
  `ancho` varchar(100) NOT NULL,
  `precioitem` varchar(100) NOT NULL,
  `cantidadItem` varchar(100) NOT NULL,
  `nrocotizacion` varchar(100) NOT NULL DEFAULT '0',
  `total` varchar(100) DEFAULT NULL,
  `Priceiva` int(11) NOT NULL,
  `peso` varchar(100) NOT NULL,
  `iva` enum('19','16','5','0') NOT NULL DEFAULT '19',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialproductos`
--

LOCK TABLES `historialproductos` WRITE;
/*!40000 ALTER TABLE `historialproductos` DISABLE KEYS */;
INSERT INTO `historialproductos` VALUES (1,'caja m13','acero','5.5','134','546','100000','','0',NULL,0,'','19'),(2,'caja m13','acero','5','50','80','100000','','0',NULL,0,'','19'),(3,'caja m13','acero','86','50','80','300000','6','5','36000000',37800000,'20','19'),(8,'tapa','acero','1','10','10','10000','1','9','50000',59500,'5','19'),(16,'caja m13','acero','42','21','32','20000','1','10','20000',23800,'1','19'),(19,'lamina','metal m.2','31','32','12','3000','35','12','210000',210000,'2','0'),(20,'lamina','metal m.2','31','32','12','3000','3','13','18000',18900,'2','19'),(21,'caja m13','acero','42','21','32','20000','4','13','960000',1142400,'12','19'),(22,'platina','acero','','100','50','1000','1','14','50000',59500,'50','19'),(24,'caja m13','acero','42','21','32','20000','6','15','10800000',12852000,'90','19'),(25,'lamina','metal m.2','31','32','12','3000','7','15','1470000',1543500,'70','19'),(26,'lamina','metal m.2','31','32','12','3000','5','16','75000',78750,'5','19'),(27,'caja m13','acero','42','21','32','20000','2','16','200000',238000,'5','19'),(28,'lamina perforadas ','HR','32','400','500','8500','20','17','1020000',1213800,'6','19'),(29,'lamina','metal m.2','31','32','12','3000','12','18','720000',835200,'20','16'),(30,'lamina','metal m.2','31','32','12','3000','45','19','8775000',10179000,'65','16'),(31,'lamina','metal m.2','31','32','12','3000','34','19','1224000',1419840,'12','16'),(32,'lamina','metal m.2','31','32','12','3000','23','19','828000',985320,'12','19'),(33,'lamina','metal m.2','31','32','12','3000','23','19','828000',985320,'12','19'),(34,'lamina','metal m.2','31','32','12','3000','32','19','4032000',4798080,'42','19'),(35,'PLATINAS','HR','1/4','1000','1000','2000','1','20','40000',47600,'20','19'),(36,'lamina','CR ','1/2','320','120','3000','1','20','60000',71400,'20','19'),(37,'LAMINA','GALVA','1/2','1000','100','20000','1','20','240000',285600,'12','19'),(38,'lamina','metal m.2','31','32','12','3000','56','21','2016000',2338560,'12','16'),(39,'lamina','metal m.2','31','32','12','3000','2','5','120000',139200,'20','16'),(40,'platinas ','hr','1/2\"','300','500','20000','2','22','400000',476000,'10','19'),(41,'platinas','hr','1/2\"','320','200','30000','2','23','600000',714000,'10','19'),(42,'LAMINA','HR','1/2\"','320','320','3000','2','25','60000',71400,'10','19'),(43,'PLATINAS ','CR','16','230','230','1000','3','25','15000',17850,'5','19'),(46,'lamina','metal m.2','3/1','32','12','3000','2','26','588000',682080,'98','16'),(47,'lamina','metal m.2','31','32','12','3000','7','27','1869000',2168040,'89','16'),(48,'lamina','metal m.2','31','32','12','3000','23','28','6417000',7443720,'93','16'),(49,'lamina','hr','1/2\"','320','120','50000','2','29','12500000',14875000,'125','19'),(50,'Elemento doblado s plano','HR','1/8','840','0000','38655','8','30','309240',367996,'1','19'),(51,'Elemento doblado con pestaña','HR','1/8','840','0000','43697','8','30','349576',415995,'1','19'),(52,'Omega s plano','HR','1/8','700','100','16764','8','30','214579.2',255349,'1.6','19'),(53,'Tapas omegas','HR','1/8','500','80','8400','8','30','67200',79968,'1','19'),(54,'Lamina para corte de plantilla perforada','HR','3/16','1250','1250','460000','1','31','460000',547400,'1','19'),(55,'Platinas perforadas','HR','3/8','300','300','54622','6','32','327732',390001,'1','19'),(56,'Platinas','HR','3/8','250','100','15126','3','32','45378',54000,'1','19'),(57,'Platinas','HR','3/8','200','100','12220','6','32','73320',87251,'1','19'),(58,'Servicio de corte, doble, perforcion de brazos','HR','1/4','280','100','3400','276','33','938400',938400,'1','0'),(59,'Servicio de corte,doblez,perforacion de bases','HR','1/4','210','90','2600','130','33','338000',338000,'1','0'),(60,'Servicio de corte, doblez, perforacion de eles','HR','1/4','177','133','3500','312','33','1092000',1092000,'1','0'),(65,'lamina','metal m.2','31','32','12','21000.8','4','34','268810.24',319884,'3.2','19'),(66,'lamina','metal m.2','31.8','32','12','15800.43','8','35','859543.392',997070,'6.8','16'),(67,'lamina','metal m.2','31','32','12','500.5','4','34','400.40000000000003',420,'0.2','5'),(69,'lamina','metal m.2','31','32','12','3000','1','36','60000',63000,'20','5');
/*!40000 ALTER TABLE `historialproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `producto` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `calibre` varchar(100) NOT NULL,
  `largo` varchar(100) NOT NULL,
  `ancho` varchar(100) NOT NULL,
  `precioitem` varchar(100) NOT NULL,
  `iva` enum('19','16','5','0') NOT NULL DEFAULT '19',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `index_units` (`material`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (14,'lamina','metal m.2','31','32','12','3000','19');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `cc` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `index_users` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Usuario','Prueba','Cedula de ciudadania','1001139591','andersonhernandez2001@gmail.com','3167592521','$2b$10$twubSlNGk9zt6S2ZOPBq9uHvoiI0qxXlUWQ3Kdwo1YRSA1sMYXUW.','Administrador'),(7,'super','admin','Cedula de ciudadania','1234567890','superadmin@gmail.com','3167592521','$2b$10$UMPvFHgEw./mVNC0.ywcPeL55YTohZSw.mYhj6648TPy22WypcUle','Vendedor'),(10,'chg','Prueba','Cedula de ciudadania','1001227369','maxcuello123@gmail.com','3167592521','$2b$10$pt4mtzwtuql5Rg6zZVwdp.QvFfU1POUuyG3suWB5/W86x8XTv4zGy','Vendedor'),(11,'Sebastian','Robles','Cedula de ciudadania','1061714563','paseroca3@gmail.com','3006583777','$2b$10$uAYE29JMO4N.jrogvPBYze4GmPn/7scn15RvcHR85u8iWyVY4obo6','Administrador'),(25,'Esteban','Pereira','Cedula de ciudadania','1001139591','estebanpereira@gmail.com','3126847590','$2b$10$Hkz48sOywCzZUEYGsqdRC.uncEKseB0CSkf7phfzHMkwtwFsousuK','Vendedor'),(26,'Camo','Camo','Cedula de ciudadania','71293664','electrocamo@gmail.com','3136948249','$2b$10$99ELJf8L7UuUEDRCor4D2uaShA1HwDgnat/nyI8ID20IienD6l7Ha','Administrador'),(28,'prueba','prueba','Cedula de ciudadania','1001139591','prueba@prueba.com','2435676','$2b$10$h8DGTtiGtmRMeHeQjEtJVuW68Ygmsfu24m3FY2YV15vYAfCwa7S8u','Vendedor');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17  9:48:29

CREATE TABLE remission (Remission INT NOT NULL PRIMARY KEY AUTO_INCREMENT, fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, nrocotizacion VARCHAR(100) NOT NULL);
CREATE UNIQUE INDEX index_nrocotizacion ON Remission (nrocotizacion);