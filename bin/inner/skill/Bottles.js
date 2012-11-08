yc.inner.skill.Bottles = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
		
		this.setName( 'Bottles' );
		
	}
	, start: function(){
		

		var worldName = prompt('留下您的心情!');
		
		if(!worldName){
			alert("不能为空！")
			return;
		}
		
		if(yc.ui.font.Font.len(worldName) > 90){
			alert("内容过长！")
			return;
		}
		

		var cellPosition = ins(yc.outer.Cell);
		
		$.ajax({
			type: "POST",
			url: "http://icell.jecat.cn/service/bottles.php",
			jsonp:'jsonp_callback',
			data: {
				"act":"create",
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
				scene.layerRoles.addChild(bottles);
				
				
				//console.log(cellPosition);
				bottles.x = cellPosition.x;
				bottles.y = cellPosition.y;
				
			}
		}); 

		this._super();
	}
	
})
