yc.inner.organ.Bottles = cc.Sprite.extend({

	size: 30
	
	, x: 0
	, y: 0

	, init: function(){
		// abstract method
	}
	, draw: function(ctx)
	{
		
		ctx.fillStyle = this.color ;
		ctx.beginPath();
		ctx.arc(0, 0, this.size, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
	,create: function()
	{

		$.ajax({
			type:'POST',
			url: "http://icell.jecat.cn/service/world.php",
			dataType : 'json',
			data: {
				'act':'save'
				, 'worldInfo':worldInfo+"|^_^|"+screenshot
				, 'userInfo' : icell_userInfo
				, 'worldName' : worldName
			},
			beforeSent: function(){
				$('#saveWorldMsg').html('<span id="aSaveWorldMsg">saving...</span>');
			},
			success: function(json){
				var msg = json['msg'];
				$('#saveWorldMsg').html('<span id="aSaveWorldMsg">'+msg+'</span>');
				setTimeout(function(){
					$("#aSaveWorldMsg").remove();
				}
				,msgTimeout);
			}
		});
	}
}) ;