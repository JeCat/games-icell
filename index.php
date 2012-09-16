<?php
include_once('config.php');
session_start();

if(SITE_DEBUG_MODE === 1){
var_dump($_SESSION);
echo "<br/>";
var_dump($_COOKIE);
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>you,cell</title>
	<link rel="stylesheet" href="style.css"></link>
	<script src="jquery.js"></script>
</head>
<body>

<?php
if(SITE_CLOSE === 0){
?>
<div id="ui-levels-selector" style="margin:150px auto 0 auto;">
	<div id="ui-levels-selector-title">
		<h1>I, Cell</h1>
		<p>You are a cell under someone's microscope ……</p>
	</div>
	
	<div id="ui-levels-selector-login">
		<div>
			<a href="service/sina_user/login.php">
				<img src="img/weibo_login.png" title="点击进入授权页面" alt="点击进入授权页面" border="0" width="119" height="24"/>
			</a>
		</div>
		<div>
			<a href="service/sina_user/login.php">
				test user for dev
			</a>
		</div>
	</div>
</div>
<?php
}else{
?>
<div id="ui-levels-selector" style="margin:150px auto 0 auto;">
	<div id="ui-levels-selector-title">
		<h1>I, Cell</h1>
		<h2>We will be back soon...</h2>
	</div>
</div>
<?php
}
?>
</body>
</html>