<?php
session_start();

include_once( '../../config.php' );
include_once( '../user.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = WB_CALLBACK_URL;
	try {
		$token = $o->getAccessToken( 'code', $keys ) ;
	} catch (OAuthException $e) {
		throw $e;
	}
}

if ($token) {
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$o->client_id, $token['uid'] , time()+3600 , '/');

	$user = User::getFlyweigth($token['uid'] , $token['service']);
	if($user->isExist()){
		//update token_time and expires_in
		// $user->token_time = 
	}else{
		
	}

?>

Login success! ^_^ <a href="<?php echo GAME_URL?>">Go to your cell world!</a><br />
<?php
} else {
?>
Login failed... -_-! <a href="/">Try again ?</a>
<?php
}
?>