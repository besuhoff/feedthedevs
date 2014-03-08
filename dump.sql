# Dump of table marks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `marks`;

CREATE TABLE `marks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `release_id` int(11) DEFAULT NULL,
  `feed` enum('pizza','tomato') NOT NULL DEFAULT 'pizza',
  PRIMARY KEY (`id`),
  UNIQUE KEY `one_mark` (`user_id`,`release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;