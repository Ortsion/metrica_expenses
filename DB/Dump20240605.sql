-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: metrica
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
-- Dumping data for table `bucket`
--

LOCK TABLES `bucket` WRITE;
/*!40000 ALTER TABLE `bucket` DISABLE KEYS */;
INSERT INTO `bucket` VALUES (1,'first bucket',50,0),(5,'second bucket',50,0),(8,'another bucket',50,0),(9,'try bucket name',50,0),(10,'הוצאות חריגות',50,0);
/*!40000 ALTER TABLE `bucket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (125,'עובדים',0,'0',50),(126,'משכורות',0,'125',50),(127,'משכורת עובדים',0,'126',50),(144,'מעדנים',0,'0',50),(145,'פסטה',0,'0',50),(147,'טעמי',0,'0',50),(148,'טעמי',0,'147',50),(149,'ציון',0,'0',50),(150,'טעמי',0,'149',50),(151,'משכורות',0,'149',50),(172,'מתוק',0,'150',50),(176,'תפעול',0,'0',50),(177,'מחשבים',0,'176',50),(178,'אפל',0,'177',50),(179,'קניות',0,'0',50),(180,'x-place',0,'0',50),(181,'תנובה',0,'0',55),(182,'ציוד לוחמים',0,'0',50),(183,'ווסטים',0,'182',50),(185,'סלטים',0,'0',50),(186,'אוכל מוכן',0,'0',50),(187,'מעדנים',0,'0',55),(188,'עוד אחד',0,'0',55),(189,'ציוד לאירועים',0,'0',50),(190,'הגברה',0,'189',50),(191,'רסיבר קומפקטי',0,'190',50);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (60,50,190,'2024-03-31T21:00:00.000Z','2024-04-09T14:03:05.973Z',1.00,'ציוד לאירועים>הגברה',17.0,189,189,0,'',NULL,NULL),(61,50,191,'2024-04-10T21:00:00.000Z','2024-04-09T14:03:44.826Z',1.00,'ציוד לאירועים>הגברה>רסיבר קומקפטי',17.0,190,189,0,'',NULL,NULL),(62,50,191,'2024-04-02T21:00:00.000Z','2024-04-09T14:21:12.911Z',2.00,'ציוד לאירועים>הגברה>רסיבר',17.0,190,189,1,'',NULL,NULL),(63,50,190,'2024-04-03T21:00:00.000Z','2024-04-09T14:23:40.590Z',5.00,'ציוד לאירועים>הגברה',17.0,189,189,1,'',NULL,NULL),(64,50,127,'2024-05-27T21:00:00.000Z','2024-05-05T15:54:41.212Z',2.00,'',17.0,126,125,1,'',NULL,NULL),(65,50,127,'2024-05-04T21:00:00.000Z','2024-05-05T16:02:49.765Z',5.00,'bucket?',17.0,126,125,1,'',NULL,NULL),(66,50,127,'2024-05-07T21:00:00.000Z','2024-05-05T16:07:05.494Z',5.00,'bucket?',17.0,126,125,1,'',NULL,NULL),(67,50,127,'2024-05-14T21:00:00.000Z','2024-05-05T16:08:22.691Z',5.00,'bucket?',17.0,126,125,1,'','data.bucket',NULL),(68,50,127,'2024-05-13T21:00:00.000Z','2024-05-05T16:09:15.850Z',5.00,'bucket?',17.0,126,125,1,'','9',NULL),(69,50,127,'2024-04-30T21:00:00.000Z','2024-05-06T12:05:04.449Z',8.00,'bucket name?',17.0,126,125,1,'','try bucket name',NULL),(70,50,191,'2024-05-08T21:00:00.000Z','2024-05-08T08:52:17.833Z',1.00,'description',17.0,190,189,1,'comment','first bucket','var'),(71,50,191,'2024-04-30T21:00:00.000Z','2024-05-08T08:52:57.923Z',2.00,'description',22.0,190,189,1,'comment','first bucket','fix'),(72,50,178,'2024-05-22T21:00:00.000Z','2024-05-17T15:07:07.600Z',123.00,'khg',17.0,177,176,1,'khgf','another bucket','var');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'metrica','metrica@gmail.com','123456','12356','2023730'),(50,'ortsionm','ortsion@ortsion.com','$2b$10$psFxPzzlmuMMQFebWABCG.awvx0QIrI7e8rM5yb/XuZAj8wG3RGTi','1234','2023-11-27T10:03:18.216Z'),(55,'Erez','erez@erez.com','$2b$10$4Hw.zfq.Mp8E70OHHxVtG.qXAMEgZ4Za1vJ6W4ctEBUNyLaY9JS0K','1234','2023-12-24T17:04:14.318Z'),(56,'דעת קריאייטיב','daaat@gmail.com','$2b$10$NPlh5a9aiSVVEzJ7oWRTuubKzRfJxxIdyoiBFqnC3/Oj/cCyiiC6W','1234','2024-01-15T18:05:54.236Z');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 18:16:08
