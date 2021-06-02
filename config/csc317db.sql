-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'test title','test test title title 12345-6789','images/test.png','images/thumbnails/test.png',0,'2020-12-17 00:36:22',6),(2,'test title1','test test title1 title 12345-6789','images/test1.png','images/thumbnails/test1.png',0,'2020-12-17 00:38:26',1),(7,'test title15','test test title5 title 12345-6789','images/test5.png','images/thumbnails/test5.png',0,'2020-12-17 21:24:01',9),(12,'test title16','test test title5 title 12345-6789','images/test6.png','images/thumbnails/test6.png',0,'2020-12-17 21:28:47',12),(13,'Coffee','tCoffee','/Users/nyantun/Desktop/CSC317-termproject/application/public/images/IMG_0084.JPG','images/thumbnails/test6.png',0,'2020-12-17 21:31:44',13),(14,'Imgtest','Imgtesting','/Users/nyantun/Desktop/CSC317-termproject/application/public/images/uploads/72d20822fbc5fa020e33128f77a25c9ff6edb4cca634.jpeg','thumbnail-72d20822fbc5fa020e33128f77a25c9ff6edb4cca634.jpeg',0,'2020-12-17 23:28:23',7),(15,'imgtest3','imgtest3','public/images/uploads/b769837e6ee527d10a4ba8b6e72a672e8fb4552d9501.jpeg','public/images/uploads/thumbnail-b769837e6ee527d10a4ba8b6e72a672e8fb4552d9501.jpeg',0,'2020-12-17 23:50:00',7),(16,'imgCof','imageCoffee','public/images/uploads/3ce8c23f7e1628a4d9276d7149621eb791844b6a6b4a.jpeg','public/images/uploads/thumbnail-3ce8c23f7e1628a4d9276d7149621eb791844b6a6b4a.jpeg',0,'2020-12-18 00:00:32',8),(17,'recycle','recycle','public/images/uploads/16ba3b864f10e1283bfb2b93c33b808f0f32d4cc3be9.jpeg','public/images/uploads/thumbnail-16ba3b864f10e1283bfb2b93c33b808f0f32d4cc3be9.jpeg',0,'2020-12-18 00:14:51',8),(18,'recycle','recycle','public/images/uploads/3685b2459960676229171e67d137ae65f49a4a2086d2.png','public/images/uploads/thumbnail-3685b2459960676229171e67d137ae65f49a4a2086d2.png',0,'2020-12-18 00:22:30',8),(19,'sunshine','sunshine ','public/images/uploads/e660fb2c7c737dec494116aeb5cf65221ac188f70b68.png','public/images/uploads/thumbnail-e660fb2c7c737dec494116aeb5cf65221ac188f70b68.png',0,'2020-12-18 00:33:29',14),(20,'sunset','sunset','public/images/uploads/62131600b1adba22ac91f42956f562dd38533685296e.jpeg','public/images/uploads/thumbnail-62131600b1adba22ac91f42956f562dd38533685296e.jpeg',0,'2020-12-18 00:34:34',14),(21,'mount','mountain','public/images/uploads/c22ec83c3f4afc892c5f447f857df506106a917bfd71.jpeg','public/images/uploads/thumbnail-c22ec83c3f4afc892c5f447f857df506106a917bfd71.jpeg',0,'2020-12-18 00:56:52',15),(22,'snow','snowing','public/images/uploads/313ed792539966c6de9d5f48359fd4c1568df6775a25.jpeg','public/images/uploads/thumbnail-313ed792539966c6de9d5f48359fd4c1568df6775a25.jpeg',0,'2020-12-18 01:39:41',15);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idusers_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','test@mail.com','abcdefgh',0,0,'2020-12-17 00:13:57'),(6,'test14','test14@mail.com','abcdefgh',0,0,'2020-12-17 00:25:15'),(7,'a','a@gmail.com','$2b$15$6ok9qGcrGdpe/sXs2mX0bOhFHTdY5tvbz456xRDMjoh9osuQZcbSC',0,0,'2020-12-17 02:09:11'),(8,'b','b@mail.com','$2b$15$e0BXdA0f04lWpPT/Kx9WLeEiRJOcjHbjdjnmC8c6sCZT4wySVfrEC',0,0,'2020-12-17 19:19:59'),(9,'test15','test15@mail.com','abcdefgh',0,0,'2020-12-17 21:21:56'),(12,'test16','test16@mail.com','abcdefgh',0,0,'2020-12-17 21:27:55'),(13,'test1','test1@mail.com','abcdefgh',0,0,'2020-12-17 21:30:46'),(14,'c','c@mail.com','$2b$15$736d7ZLmrcW3bcxkUF/DfuYIHfNeSvOik6ZzBZ1bimtALykJnVVRe',0,0,'2020-12-18 00:32:53'),(15,'d','d@mail.com','$2b$15$CnUI2h1SUTnF0vIosfsB6OFA82fYQSXzjSpVmxhg6KyKtY4qXL1/2',0,0,'2020-12-18 00:56:04'),(16,'e','e@mail.com','$2b$15$ZUwwqbnl2xQHqLZpWcN5Z.fLCwN/J0Kn6FdOteFK4UyDSvh6os0i6',0,0,'2020-12-18 03:00:20');
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

-- Dump completed on 2020-12-22 18:39:04
