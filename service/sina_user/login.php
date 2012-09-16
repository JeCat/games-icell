<?php
session_start();

include_once( '../../app_key_config.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

$code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );

header("Location:" . $code_url);   //will cal callback.php later