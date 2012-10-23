
function loginCallback(data){
	icell_userInfo = data;
	if(!icell_userInfo){
		// $("#ui-levels-selector-login").append("<span id='login_error_msg' stype='color:red;'>login error</span>");
		alert("login error");
		return;
	}

	var username = icell_userInfo;

	// $("#login_error_msg").remove();

	// $("#ui-levels-selector-login").html("<h3>"+username+"</h3>");

	// $("#ui-levels-selector-menu").stop(false,true).slideDown(600);
}

function unEncryptUserInfo(icell_userInfo){
	var userInfo = icell_userInfo.split('#');
	return {'uid':userInfo[0],'service':userInfo[1]};
}