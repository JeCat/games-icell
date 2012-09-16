<?php
include_once( 'config.php' );

$GLOBALS['conn'] = mysql_connect(
	DB_HOST
	, DB_USER
	, DB_PASSWORD
	);
mysql_query("set name 'utf8'");
mysql_select_db(DB_NAME, $GLOBALS['conn']);