yc.inner.skill.Bottles = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
		
		this.setName( 'Bottles' );
		this.setIcon( 'res/skill/bottles.png' );

		this.sound = "Water02.ogg";
		
	}
	, start: function(){
		

		var worldName = prompt('留下您的心情!');
		
		if(!worldName){
			alert("不能为空！")
			return false;
		}
		
		if(yc.ui.font.Font.len(worldName) > 90){
			alert("内容过长！")
			return false;
		}
		

		var cellPosition = ins(yc.outer.Cell);
		var user = unEncryptUserInfo(icell_userInfo);
		
		$.ajax({
			type: "POST",
			url: "http://games.jecat.cn/service/bottles.php",
			jsonp:'jsonp_callback',
			data: {
				"act":"create",
				"uid":user.uid,
				"service":user.service,
				//"face":"",
				"x":cellPosition.x,
				"y":cellPosition.y,
				"content":worldName,
				"level":yc.GameScene._level
			},
			dataType: 'jsonp',
			success: function(json){
				
				var bottles = new yc.outer.Bottles ;
				bottles.id = json.last_id;
				bottles.create();

				var scene = cc.Director.getInstance().getRunningScene() ;
				
				var bottlesLayer = ins(yc.outer.Bottles.bottlesLayer);
				scene.layerRoles.addChild(bottlesLayer) ;
				bottlesLayer.addChild(bottles);
				
				//console.log(cellPosition);
				bottles.setPosition( cc.p(cellPosition.x ,cellPosition.y)) ;
				
				
				// 同步微薄
				if( user.uid != "0"){
					
					worldName += " 来自于：icell(我，细胞) http://games.jecat.cn/icell/";
					
					ins(yc.oauth.weibo).publish(worldName);
				}
				
			}
		}); 

		this._super();
	}
	
})
