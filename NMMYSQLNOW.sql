-- MySQL dump 10.13  Distrib 5.7.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: music
-- ------------------------------------------------------
-- Server version	5.7.36

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
-- Table structure for table `album_info`
--

DROP TABLE IF EXISTS `album_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album_info` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picUrl` text,
  `size` int(11) DEFAULT NULL,
  `artists` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_info`
--

INSERT INTO `album_info` VALUES (32311,'神的游戏','https://p1.music.126.net/Baol42Xvto6rjRdj0aK_wg==/109951167778492613.jpg',9,'[{\"id\": 10557, \"name\": \"张悬\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]'),(32312,'城市','https://p1.music.126.net/WMVdcUdA0XYzdj9Od4upyw==/109951167282574636.jpg',10,'[{\"id\": 10557, \"name\": \"张悬\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]'),(37182,'霹雳英雄之剑踪','https://p1.music.126.net/PIBlaNiWJPczD_-mF0tGHw==/60473139539998.jpg',20,'[{\"id\": 12639, \"name\": \"霹雳布袋戏\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]'),(149730290,'バレットフィリア達の闇市場　〜 100th Black Market.','https://p2.music.126.net/fvYv9z0VApCyg_g9W-pFkw==/109951167782613133.jpg',10,'[{\"id\": 15345, \"name\": \"上海アリス幻樂団\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]'),(165713108,'THE SELECTED WORKS OF TAMAONSEN 6','https://p1.music.126.net/GHDmjvW_i8rUhL7ju5g1uw==/109951168616831903.jpg',14,'[{\"id\": 21200, \"name\": \"魂音泉\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]'),(166875576,'東方獣王園～Unfinished Dream of All Living Ghost. 体験版','https://p1.music.126.net/dnJvR4ZKgxjOwqmxW7EC6g==/109951168652759302.jpg',6,'[{\"id\": 15345, \"name\": \"上海アリス幻樂団\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]');

--
-- Table structure for table `artlist_info`
--

