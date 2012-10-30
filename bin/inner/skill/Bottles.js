yc.inner.skill.Bottles = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
		
	}
	, start: function(){
		

		var worldName = prompt('please input world name');
		if(!worldName){
			alert("不能为空！")
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
				"content":worldName
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
	
	, test : function(){
		$.ajax({
			type: "POST",
			url: "http://icell.jecat.cn/service/bottles.php",
			jsonp:'jsonp_callback',
			data: {
				"act":"getAll"
			},
			dataType: 'jsonp',
			success: function(json){
				
				for(var i =0;i<json.length;i++){
					
					var bottles = new yc.outer.Bottles ;
					bottles.id = json[i].id;
					bottles.create();
					bottles.x = json[i].x;
					bottles.y = json[i].y;

					var scene = cc.Director.getInstance().getRunningScene() ;
					scene.layerRoles.addChild(bottles);
					
				}
			}
		}); 
	}
})
