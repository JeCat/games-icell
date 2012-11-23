yc.oauth = {};
yc.oauth.weibo = function(){
	
	this.login = function( callback){
		WB2.login( callback);  
	} ,
	this.logout = function( callback){
		WB2.logout( callback); 
	} ,
	this.checkLogin = function( ){
		return WB2.checkLogin();
	} ,
	this.getStatus = function(){
		var url="/statuses/friends_timeline.json";  
	       WB2.anyWhere(  
	          function(W)  
	          {  
	              W.parseCMD(  
	                url,  
	                function(result,b)  
	                {  
	                    for(i=0;i<result.length;i++)  
	                    {  
	                        username=result[i].user.name;//微博作者  
	                        userimg=result[i].user.profile_image_url;//微博作者头像  
	                        date=result[i].created_at;  //微博发布时间          
	                        id= result[i].id;//微博id  
	                        text=result[i].text;//微博内容  
	                        img=result[i].thumbnail_pic;//微博配图  
	                        if(result[i].retweeted_status!=null)  
	                        {  
	                            username1=result[i].retweeted_status.user.name;  
	                            text=text+"@"+username1+"<br>"+result[i].retweeted_status.text;//转发内容  
	                            img=result[i].retweeted_status.thumbnail_pic;//微博配图,小图  
	                        }  
	                        if(img!=null)  
	                        {  
	                            text=text+"<br><img src=\""+img+"\" />";  
	                        }                         
	                          
	                        message="<img src=\""+userimg+"\"> "+username+":"+text;  
	                        alert(message)
	                          
	                    }  
	                     
	                }  
	              );  
	          }  
	       );  
	}
}

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

