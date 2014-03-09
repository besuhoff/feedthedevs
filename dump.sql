# Dump of table marks
# ------------------------------------------------------------

CREATE TABLE `marks` (
  `user_id` int(11) DEFAULT NULL,
  `release_id` int(11) DEFAULT NULL,
  `feed` enum('pizza','tomato') NOT NULL DEFAULT 'pizza',
  UNIQUE KEY `one_mark` (`user_id`,`release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table marks_cache
# ------------------------------------------------------------

CREATE TABLE `marks_cache` (
  `release_id` int(11) unsigned NOT NULL,
  `pizza` int(11) DEFAULT NULL,
  `tomato` int(11) DEFAULT NULL,
  PRIMARY KEY (`release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;