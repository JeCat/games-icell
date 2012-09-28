$(function(){

	$("#weibo_auth_login").click(function(){
		window.open('service/sina_user/login.php');
		return false;
	});

	$("#loginWithTestUser").click(function(){
		loginCallback("0#test");
		return false;
	});

});


function loginCallback(data){
	icell_userInfo = data;
	if(!icell_userInfo){
		$("#ui-levels-selector-login").append("<span id='login_error_msg' stype='color:red;'>login error</span>");
		return;
	}

	var username = icell_userInfo;

	$("#login_error_msg").remove();

	$("#ui-levels-selector-login").html("<h3>"+username+"</h3>");

	$("#ui-levels-selector-menu").slideDown(1000);
}