DROP TABLE IF EXISTS `artlist_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artlist_info` (
  `id` int(11) NOT NULL,
  `name` text,
  `alias` json DEFAULT NULL,
  `picUrl` text,
  `img1v1Url` text,
  `albumSize` int(11) DEFAULT NULL,
  `musicSize` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artlist_info`
--

INSERT INTO `artlist_info` VALUES (21200,'魂音泉','[\"たまおんせん\"]','http://p1.music.126.net/BzRNjGTauxCbuP0Cjv72Cg==/109951164292304974.jpg','http://p1.music.126.net/oPef0DLvOt6tWV1VdapjUQ==/18754369836656335.jpg',82,367),(735070,'ZUN','[\"ずん\", \"太田順也\"]','http://p1.music.126.net/xPokfphB9xBiobQ_gPZ4Sg==/1390882219244095.jpg','http://p1.music.126.net/gxjMmJcAoaVDAVUydK_6ug==/1375489056321033.jpg',7,79),(13011210,'sapientdream','[]','http://p1.music.126.net/2nyazgMnc6I84G67ZTr0Rg==/109951163569087489.jpg','http://p1.music.126.net/N9G0hygVvQEdTJSF8uO7Yg==/109951163569092302.jpg',36,136);

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `userId` int(11) DEFAULT NULL,
  `beReplied` json DEFAULT NULL,
  `content` text,
  `time` varchar(25) DEFAULT NULL,
  `likedCount` int(11) DEFAULT NULL,
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `resourceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `fk_comment_user_1` (`userId`),
  CONSTRAINT `fk_comment_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` VALUES (10,'[]','好啊','1685781980049',1,1,2,28),(10,'[]','想啊','1685782573183',1,2,2,28),(10,'[]','很想啊','1685782626251',1,3,2,28),(10,'[{\"user\": {\"userId\": 10, \"nickname\": \"坤坤\", \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/1685624230612.jpg\"}, \"content\": null, \"beRepliedCommentId\": 8}]','免礼金身','1685858059600',1,9,2,28),(10,'[]','你好','1685858208134',0,10,2,20),(10,'[]','非常好','1686120309048',0,13,6,39),(10,'[]','很像啊','1686121692890',1,14,6,44),(10,'[{\"user\": {\"userId\": 10}, \"content\": \"很像啊\", \"beRepliedCommentId\": 14}]','114515','1686121707025',1,15,6,44),(10,'[{\"user\": {\"userId\": 10}, \"content\": null, \"beRepliedCommentId\": 16}]','HAOA','1686126795688',0,17,0,2046978928),(10,'[]','hao','1713773375100',0,18,0,496902794);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `add_comment` AFTER INSERT ON `comment` FOR EACH ROW BEGIN
	IF NEW.type = 2 THEN
		UPDATE playlists_dynamic SET commentCount = commentCount + 1 WHERE id = NEW.resourceId;
	END IF;
	IF NEW.type = 6 THEN
		UPDATE events_info SET commentCount = commentCount + 1 WHERE id = NEW.resourceId;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `del_comment` AFTER DELETE ON `comment` FOR EACH ROW BEGIN
	IF OLD.type = 2 THEN
		UPDATE playlists_dynamic SET commentCount = commentCount - 1 WHERE id = OLD.resourceId;
	END IF;
	IF OLD.type = 6 THEN
		UPDATE events_info SET commentCount = commentCount - 1 WHERE id = OLD.resourceId;
	END IF;
	
	UPDATE comment
	SET beReplied = JSON_SET(beReplied, '$[0].content', NULL)
	WHERE JSON_EXTRACT(beReplied, '$[*].beRepliedCommentId') = JSON_ARRAY(OLD.commentId);
	
	UPDATE user_events SET `json` = JSON_SET(`json`, '$[*].resource', NULL)
	WHERE type = 31 AND CAST(JSON_EXTRACT(`json`, '$[*].resource.commentId') AS UNSIGNED) = OLD.commentId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `events_info`
--

DROP TABLE IF EXISTS `events_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_info` (
  `id` int(11) NOT NULL,
  `commentCount` int(11) DEFAULT '0',
  `shareCount` int(11) DEFAULT '0',
  `likedCount` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_events_info_user_events_1` FOREIGN KEY (`id`) REFERENCES `user_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_info`
--

INSERT INTO `events_info` VALUES (1,0,0,0),(2,0,0,0),(3,0,0,0),(4,0,0,0),(6,0,0,1),(7,0,0,0),(8,0,0,0),(10,0,0,0),(12,0,0,0),(13,0,0,0),(22,0,0,0),(25,0,3,1),(40,0,0,1),(42,0,0,1),(47,0,1,0),(48,0,0,0),(49,0,0,0),(50,0,0,0);

--
-- Table structure for table `events_like`
--

DROP TABLE IF EXISTS `events_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_like` (
  `id` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `fk_events_like_user_events_1` (`id`),
  CONSTRAINT `fk_events_like_user_events_1` FOREIGN KEY (`id`) REFERENCES `user_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_like`
--

INSERT INTO `events_like` VALUES (6,10),(25,10),(40,10),(42,10);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `events_like` AFTER INSERT ON `events_like` FOR EACH ROW BEGIN
	UPDATE events_info set likedCount = likedCount + 1 WHERE id = NEW.id;
	
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `events_del_like` AFTER DELETE ON `events_like` FOR EACH ROW BEGIN
	UPDATE events_info set likedCount = likedCount - 1 WHERE id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `privacy` enum('0','10') DEFAULT NULL COMMENT '隐私',
  `playCount` int(10) unsigned DEFAULT '0' COMMENT '播放数',
  `trackCount` int(11) DEFAULT '0' COMMENT '歌曲数',
  `name` varchar(255) DEFAULT NULL,
  `createTime` varchar(20) NOT NULL COMMENT '时间戳',
  `description` text,
  `tags` varchar(20) DEFAULT NULL COMMENT ';隔开',
  `coverImgUrl` varchar(255) DEFAULT 'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png',
  `creatorId` int(11) DEFAULT NULL,
  `set` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_playlists_user_1` (`userId`),
  CONSTRAINT `fk_playlists_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` VALUES (3,3,'0',0,0,'大牛马用户_9VhCywt84A喜欢的音乐','1685341362000',NULL,NULL,'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png',3,0),(4,6,'0',0,1,'大坤坤喜欢的音乐','1685416417000',NULL,NULL,'https://p2.music.126.net/BL7smWmF5xW4q9LD9Dpx8Q==/109951166471900674.jpg',6,0),(8,8,'0',0,0,'大牛马用户_H3bDINhUZG喜欢的音乐','1685539818000',NULL,NULL,'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png',8,0),(18,10,'0',0,1,'坤坤大喜欢的音乐','1685624203000',NULL,NULL,'https://p2.music.126.net/-V7LhmVPEldW3Q26NsVCsA==/109951164943395229.jpg',10,0),(20,10,'10',0,1,'坤之鸡1x','1685624327659','',NULL,'https://p2.music.126.net/qSxMmLYB8GTKqU-2kMCWoA==/6639950721442376.jpg',10,0),(21,10,'10',0,1,'坤之鸡2','1685624331313','','欧美','https://p2.music.126.net/lc9obC1wFTMO9ade0jVkMw==/109951168181793512.jpg',10,0),(22,10,'10',0,1,'坤之鸡3','1685624334363',NULL,NULL,'https://p2.music.126.net/lc9obC1wFTMO9ade0jVkMw==/109951168181793512.jpg',10,0),(24,10,'0',0,3,'大肥鸡之歌','1685688958174',NULL,NULL,'https://p1.music.126.net/xDWaPnKqlhn5hcVnDUz3UA==/109951167536326003.jpg',10,0),(25,10,'0',0,2,'没错我就是蔡徐坤','1685688986398',NULL,'ACG;日语','https://p1.music.126.net/ONue1VLRrBNr8Pd8OAq80g==/2942293118585659.jpg',10,0),(26,10,'0',0,3,'想啊','1685689003804',NULL,NULL,'https://p1.music.126.net/ONue1VLRrBNr8Pd8OAq80g==/2942293118585659.jpg',10,0),(27,10,'0',0,52,'荣华之梦','1685689041919',NULL,NULL,'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/1686195941662.jpg',10,1),(28,6,'0',0,1,'大坤坤之歌','1685704283287',NULL,NULL,'https://p2.music.126.net/Dd8zpwNi1-A-Kpe79TXuoQ==/109951168608520784.jpg',6,0),(29,6,'0',0,1,'大坤坤的魔法书','1685704295171',NULL,NULL,'https://p1.music.126.net/c12W_sGzVk4EDvSlpLgrgQ==/109951168292739532.jpg',6,0),(30,6,'0',0,1,'坤之魔法师','1685705233454',NULL,NULL,'https://p2.music.126.net/AdTn8p244H5cbTM-ZORJSA==/109951167311742695.jpg',6,0),(31,6,'0',0,1,'变坤术','1685705447300',NULL,NULL,'https://p1.music.126.net/tablAd7ycdk-TIGxmKTJzw==/109951164943404230.jpg',6,0),(32,6,'0',0,1,'变坤计','1685706132165',NULL,NULL,'https://p1.music.126.net/qL6RKAtzt-yK2knv5i8kDQ==/109951164943399412.jpg',6,0),(34,6,'0',0,1,'坤坤请赐予我力量','1685706556033',NULL,NULL,'https://p1.music.126.net/nr5MOza2dH3r0fM8tsxROg==/109951164943414063.jpg',6,0),(35,6,'0',0,1,'坤之魔导师','1685707718145',NULL,NULL,'https://p1.music.126.net/3TBzacnbRZNibfA2zRrGkw==/109951164943404076.jpg',6,0),(36,6,'0',0,50,'zun神','1685771632597',NULL,NULL,'https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg',6,0),(47,17,'0',0,0,'大牛马用户_9gWdE1VD70喜欢的音乐','1713767698000',NULL,NULL,'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251611198.png',17,0);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `init_playlists_songs` AFTER INSERT ON `playlists` FOR EACH ROW BEGIN
INSERT INTO playlists_songs (id,userId,songs) VALUES (NEW.id,NEW.userId,'');
INSERT INTO playlists_starts(id,start_ids,length) VALUES(NEW.id,'',0);
INSERT INTO playlists_dynamic(id) VALUES(NEW.id);
UPDATE user_playlists
SET playList_ids = CONCAT_WS(',', IF(playList_ids = '', NEW.id, CONCAT(SUBSTRING_INDEX(playList_ids, ',', 1), ',', NEW.id, SUBSTRING(playList_ids, LOCATE(',', playList_ids)))))
WHERE userId = NEW.userId;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `del_platlists` AFTER DELETE ON `playlists` FOR EACH ROW BEGIN
    -- 更新 user_playlists 表
    SET @ids := CONCAT(',', (SELECT playList_ids FROM user_playlists WHERE userId = OLD.userId), ',');
    SET @deletedId := CONCAT(',', OLD.id, ',');
    SET @updatedIds := REPLACE(@ids, @deletedId, ',');
    SET @updatedIds := TRIM(BOTH ',' FROM @updatedIds);
    UPDATE user_playlists
    SET playList_ids = @updatedIds
    WHERE userId = OLD.userId;

    -- 更新 user_starts_playlists 表
    UPDATE user_starts_playlists
    SET start_playList_ids = TRIM(BOTH ',' FROM (REPLACE(REPLACE(CONCAT(',', start_playList_ids, ','), CONCAT(',', OLD.id, ','), ','), ',,', ',')) )
    WHERE FIND_IN_SET(OLD.id, start_playList_ids) > 0;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `playlists_dynamic`
--

DROP TABLE IF EXISTS `playlists_dynamic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists_dynamic` (
  `id` int(11) DEFAULT NULL,
  `commentCount` int(11) DEFAULT '0' COMMENT '评论数',
  `shareCount` int(11) DEFAULT '0' COMMENT '分享数',
  `playCount` int(11) DEFAULT '0' COMMENT '播放数',
  `bookedCount` int(11) DEFAULT '0' COMMENT '收藏数',
  KEY `fk_playlists_dynamic_playlists_1` (`id`),
  CONSTRAINT `fk_playlists_dynamic_playlists_1` FOREIGN KEY (`id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_dynamic`
--

INSERT INTO `playlists_dynamic` VALUES (3,0,0,0,0),(4,0,0,0,0),(8,0,0,0,0),(18,0,0,0,0),(20,1,0,0,0),(21,0,0,0,0),(22,0,0,0,0),(24,0,4,0,0),(25,0,0,3,1),(26,0,0,0,1),(27,0,0,12,1),(28,4,0,1,1),(29,0,0,0,0),(30,0,0,0,0),(31,0,0,0,0),(32,0,0,0,0),(34,0,0,0,0),(35,0,0,0,1),(36,0,1,0,0),(47,0,0,0,0);

--
-- Table structure for table `playlists_songs`
--

DROP TABLE IF EXISTS `playlists_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists_songs` (
  `id` int(11) NOT NULL COMMENT '歌单id',
  `userId` int(11) NOT NULL COMMENT '所有者id,不是创建者',
  `songs` text COMMENT ',连接',
  `length` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_playlists_songs_playlists_1` FOREIGN KEY (`id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_songs`
--

INSERT INTO `playlists_songs` VALUES (3,3,'',0),(4,6,'1916130370',1),(8,8,'',0),(18,10,'1415106612',1),(20,10,'29797672',1),(21,10,'2027213035',1),(22,10,'2009759464',1),(24,10,'1955013686,1369427865,1826774560',3),(25,10,'31648321,375690',2),(26,10,'31648321,1995865596,1444201723',3),(27,10,'812557,1367973926,29774989,28952060,485775276,503268062,812525,503268063,484721433,425280309,28952084,812756,28952079,812534,1367979299,29143062,496902794,812762,40915587,484721430,569105151,34696849,425280302,2047810581,28952076,485775279,1367973924,441835866,528478127,450224819,812432,1914659999,2047818759,1385618495,769465,812843,33638900,450224815,2047818734,485775278,34696848,812543,812765,812425,441835868,29777226,812850,812540,484721435,34696854,41672957,1995865596',52),(28,6,'2046978928',1),(29,6,'2020625847',1),(30,6,'1939402128',1),(31,6,'40915587',1),(32,6,'425280302',1),(34,6,'812762',1),(35,6,'485775276',1),(36,6,'22766039,22766042,22766037,30870315,22766041,22766032,22766031,30854187,22766033,22766040,561307049,22766030,22766038,22766034,22766036,22766035,561307037,30854146,30854151,561307044,561307047,30870318,561307045,30854142,30854131,30854148,561307043,30854136,1495018050,30854147,30870347,30854149,30870316,30854190,30870881,561307048,30870314,30854182,561307042,30854145,30854184,30870329,30854132,30854138,30854141,30854135,30854140,30854133,30854137,30870357',50),(47,17,'',0);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `change_trackCount` AFTER UPDATE ON `playlists_songs` FOR EACH ROW  BEGIN
    UPDATE playlists p
    SET p.trackCount = NEW.length
    WHERE p.id = NEW.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `playlists_starts`
--

DROP TABLE IF EXISTS `playlists_starts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists_starts` (
  `id` int(11) NOT NULL,
  `start_ids` text,
  `length` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_playlists_starts_playlists_1` FOREIGN KEY (`id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_starts`
--

INSERT INTO `playlists_starts` VALUES (3,'',0),(4,'',0),(8,'',0),(18,'',0),(20,'',0),(21,'',0),(22,'',0),(24,'',0),(25,'6',1),(26,'6',1),(27,'6',1),(28,'10',1),(29,'',0),(30,'',0),(31,'',0),(32,'',0),(34,'',0),(35,'10',1),(36,'',0),(47,'',0);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_booed_Count` AFTER UPDATE ON `playlists_starts` FOR EACH ROW BEGIN
	UPDATE playlists_dynamic
	SET bookedCount = NEW.length
	WHERE playlists_dynamic.id = NEW.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `scrobble_total`
--

DROP TABLE IF EXISTS `scrobble_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scrobble_total` (
  `userId` int(11) DEFAULT NULL,
  `songId` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `updateTime` varchar(20) DEFAULT NULL,
  KEY `u_s_t` (`userId`,`songId`),
  CONSTRAINT `fk_scrobble_total_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrobble_total`
--

INSERT INTO `scrobble_total` VALUES (10,425280309,5,'1686188040001'),(10,1367973926,3,'1686188040201'),(10,28952060,3,'1686188640001'),(10,812557,2,'1686189040001'),(10,2046978928,3,'1686192057530'),(10,29774989,2,'1686193183398'),(10,375690,2,'1686195673133'),(10,31648321,1,'1686195673806'),(10,496902794,3,'1713773576306'),(10,29777226,1,'1713775420395');

--
-- Table structure for table `scrobble_week`
--

DROP TABLE IF EXISTS `scrobble_week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scrobble_week` (
  `userId` int(11) DEFAULT NULL,
  `songId` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `updateTime` varchar(20) DEFAULT NULL,
  KEY `u_s_w` (`userId`,`songId`),
  CONSTRAINT `fk_scrobble_week_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrobble_week`
--

INSERT INTO `scrobble_week` VALUES (10,425280309,5,'1686188040001'),(10,1367973926,3,'1686188040201'),(10,28952060,3,'1686188640001'),(10,812557,2,'1686189040001'),(10,2046978928,3,'1686192057518'),(10,29774989,2,'1686193183391'),(10,375690,2,'1686195673130'),(10,31648321,1,'1686195673802'),(10,496902794,3,'1713773576087'),(10,29777226,1,'1713775420358');

--
-- Table structure for table `song_info`
--

DROP TABLE IF EXISTS `song_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_info` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `album` json DEFAULT NULL,
  `alias` json DEFAULT NULL,
  `artists` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_info`
--

INSERT INTO `song_info` VALUES (375690,'王爷','{\"id\": 37182, \"pic\": 60473139539998, \"tns\": [], \"name\": \"霹雳英雄之剑踪\", \"picUrl\": \"https://p2.music.126.net/PIBlaNiWJPczD_-mF0tGHw==/60473139539998.jpg\"}','[]','[{\"id\": 7083, \"tns\": [], \"name\": \"阿轮\", \"alias\": []}]'),(812531,'once in a blue moon','{\"id\": 80466, \"pic\": 109951164943410270, \"tns\": [], \"name\": \"THE SELECTED WORKS OF TAMAONSEN\", \"picUrl\": \"https://p2.music.126.net/wz-mKO4JcAr9Cb44YJoaZQ==/109951164943410279.jpg\", \"pic_str\": \"109951164943410279\"}','[]','[{\"id\": 15245, \"tns\": [], \"name\": \"らっぷびと\", \"alias\": []}]'),(812557,'そんなゆめをみたの ~lonely dreaming girl~','{\"id\": 80466, \"pic\": 109951164943410270, \"tns\": [], \"name\": \"THE SELECTED WORKS OF TAMAONSEN\", \"picUrl\": \"https://p1.music.126.net/wz-mKO4JcAr9Cb44YJoaZQ==/109951164943410279.jpg\", \"pic_str\": \"109951164943410279\"}','[]','[{\"id\": 21200, \"tns\": [], \"name\": \"魂音泉\", \"alias\": []}]'),(29777226,'原点回帰 -Guilty Life-','{\"id\": 2968067, \"pic\": 6665239488793807, \"tns\": [], \"name\": \"魂音泉別館 -壱壱-\", \"picUrl\": \"https://p2.music.126.net/2an30zbI3PP23PVVY3ZwZA==/6665239488793807.jpg\"}','[]','[{\"id\": 0, \"tns\": [], \"name\": \"めぐたん\", \"alias\": []}]'),(1444201723,'想啊','{\"id\": 126215188, \"pic\": 109951166236713630, \"tns\": [], \"name\": \"渡日\", \"picUrl\": \"https://p1.music.126.net/W4pRQTzv9RwvtLtDbOla-g==/109951166236713625.jpg\", \"pic_str\": \"109951166236713625\"}','[]','[{\"id\": 32439145, \"tns\": [], \"name\": \"李李李李卫央\", \"alias\": []}]'),(1826774560,'十一年（翻自 邱永传）','{\"id\": 123546825, \"pic\": 109951165795447980, \"tns\": [], \"name\": \"十一年\", \"picUrl\": \"https://p2.music.126.net/dDI3IiW3prffuGwaB4pNuQ==/109951165795447979.jpg\", \"pic_str\": \"109951165795447979\"}','[]','[{\"id\": 46904408, \"tns\": [], \"name\": \"阿宇\", \"alias\": []}]'),(2046978928,'淄博等你','{\"id\": 165532527, \"pic\": 109951168608520780, \"tns\": [], \"name\": \"子莫格尼（特别录制版）\", \"picUrl\": \"https://p2.music.126.net/Dd8zpwNi1-A-Kpe79TXuoQ==/109951168608520784.jpg\", \"pic_str\": \"109951168608520784\"}','[]','[{\"id\": 12062029, \"tns\": [], \"name\": \"杉和\", \"alias\": []}]');

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text,
  `code` varchar(10) DEFAULT NULL,
  `verify` int(11) DEFAULT '0',
  `codeTime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_id_uindex` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES (3,'大牛马用户_9VhCywt84A','2219617953@qq.com','e75de7b81aa6cab3f5695f895086f1f6','FqOKR1',1,'1685341319473'),(6,'大坤坤','772490539@qq.com','e75de7b81aa6cab3f5695f895086f1f6','Jx6Y3I',1,'1685416403573'),(8,'大牛马用户_H3bDINhUZG','286186825@qq.com','e75de7b81aa6cab3f5695f895086f1f6','vmuluM',1,'1685539792800'),(10,'坤坤大','2483723241@qq.com','e75de7b81aa6cab3f5695f895086f1f6','KJM7qA',1,'1685624193907'),(17,'大牛马用户_9gWdE1VD70','3655389254@qq.com','14e1b600b1fd579f47433b88e8d85291','V_fUah',1,'1713767554600');
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_user_message` AFTER INSERT ON `user` FOR EACH ROW INSERT INTO `user_message` (userId, signature, createTime, birthday, gender, province, city)
  VALUES (NEW.id, '', CAST(UNIX_TIMESTAMP() AS CHAR(20)), NULL, NULL, NULL, NULL) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_userLike_name` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
  IF NEW.nickname <> OLD.nickname THEN
	UPDATE `playlists` SET `name` = CONCAT(NEW.nickname, '喜欢的音乐')
	WHERE playlists.createTime in (
                select * from (
                SELECT MIN(createTime)
                FROM playlists AS p
                WHERE p.userId = NEW.id
                ORDER BY CAST(createTime AS UNSIGNED)
            ) as a
        );
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger update_user_message
    after update
    on user
    for each row
BEGIN
  DECLARE pid INT; 
	IF NEW.verify <> OLD.verify THEN
	UPDATE `user_message` 
	SET `nickname` = NEW.nickname,birthday = '0',gender='0',province=330000, city=330100 
	WHERE `userId` = OLD.id;
	
	INSERT INTO playlists 
	(userid, privacy, `name`, createtime, creatorId) 
	VALUES (OLD.id,'0',CONCAT(NEW.nickname,'喜欢的音乐'),CAST(UNIX_TIMESTAMP() * 1000 AS CHAR(20)),OLD.id);
	
	SET pid = LAST_INSERT_ID();
	
	INSERT INTO user_playlists 
	(userId,playList_ids)
	VALUES (OLD.id,pid);
	
	INSERT INTO user_subcount 
	(userId)
	values (OLD.id);
	
	INSERT INTO user_starts_playlists
	(userId,start_playList_ids) VALUES (OLD.id,'');
	
	INSERT INTO user_artist_sublist VALUES(OLD.ID,'',0);
	
	INSERT INTO user_album_sublist VALUES(OLD.ID,'',0);
	
# 	INSERT INTO user_comment_like VALUES('',OLD.ID);
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_album_sublist`
--

DROP TABLE IF EXISTS `user_album_sublist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_album_sublist` (
  `userId` int(11) NOT NULL,
  `album_ids` text,
  `length` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_album_sublist_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_album_sublist`
--

INSERT INTO `user_album_sublist` VALUES (3,'32312,32311',2),(6,'149730290,166875576',2),(8,'',0),(10,'165713108',1),(17,'',0);

--
-- Table structure for table `user_artist_sublist`
--

DROP TABLE IF EXISTS `user_artist_sublist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_artist_sublist` (
  `userId` int(11) NOT NULL,
  `artist_ids` text,
  `length` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_artist_sublist_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_artist_sublist`
--

INSERT INTO `user_artist_sublist` VALUES (3,'',0),(6,'735070',1),(8,'',0),(10,'13011210',1),(17,'',0);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_artistCount` AFTER UPDATE ON `user_artist_sublist` FOR EACH ROW BEGIN
UPDATE user_subcount SET artistCount = 
CASE WHEN NEW.artist_ids = '' THEN 0 ELSE (LENGTH(NEW.artist_ids) - LENGTH(REPLACE(NEW.artist_ids, ',', '')) + 1) END
WHERE userId = NEW.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_comment_like`
--

DROP TABLE IF EXISTS `user_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_comment_like` (
  `commentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `fk_user_comment_like_user_1` (`userId`),
  KEY `fk_user_comment_like_comment_1` (`commentId`),
  CONSTRAINT `fk_user_comment_like_comment_1` FOREIGN KEY (`commentId`) REFERENCES `comment` (`commentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_comment_like_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment_like`
--

INSERT INTO `user_comment_like` VALUES (9,10),(3,10),(2,10),(1,10),(15,10),(14,10);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `add_like` AFTER INSERT ON `user_comment_like` FOR EACH ROW BEGIN
	UPDATE `comment` SET likedCount = likedCount + 1 WHERE commentId = NEW.commentId; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `del_like` AFTER DELETE ON `user_comment_like` FOR EACH ROW BEGIN
	UPDATE `comment` SET likedCount = likedCount - 1 WHERE commentId = OLD.commentId; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_events`
--

DROP TABLE IF EXISTS `user_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `pics` json DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `json` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_events_user_1` (`userId`),
  CONSTRAINT `fk_user_events_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_events`
--

INSERT INTO `user_events` VALUES (1,10,'[{\"width\": 1024, \"height\": 1024, \"originUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/or1685964361461.png\", \"squareUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/sq1685964361461.png\"}]',18,'1685964369412','{\"msg\": \"\", \"song\": {\"id\": 1444201723, \"name\": \"想啊\", \"album\": {\"id\": 126215188, \"pic\": 109951166236713630, \"tns\": [], \"name\": \"渡日\", \"picUrl\": \"https://p1.music.126.net/W4pRQTzv9RwvtLtDbOla-g==/109951166236713625.jpg\", \"pic_str\": \"109951166236713625\"}, \"alias\": [], \"artists\": [{\"id\": 32439145, \"tns\": [], \"name\": \"李李李李卫央\", \"alias\": []}]}}'),(2,10,'[]',13,'1685971516723','{\"msg\": \"\", \"playlist\": {\"id\": \"25\", \"name\": \"没错我就是蔡徐坤\", \"creator\": {\"city\": 110101, \"gender\": \"2\", \"userId\": 10, \"birthday\": \"1465142400000\", \"nickname\": \"坤坤\", \"province\": 110000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/1685624230612.jpg\", \"signature\": \"你干嘛\", \"createTime\": \"1685624193\"}, \"coverImgUrl\": \"https://p2.music.126.net/PIBlaNiWJPczD_-mF0tGHw==/60473139539998.jpg\"}}'),(3,10,'[]',35,'1685971908977','{\"msg\": \"xxx\", \"title\": null, \"soundeffectsInfo\": null}'),(4,10,'[]',19,'1685972097317','{\"msg\": \"\", \"album\": {\"id\": \"37182\", \"name\": \"霹雳英雄之剑踪\", \"picUrl\": \"https://p1.music.126.net/PIBlaNiWJPczD_-mF0tGHw==/60473139539998.jpg\", \"artists\": [{\"id\": 12639, \"name\": \"霹雳布袋戏\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]}}'),(6,6,'[]',13,'1686011984270','{\"msg\": \"十分甚至九分的优美\", \"playlist\": {\"id\": \"29\", \"name\": \"大坤坤的魔法书\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/c12W_sGzVk4EDvSlpLgrgQ==/109951168292739532.jpg\"}}'),(7,6,'[]',13,'1686012008527','{\"msg\": \"非常的新鲜非常的oc\", \"playlist\": {\"id\": \"30\", \"name\": \"坤之魔法师\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p2.music.126.net/AdTn8p244H5cbTM-ZORJSA==/109951167311742695.jpg\"}}'),(8,6,'[{\"width\": 1800, \"height\": 1042, \"originUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/or1686019683201.png\", \"squareUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/sq1686019683201.png\"}, {\"width\": 1920, \"height\": 1337, \"originUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/or1686019683209.png\", \"squareUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/sq1686019683209.png\"}]',35,'1686019704989','{\"msg\": \"\", \"title\": null, \"soundeffectsInfo\": null}'),(10,6,'[]',18,'1686020001665','{\"msg\": \"\", \"song\": {\"id\": 1444201723, \"name\": \"想啊\", \"album\": {\"id\": 126215188, \"pic\": 109951166236713630, \"tns\": [], \"name\": \"渡日\", \"picUrl\": \"https://p1.music.126.net/W4pRQTzv9RwvtLtDbOla-g==/109951166236713625.jpg\", \"pic_str\": \"109951166236713625\"}, \"alias\": [], \"artists\": [{\"id\": 32439145, \"tns\": [], \"name\": \"李李李李卫央\", \"alias\": []}]}}'),(12,6,'[]',36,'1686021636153','{\"msg\": \"tamaonsen\", \"resource\": {\"id\": \"21200\", \"name\": \"魂音泉\", \"alias\": [\"たまおんせん\"], \"picUrl\": \"http://p1.music.126.net/BzRNjGTauxCbuP0Cjv72Cg==/109951164292304974.jpg\", \"albumSize\": 82, \"img1v1Url\": \"http://p1.music.126.net/oPef0DLvOt6tWV1VdapjUQ==/18754369836656335.jpg\", \"musicSize\": 367}}'),(13,6,'[]',18,'1686022921164','{\"msg\": \"more\", \"song\": {\"id\": \"29777226\", \"name\": \"原点回帰 -Guilty Life-\", \"album\": {\"id\": 2968067, \"pic\": 6665239488793807, \"tns\": [], \"name\": \"魂音泉別館 -壱壱-\", \"picUrl\": \"https://p2.music.126.net/2an30zbI3PP23PVVY3ZwZA==/6665239488793807.jpg\"}, \"alias\": [], \"artists\": [{\"id\": 0, \"tns\": [], \"name\": \"めぐたん\", \"alias\": []}]}}'),(22,10,'[]',13,'1686044485520','{\"msg\": \"\", \"playlist\": {\"id\": \"24\", \"name\": \"大肥鸡之歌\", \"creator\": {\"city\": 110101, \"gender\": \"2\", \"userId\": 10, \"birthday\": \"1465142400000\", \"nickname\": \"坤坤\", \"province\": 110000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/1685624230612.jpg\", \"signature\": \"你干嘛\", \"createTime\": \"1685624193\"}, \"coverImgUrl\": \"https://p1.music.126.net/dDI3IiW3prffuGwaB4pNuQ==/109951165795447979.jpg\"}}'),(25,6,'[]',13,'1686045557238','{\"msg\": \"\", \"playlist\": {\"id\": \"36\", \"name\": \"zun神\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg\"}}'),(40,10,'[]',22,'1686116493743','{\"msg\": \"奥利弗\", \"event\": {\"id\": 25, \"json\": {\"msg\": \"\", \"playlist\": {\"id\": \"36\", \"name\": \"zun神\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg\"}}, \"pics\": [], \"type\": 13, \"user\": {\"userId\": 6}, \"showTime\": 1686045557238, \"threadId\": 25}}'),(42,10,'[]',22,'1686121212064','{\"msg\": \"\", \"event\": {\"id\": 25, \"json\": {\"msg\": \"\", \"playlist\": {\"id\": \"36\", \"name\": \"zun神\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg\"}}, \"pics\": [], \"type\": 13, \"user\": {\"userId\": 6}, \"showTime\": 1686045557238, \"threadId\": 25}}'),(47,10,'[]',22,'1686129242953','{\"msg\": \"\", \"event\": {\"id\": 25, \"json\": {\"msg\": \"\", \"playlist\": {\"id\": \"36\", \"name\": \"zun神\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg\"}}, \"pics\": [], \"type\": 13, \"user\": {\"userId\": 6}, \"showTime\": 1686045557238, \"threadId\": 25}}'),(48,10,'[]',22,'1686129251162','{\"msg\": \"\", \"event\": {\"id\": 25, \"json\": {\"msg\": \"\", \"playlist\": {\"id\": \"36\", \"name\": \"zun神\", \"creator\": {\"city\": 330100, \"gender\": \"0\", \"userId\": 6, \"birthday\": \"-568108800000\", \"nickname\": \"大坤坤\", \"province\": 330000, \"avatarUrl\": \"https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg\", \"signature\": \"\", \"createTime\": \"1685416403\"}, \"coverImgUrl\": \"https://p1.music.126.net/Uf2AoZUiihhvvUU0hsBFzw==/109951164903287057.jpg\"}}, \"pics\": [], \"type\": 13, \"user\": {\"userId\": 6}, \"showTime\": 1686045557238, \"threadId\": 25}}'),(49,10,'[]',19,'1686129322727','{\"msg\": \"\", \"album\": {\"id\": \"165713108\", \"name\": \"THE SELECTED WORKS OF TAMAONSEN 6\", \"picUrl\": \"https://p1.music.126.net/GHDmjvW_i8rUhL7ju5g1uw==/109951168616831903.jpg\", \"artists\": [{\"id\": 21200, \"name\": \"魂音泉\", \"alias\": [], \"picId\": 0, \"trans\": \"\", \"picUrl\": \"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg\", \"followed\": false, \"img1v1Id\": 18686200114669624, \"albumSize\": 0, \"briefDesc\": \"\", \"img1v1Url\": \"https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg\", \"musicSize\": 0, \"topicPerson\": 0, \"img1v1Id_str\": \"18686200114669622\"}]}}'),(50,10,'[]',18,'1686185594763','{\"msg\": \"\", \"song\": {\"id\": \"812557\", \"name\": \"そんなゆめをみたの ~lonely dreaming girl~\", \"album\": {\"id\": 80466, \"pic\": 109951164943410270, \"tns\": [], \"name\": \"THE SELECTED WORKS OF TAMAONSEN\", \"picUrl\": \"https://p1.music.126.net/wz-mKO4JcAr9Cb44YJoaZQ==/109951164943410279.jpg\", \"pic_str\": \"109951164943410279\"}, \"alias\": [], \"artists\": [{\"id\": 21200, \"tns\": [], \"name\": \"魂音泉\", \"alias\": []}]}}');
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `create_info` AFTER INSERT ON `user_events` FOR EACH ROW BEGIN
	INSERT INTO events_info (id) VALUES (NEW.id);
	UPDATE user_message SET eventCount = eventCount + 1 WHERE NEW.userId = user_message.userId;
	
	IF NEW.type = 13 THEN
  UPDATE playlists_dynamic pd set shareCount =  shareCount + 1 WHERE
	JSON_EXTRACT(NEW.json, '$.playlist.id') = CAST(pd.id AS CHAR);
	END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `del_info` AFTER DELETE ON `user_events` FOR EACH ROW BEGIN
		IF OLD.type = 13 THEN
		UPDATE playlists_dynamic pd set shareCount =  shareCount - 1 WHERE
		JSON_EXTRACT(OLD.json, '$.playlist.id') = CAST(pd.id AS CHAR);
		END IF;
		
		UPDATE user_message SET eventCount = eventCount - 1 WHERE OLD.userId = user_message.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_follow`
--

DROP TABLE IF EXISTS `user_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_follow` (
  `userId` int(11) NOT NULL,
  `followId` int(11) DEFAULT NULL,
  KEY `fk_user_follow_user_1` (`userId`),
  KEY `fk_user_follow_user_2` (`followId`),
  CONSTRAINT `fk_user_follow_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_follow_user_2` FOREIGN KEY (`followId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follow`
--

INSERT INTO `user_follow` VALUES (6,10),(10,6);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `add_user_follow` AFTER INSERT ON `user_follow` FOR EACH ROW BEGIN
	UPDATE user_message SET followeds = followeds + 1 WHERE userId = NEW.followId;
	UPDATE user_message SET follows = follows + 1 WHERE userId = NEW.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `del_user_follow` AFTER DELETE ON `user_follow` FOR EACH ROW BEGIN
	UPDATE user_message SET followeds = followeds - 1 WHERE userId = OLD.followId;
	UPDATE user_message SET follows = follows - 1 WHERE userId = OLD.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_message`
--

DROP TABLE IF EXISTS `user_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_message` (
  `userId` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT 'https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg',
  `signature` varchar(255) DEFAULT NULL,
  `createTime` varchar(20) DEFAULT NULL,
  `birthday` varchar(20) DEFAULT NULL,
  `gender` enum('0','1','2') DEFAULT NULL,
  `province` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `followeds` int(11) DEFAULT '0' COMMENT '粉丝',
  `follows` int(11) DEFAULT '0' COMMENT '关注',
  `eventCount` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_message_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_message`
--

INSERT INTO `user_message` VALUES (3,'大牛马用户_9VhCywt84A','https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg','','1685341319','0','0',330000,330100,0,0,0),(6,'大坤坤','https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg','','1685416403','-568108800000','0',330000,330100,1,1,7),(8,'大牛马用户_H3bDINhUZG','https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg','','1685539792','0','0',330000,330100,0,0,0),(10,'坤坤大','https://cdn.jsdelivr.net/gh/southernMD/images@main/img/1685624230612.jpg','你干嘛','1685624193','1465142400000','2',110000,110101,1,1,11),(17,'大牛马用户_9gWdE1VD70','https://cdn.jsdelivr.net/gh/southernMD/images@main/img/202305251634496.jpg','','1713767554','0','0',330000,330100,0,0,0);
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_nickname` AFTER UPDATE ON `user_message` FOR EACH ROW BEGIN
	IF NEW.nickname <> OLD.nickname THEN
		UPDATE `user` SET nickname = NEW.nickname WHERE `user`.id = NEW.userId;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_playlists`
--

DROP TABLE IF EXISTS `user_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_playlists` (
  `userId` int(11) NOT NULL,
  `playList_ids` text,
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_playlists_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_playlists`
--

INSERT INTO `user_playlists` VALUES (3,'3'),(6,'4,36,35,34,31,32,28,29,30'),(8,'8'),(10,'18,20,21,22,24,25,26,27'),(17,'47');
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_createdPlaylistCount` AFTER UPDATE ON `user_playlists` FOR EACH ROW BEGIN
	UPDATE user_subcount us SET
	createdPlaylistCount = CASE WHEN NEW.playList_ids = '' THEN 0 ELSE (LENGTH(NEW.playList_ids) - LENGTH(REPLACE(NEW.playList_ids, ',', '')) + 1) END
	WHERE us.userId = NEW.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_starts_playlists`
--

DROP TABLE IF EXISTS `user_starts_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_starts_playlists` (
  `userId` int(11) NOT NULL,
  `start_playList_ids` text,
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_starts_playlists_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_starts_playlists`
--

INSERT INTO `user_starts_playlists` VALUES (3,''),(6,'26,25,27'),(8,''),(10,'35,28'),(17,'');
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_subPlaylistCount` AFTER UPDATE ON `user_starts_playlists` FOR EACH ROW BEGIN
	UPDATE user_subcount us SET
	subPlaylistCount = 
	CASE WHEN NEW.start_playList_ids = '' THEN 0 ELSE (LENGTH(NEW.start_playList_ids) - LENGTH(REPLACE(NEW.start_playList_ids, ',', '')) + 1) END
	WHERE us.userId = NEW.userId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_subcount`
--

DROP TABLE IF EXISTS `user_subcount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_subcount` (
  `userId` int(11) NOT NULL,
  `subPlaylistCount` int(11) DEFAULT '0' COMMENT '收藏歌单数',
  `artistCount` int(11) DEFAULT '0' COMMENT '收藏歌手数',
  `createdPlaylistCount` int(11) DEFAULT '1' COMMENT '创建歌单数',
  `albumCount` int(11) DEFAULT '0' COMMENT '收藏专辑数',
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_user_subcount_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subcount`
--

INSERT INTO `user_subcount` VALUES (3,0,0,1,0),(6,3,1,9,0),(8,0,0,1,0),(10,2,1,8,0),(17,0,0,1,0);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22 16:44:39
