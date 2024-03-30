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


-- Volcando estructura de base de datos para Productos
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla productosdb.Productos: ~2 rows (aproximadamente)
DELETE FROM `Productos`;
/*!40000 ALTER TABLE `Productos` DISABLE KEYS */;
INSERT INTO `Productos` (`id`, `titulo`, `descripcion`, `estado`, `createdAt`, `updatedAt`) VALUES
	(1, 'pan', 'Alimento que consiste en una masa de harina, por lo común de trigo, levadura y agua, cocida en un horno.', 1, '2024-03-27 17:31:40', '2024-03-27 17:31:40'),
	(2, 'baguette', 'Barra de pan estrecha y alargada.', 0, '2024-03-27 17:31:40', '2024-03-27 17:31:40');
/*!40000 ALTER TABLE `Productos` ENABLE KEYS */;

-- Volcando estructura para tabla productosdb.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla Productos.sequelizemeta: ~1 rows (aproximadamente)
DELETE FROM `sequelizemeta`;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20240327113718-create-producto.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
