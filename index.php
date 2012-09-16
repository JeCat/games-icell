<?php
session_start();

?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>you,cell</title>
	<link rel="stylesheet" href="style.css"></link>
	<script src="jquery.js"></script>
	<script src="jquery.json.js"></script>
</head>
<body>


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

</body>
</html>