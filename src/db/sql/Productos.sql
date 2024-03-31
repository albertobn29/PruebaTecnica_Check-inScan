-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para productosdb
CREATE DATABASE IF NOT EXISTS `productosdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `productosdb`;

-- Volcando estructura para tabla productosdb.Productos
CREATE TABLE IF NOT EXISTS `Productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla productosdb.Productos: ~0 rows (aproximadamente)
DELETE FROM `Productos`;
/*!40000 ALTER TABLE `Productos` DISABLE KEYS */;
INSERT INTO `Productos` (`id`, `titulo`, `descripcion`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Mollete', 'Panecillo de forma ovalada, esponjado y de poca cochura, ordinariamente blanco.', 1, '2024-03-31 18:15:25', '2024-03-31 18:15:25'),
	(2, 'Pan', 'Alimento que consiste en una masa de harina, por lo común de trigo, levadura y agua, cocida en un horno.', 0, '2024-03-31 18:15:43', '2024-03-31 18:15:43');
/*!40000 ALTER TABLE `Productos` ENABLE KEYS */;

-- Volcando estructura para tabla productosdb.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla productosdb.sequelizemeta: ~3 rows (aproximadamente)
DELETE FROM `sequelizemeta`;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20240327113718-create-producto.js'),
	('20240330182846-create-usuario.js'),
	('20240330184730-create-usuario-producto.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Volcando estructura para tabla productosdb.Usuarios
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla productosdb.Usuarios: ~0 rows (aproximadamente)
DELETE FROM `Usuarios`;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Alberto', 'Benitez', 'alberto@gmail.com', '123456', 1, '2024-03-31 17:42:51', '2024-03-31 17:42:51'),
	(2, 'Pablo', 'Benitez', 'pablo@gmail.com', '123456', 0, '2024-03-31 17:49:28', '2024-03-31 17:49:28');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla productosdb.Usuario_Productos
CREATE TABLE IF NOT EXISTS `Usuario_Productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  KEY `productoId` (`productoId`),
  CONSTRAINT `usuario_productos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `usuario_productos_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `Productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla productosdb.Usuario_Productos: ~0 rows (aproximadamente)
DELETE FROM `Usuario_Productos`;
/*!40000 ALTER TABLE `Usuario_Productos` DISABLE KEYS */;
INSERT INTO `Usuario_Productos` (`id`, `usuarioId`, `productoId`, `cantidad`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 2, 3, '2024-03-31 17:49:28', '2024-03-31 17:49:28');
/*!40000 ALTER TABLE `Usuario_Productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
