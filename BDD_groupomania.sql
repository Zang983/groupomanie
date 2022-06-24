-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aimer`
--

DROP TABLE IF EXISTS `aimer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aimer` (
  `idUser` int NOT NULL,
  `idPost` int NOT NULL,
  `valeur` tinyint DEFAULT NULL,
  PRIMARY KEY (`idUser`,`idPost`),
  KEY `fk_users_has_posts_posts1` (`idPost`),
  CONSTRAINT `fk_users_has_posts_posts1` FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_posts_users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aimer`
--

LOCK TABLES `aimer` WRITE;
/*!40000 ALTER TABLE `aimer` DISABLE KEYS */;
INSERT INTO `aimer` VALUES (1,2,1),(1,3,0),(2,2,1),(2,3,1);
/*!40000 ALTER TABLE `aimer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ce`
--

DROP TABLE IF EXISTS `ce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ce` (
  `idCE` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `idUser` int NOT NULL,
  `visible` tinyint DEFAULT '1',
  PRIMARY KEY (`idCE`),
  KEY `fk_CE_users1` (`idUser`),
  CONSTRAINT `fk_CE_users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ce`
--

LOCK TABLES `ce` WRITE;
/*!40000 ALTER TABLE `ce` DISABLE KEYS */;
INSERT INTO `ce` VALUES (1,'Récupération des tickets restaurant !',1,1),(2,'Réduction Parc Astérix !',1,1),(3,'Ceci\n\n\nEST\n\n\nUN\n\n\n\nTEST\n\n\n\nPOUR VOIR LE RENDU',1,1);
/*!40000 ALTER TABLE `ce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaires` (
  `idCommentaire` int NOT NULL AUTO_INCREMENT,
  `contenu` text,
  `dateCreation` timestamp NULL DEFAULT NULL,
  `dateDernierEdit` timestamp NULL DEFAULT NULL,
  `lockStatus` tinyint DEFAULT NULL,
  `idPost` int NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idCommentaire`),
  KEY `fk_Commetaires_posts` (`idPost`),
  KEY `fk_Commetaires_users1` (`idUser`),
  CONSTRAINT `fk_Commetaires_posts` FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPost`) ON DELETE CASCADE,
  CONSTRAINT `fk_Commetaires_users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires`
--

LOCK TABLES `commentaires` WRITE;
/*!40000 ALTER TABLE `commentaires` DISABLE KEYS */;
INSERT INTO `commentaires` VALUES (1,'Ce n\'est pas très sécurisé de faire ce genre de post !\n\nEDIT : Corrigé par l\'administrateur !','2022-06-24 01:37:29','2022-06-24 01:39:24',0,2,2),(2,'Laura Clerc, c\'est bien vrai!','2022-06-24 01:37:58','2022-06-24 01:37:58',0,2,1);
/*!40000 ALTER TABLE `commentaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liker`
--

DROP TABLE IF EXISTS `liker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liker` (
  `idUser` int NOT NULL,
  `idCommentaire` int NOT NULL,
  `valeur` tinyint DEFAULT NULL,
  PRIMARY KEY (`idUser`,`idCommentaire`),
  KEY `fk_users_has_Commetaires_Commetaires1` (`idCommentaire`),
  CONSTRAINT `fk_users_has_Commetaires_Commetaires1` FOREIGN KEY (`idCommentaire`) REFERENCES `commentaires` (`idCommentaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_Commetaires_users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liker`
--

LOCK TABLES `liker` WRITE;
/*!40000 ALTER TABLE `liker` DISABLE KEYS */;
INSERT INTO `liker` VALUES (2,1,1);
/*!40000 ALTER TABLE `liker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idPost` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(60) DEFAULT NULL,
  `contenu` text,
  `dateCreation` timestamp NULL DEFAULT NULL,
  `dateDernierEdit` timestamp NULL DEFAULT NULL,
  `lockStatus` tinyint DEFAULT NULL,
  `url_image` text,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idPost`),
  KEY `fk_posts_users1` (`idUser`),
  CONSTRAINT `fk_posts_users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'Mot de passe ADMIN','Bonjour, le compte admin possède les identifiants suivants : \r\nlogin : admin@groupomania.fr\r\nPassword : Bonjour01','2022-06-24 01:31:31','2022-06-24 01:31:31',0,'',1),(3,'Bonjour à tous et à toutes','Je suis ravie de partager ce moment avec vous !\r\n\r\nEdit : Corriger par l\'administrateur','2022-06-24 01:34:44','2022-06-24 01:39:00',0,'',2),(4,'Bonjour ','Hello tous ! Génial ce nouveau site ! J\'espère qu\'on partagera plein d\'image sympa, drôle et surtout de CHAT !!!!!','2022-06-24 01:44:39','2022-06-24 01:44:39',0,'http://localhost:3000/images/41wN1fhFL6L.jpg1656035079553.jpg',3),(5,'Ca fait plaisir d\'être écouté','Bonjour! \r\n\r\nMerci de nous avoir écouté et de nous permettre de partager et de nous détendre entre collègue sur ce site ! ','2022-06-24 01:48:47','2022-06-24 01:48:47',0,'',4),(6,'Lol','Comme Daniel aime les chats en voici un !','2022-06-24 01:49:34','2022-06-24 01:49:34',0,'http://localhost:3000/images/cat.jpg1656035374856.jpg',4),(7,'Présence de bug?','En cas de bug veuillez laisser un commentaire sur ce post !','2022-06-24 01:50:24','2022-06-24 01:50:24',0,'',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `url_avatar` text,
  `fonction` varchar(45) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `droits` varchar(5) DEFAULT NULL,
  `userDescription` text,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','$2b$10$mmW6qsWepxIIeRQi4YjQQOQtustX/oc2ahvzMxm0/A7tPjJf7FaH6',NULL,NULL,'0100000000','admin@groupomania.fr','00001','Je suis l\'admin du site, n\'hésitez pas à me contacter en cas de bug !!'),(2,'Laura','Clerc','$2b$10$bfQgxx/u2bNk/4asnc2RE.nnSNOsmLyqE76wLCodLN74isaoRs3Cq','http://localhost:3000/images/avatar-femme.png1656034593646.png',NULL,'0100000000','laura.clerc@groupomania.fr','00002','Je suis Laura Clerc, chargée de communication.'),(3,'Daniel','Jack','$2b$10$rzANwsk6yqZ9Lu17e0Fu7u1zqpSTlqPnFPCVIr3eK.v4nZN072O7S','http://localhost:3000/images/2002332-ablack-man-avatar-character-isolated-icon-gratuit-vectoriel.jpg1656035022153.jpg',NULL,'0160997788','jack.daniel@groupomania.fr','00002','Amateur de sensation forte, j\'aime boire un verre ou deux avec mes collègues.'),(4,'Edward','Elric','$2b$10$dT021jAPB/OAIhaGRPwHHugmjwsfWr/HVGhohJDoYSzJ9JaYbfr.C','http://localhost:3000/images/847169448593878462_1491224295.jpg1656035282165.jpg',NULL,'0100000000','elric.edward@groupomania.fr','00002','Coïncidence étrange, mon nom et prénom correspondent au personnage principal d\'un animé hors du commun !');
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

-- Dump completed on 2022-06-24  3:52:41
