<?php
//site
define( "SITE_DIR" , dirname(__FILE__) );
define( "SITE_DEBUG_MODE" , isset($_GET['debug'])? 1 : 0 );
define( "SITE_CLOSE" , 0 );

//db
define( "DB_HOST" , '127.0.0.1' );
define( "DB_NAME" , 'icell' );
define( "DB_USER" , 'root' );
define( "DB_PASSWORD" , '7852369' );

//weibo oauth
define( "WB_AKEY" , '749560871' );
define( "WB_SKEY" , '3d894a6cff49cd1bfbd523d4ee21cab3' );
define( "WB_CALLBACK_URL" , 'http://' . $_SERVER['HTTP_HOST'] . '/service/sina_user/callback.php' );
define( "GAME_URL" , 'http://' . $_SERVER['HTTP_HOST'] . '/icell.php' );