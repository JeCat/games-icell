yc.oauth = {};
yc.oauth.weibo = function(){
	
	this.login = function( callback){
		thisb = this;
		WB2.login( function(){
			thisb.getUserInfo(function( o){
				callback(o);
			});
		});  
	} ,
	this.logout = function( callback){
		WB2.logout( callback); 
	} ,
	this.checkLogin = function( ){
		return WB2.checkLogin();
	} ,
	this.getUserInfo = function( callback){
			WB2.anyWhere(  
		          function(W)  
		          {  
		        	  W.parseCMD("/account/get_uid.json", function(sResult, bStatus){
		        		    W.parseCMD("/users/show.json", function(sResult2, bStatus2){
		        		    	callback( {id:sResult2.id , service:'weibo'}) ;
			        		},{
			        			uid : sResult.uid
			        		},{
			        		    method: 'get'
			        		});
		        		},{
		        			
		        		},{
		        		    method: 'get'
		        		});
		          }  
	       );  
	} ,
	this.publish = function(){
		WB2.anyWhere(  
				function(W)  
				{  
					W.widget.publish({
				        'id' : 'publish'
				    });
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

