-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: coursedb
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `antirequisite`
--
USE 'coursedb';
DROP TABLE IF EXISTS `antirequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antirequisite` (
  `CourseID` char(7) NOT NULL,
  `Conflicting_CourseID` char(7) NOT NULL,
  PRIMARY KEY (`CourseID`,`Conflicting_CourseID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `antirequisite_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `antirequisite_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antirequisite`
--

LOCK TABLES `antirequisite` WRITE;
/*!40000 ALTER TABLE `antirequisite` DISABLE KEYS */;
INSERT INTO `antirequisite` VALUES ('CPSC471','CPSC472');
/*!40000 ALTER TABLE `antirequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `CourseID` char(7) NOT NULL,
  `Course_Name` tinytext NOT NULL,
  `Level` int NOT NULL,
  `Course_Description` longtext,
  `Credits` int NOT NULL,
  `Department_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `Department_Name` (`Department_Name`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('CPSC331','Data Structure and Algorithms',300,'DSA',3,'CPSC'),('CPSC449','Programming Paradigms',400,'Programming Paradigms',3,'CPSC'),('CPSC471','Database',400,'databases',3,'CPSC'),('CPSC472','Database2',400,'databases2',3,'CPSC'),('MATH211','Linear Algebra',200,'Linear Algebra',3,'MATH');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_Name` varchar(255) NOT NULL,
  `Phone_Number` varchar(255) DEFAULT NULL,
  `Number_of_Faculty` int DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Office_Building` varchar(255) DEFAULT NULL,
  `Office_Room` varchar(255) DEFAULT NULL,
  `University_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Department_Name`),
  KEY `University_Name` (`University_Name`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`University_Name`) REFERENCES `university` (`University_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('CPSC','1234567890',12,'cpsc@ucalgary.ca','MS','101','University of Calgary'),('MATH','9876543210',11,'math@ucalgary.ca','MS','102','University of Calgary');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `it`
--

DROP TABLE IF EXISTS `it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `it` (
  `ITID` char(8) NOT NULL,
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`ITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `it`
--

LOCK TABLES `it` WRITE;
/*!40000 ALTER TABLE `it` DISABLE KEYS */;
INSERT INTO `it` VALUES ('10001000','test@ucalgary.ca'),('11111111','test2@ucalgary.ca');
/*!40000 ALTER TABLE `it` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itlogin`
--

DROP TABLE IF EXISTS `itlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itlogin` (
  `userID` char(8) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `itlogin_fk_1_idx` (`userID`),
  CONSTRAINT `itlogin_fk_1` FOREIGN KEY (`userID`) REFERENCES `it` (`ITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itlogin`
--

LOCK TABLES `itlogin` WRITE;
/*!40000 ALTER TABLE `itlogin` DISABLE KEYS */;
INSERT INTO `itlogin` VALUES ('10001000','$2a$10$SdufvN6RhyyAbxap/BKCIueUsKKJOVLymGbgNFHjwGWrFhPRoqMm6'),('11111111','$2a$10$wkiFmG9fZs1IJ18JDJjV2e/ooSybcslQReY4tP8JWctNnnmD9JXMm');
/*!40000 ALTER TABLE `itlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `LectureID` char(3) NOT NULL,
  `CourseID` char(7) NOT NULL,
  `Enrollment_Limit` int DEFAULT NULL,
  `Enrollment_Current_Number` int DEFAULT NULL,
  `Building_Name` varchar(255) DEFAULT NULL,
  `Room_Location` varchar(255) DEFAULT NULL,
  `Semester_Name` varchar(10) NOT NULL,
  `Days` varchar(5) DEFAULT NULL,
  `Start_time` time DEFAULT NULL,
  `End_time` time DEFAULT NULL,
  PRIMARY KEY (`LectureID`,`CourseID`),
  KEY `CourseID` (`CourseID`),
  KEY `Semester_Name` (`Semester_Name`),
  CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_3` FOREIGN KEY (`Semester_Name`) REFERENCES `semester` (`Semester_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_4` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lecture_ibfk_5` FOREIGN KEY (`Semester_Name`) REFERENCES `semester` (`Semester_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
INSERT INTO `lecture` VALUES ('L01','CPSC331',100,50,'MS','101','F24','MWF','12:00:00','12:50:00'),('L01','CPSC471',150,100,'EEEL','160','F24','T,R','12:30:00','13:45:00');
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `Major_Name` varchar(255) NOT NULL,
  `No_credits` int DEFAULT NULL,
  PRIMARY KEY (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES ('Computer Science',60),('Mathematics',54);
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major_requirement`
--

DROP TABLE IF EXISTS `major_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major_requirement` (
  `CourseID` char(7) NOT NULL,
  `Major` varchar(255) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Major`),
  KEY `CourseID` (`CourseID`),
  KEY `major_requirement_ibfk_2_idx` (`Major`),
  CONSTRAINT `major_requirement_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `major_requirement_ibfk_2` FOREIGN KEY (`Major`) REFERENCES `major` (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major_requirement`
--

LOCK TABLES `major_requirement` WRITE;
/*!40000 ALTER TABLE `major_requirement` DISABLE KEYS */;
INSERT INTO `major_requirement` VALUES ('CPSC331','Computer Science',NULL),('MATH211','Computer Science',NULL);
/*!40000 ALTER TABLE `major_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor`
--

DROP TABLE IF EXISTS `minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minor` (
  `Minor_Name` varchar(255) NOT NULL,
  `No_credits` int DEFAULT NULL,
  PRIMARY KEY (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor`
--

LOCK TABLES `minor` WRITE;
/*!40000 ALTER TABLE `minor` DISABLE KEYS */;
INSERT INTO `minor` VALUES ('Computer Science',30),('Mathematics',30);
/*!40000 ALTER TABLE `minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor_requirement`
--

DROP TABLE IF EXISTS `minor_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minor_requirement` (
  `CourseID` char(7) NOT NULL,
  `Minor` varchar(255) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Minor`),
  KEY `CourseID` (`CourseID`),
  KEY `minor_requirement_ibfk_2_idx` (`Minor`),
  CONSTRAINT `minor_requirement_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `minor_requirement_ibfk_2` FOREIGN KEY (`Minor`) REFERENCES `minor` (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor_requirement`
--

LOCK TABLES `minor_requirement` WRITE;
/*!40000 ALTER TABLE `minor_requirement` DISABLE KEYS */;
INSERT INTO `minor_requirement` VALUES ('MATH211','Mathematics',NULL);
/*!40000 ALTER TABLE `minor_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite`
--

DROP TABLE IF EXISTS `prerequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prerequisite` (
  `CourseID` char(7) NOT NULL,
  `Required_CourseID` char(7) NOT NULL,
  `Minimum_Grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CourseID`,`Required_CourseID`),
  KEY `CourseID` (`CourseID`),
  KEY `Required_CourseID` (`Required_CourseID`),
  CONSTRAINT `prerequisite_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prerequisite_ibfk_2` FOREIGN KEY (`Required_CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite`
--

LOCK TABLES `prerequisite` WRITE;
/*!40000 ALTER TABLE `prerequisite` DISABLE KEYS */;
INSERT INTO `prerequisite` VALUES ('CPSC471','CPSC331',NULL),('CPSC471','CPSC449',NULL),('CPSC472','CPSC331',NULL);
/*!40000 ALTER TABLE `prerequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `Semester_Name` varchar(10) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Registration_Deadline` date NOT NULL,
  `Withdrawal_Deadling` date NOT NULL,
  `Exams_Start_Date` date DEFAULT NULL,
  `Exams_End_Date` date DEFAULT NULL,
  `University_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Semester_Name`),
  KEY `University_Name` (`University_Name`),
  CONSTRAINT `semester_ibfk_1` FOREIGN KEY (`University_Name`) REFERENCES `university` (`University_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES ('F24','2024-09-01','2024-12-21','2024-09-14','2024-12-06','2024-12-09','2024-12-21','University of Calgary');
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `StudentID` char(8) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `GPA` float DEFAULT NULL,
  `Year_of_Study` int DEFAULT NULL,
  `Enrollment_Status` tinyint(1) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  `Current_Address` varchar(255) DEFAULT NULL,
  `Permanent_Address` varchar(255) DEFAULT NULL,
  `Department_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `Department_Name` (`Department_Name`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('10001000','test@ucalgary.ca',4,2,1,'Yousry','Elsabrouty','2024-11-01','123 Main Street','123 Main Street','CPSC'),('11111111','test2@ucalgary.ca',4,3,1,'Foo','Bar','2024-01-01','1234 Main Sreet','1234 Main Street','CPSC'),('12345678','test3@ucalgary.ca',4,4,1,'Joseph','Tandyo','2024-01-01','12345 Main Street','12345 Main Street','CPSC');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentlogin`
--

DROP TABLE IF EXISTS `studentlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentlogin` (
  `userID` char(8) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentlogin`
--

LOCK TABLES `studentlogin` WRITE;
/*!40000 ALTER TABLE `studentlogin` DISABLE KEYS */;
INSERT INTO `studentlogin` VALUES ('10001000','$2a$10$P9O2Q8pKm5AVElwBimdpYu0F3PM3kkbqoAkptgvoqlGPcBMGiOKku'),('11111111','$2a$10$lxzFjdo1ncpyoM/69zl7a.sjzhidFaYeYFIveBNnW6014TofqJphW');
/*!40000 ALTER TABLE `studentlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_major`
--

DROP TABLE IF EXISTS `take_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_major` (
  `StudentID` char(8) NOT NULL,
  `Major` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`,`Major`),
  KEY `Major` (`Major`),
  CONSTRAINT `take_major_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  CONSTRAINT `take_major_ibfk_2` FOREIGN KEY (`Major`) REFERENCES `major` (`Major_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_major`
--

LOCK TABLES `take_major` WRITE;
/*!40000 ALTER TABLE `take_major` DISABLE KEYS */;
INSERT INTO `take_major` VALUES ('10001000','Computer Science'),('11111111','Computer Science'),('11111111','Mathematics');
/*!40000 ALTER TABLE `take_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_minor`
--

DROP TABLE IF EXISTS `take_minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_minor` (
  `StudentID` char(8) NOT NULL,
  `Minor` varchar(255) NOT NULL,
  PRIMARY KEY (`StudentID`,`Minor`),
  KEY `Minor` (`Minor`),
  CONSTRAINT `take_minor_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  CONSTRAINT `take_minor_ibfk_2` FOREIGN KEY (`Minor`) REFERENCES `minor` (`Minor_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_minor`
--

LOCK TABLES `take_minor` WRITE;
/*!40000 ALTER TABLE `take_minor` DISABLE KEYS */;
INSERT INTO `take_minor` VALUES ('10001000','Mathematics'),('11111111','Mathematics');
/*!40000 ALTER TABLE `take_minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taken_by`
--

DROP TABLE IF EXISTS `taken_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taken_by` (
  `CourseID` char(7) NOT NULL,
  `StudentID` char(8) NOT NULL,
  PRIMARY KEY (`CourseID`,`StudentID`),
  KEY `StudentID` (`StudentID`),
  KEY `taken_by_ibfk_1_idx` (`CourseID`),
  CONSTRAINT `taken_by_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `taken_by_ibfk_3` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taken_by`
--

LOCK TABLES `taken_by` WRITE;
/*!40000 ALTER TABLE `taken_by` DISABLE KEYS */;
INSERT INTO `taken_by` VALUES ('CPSC449','11111111'),('CPSC471','10001000'),('CPSC471','11111111'),('MATH211','11111111');
/*!40000 ALTER TABLE `taken_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorial` (
  `TutorialNo` char(3) NOT NULL,
  `CourseID` char(7) NOT NULL,
  `semester_name` varchar(10) NOT NULL,
  `TA_name` varchar(255) DEFAULT NULL,
  `Enrollment_Limit` int DEFAULT NULL,
  `Enrollment_Current_Number` int DEFAULT NULL,
  `Building_Name` varchar(255) DEFAULT NULL,
  `Room_Location` varchar(255) DEFAULT NULL,
  `Days` varchar(5) DEFAULT NULL,
  `Start_time` time DEFAULT NULL,
  `End_time` time DEFAULT NULL,
  PRIMARY KEY (`TutorialNo`,`CourseID`,`semester_name`),
  KEY `tutorial_fk_semester` (`semester_name`),
  KEY `tutorial_ibfk_1_idx` (`CourseID`),
  CONSTRAINT `tutorial_fk_semester` FOREIGN KEY (`semester_name`) REFERENCES `semester` (`Semester_Name`),
  CONSTRAINT `tutorial_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial`
--

LOCK TABLES `tutorial` WRITE;
/*!40000 ALTER TABLE `tutorial` DISABLE KEYS */;
INSERT INTO `tutorial` VALUES ('T01','CPSC449','F24','Josiah',100,10,'MS','101','MW','12:00:00','12:50:00'),('T01','CPSC471','F24','Josiah',100,50,'MS','160','MW','12:00:00','12:50:00');
/*!40000 ALTER TABLE `tutorial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `University_Name` varchar(255) NOT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Number_of_Faculty` int DEFAULT NULL,
  `Number_of_Students` int DEFAULT NULL,
  `Year_of_Establishment` year DEFAULT NULL,
  `Country` varchar(255) NOT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Postal_Code` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`University_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES ('University of Calgary','ucalgary.ca','ucalgary@ucalgary.ca',1234,12345,2024,'Canada','AB','Calgary','T2A');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07 19:28:54
