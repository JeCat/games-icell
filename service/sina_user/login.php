<?php
session_start();

include_once( '../../app_key_config.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

$code_url = $o->getAuthorizeURL( "http://icell.jecat.cn/service/sina_user/callback.php" );
header("Location:" . $code_url);