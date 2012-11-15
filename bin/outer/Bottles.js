yc.outer.Bottles = cc.Sprite.extend({  

	id : 0,
	
	ctor : function(){
		this._super();
	},
	
	create: function()
	{
		/**
		 * 瓶子
		 */
		this.pz = cc.Sprite.create("res/organ/Bullet.png");
		this.pz.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//随机倾斜
		this.Rotation = Math.floor(Math.random()*30+1);
		if( Math.random() > 0.5){
			this.Rotation = -this.Rotation;
		}
		this.pz.setRotation( this.Rotation);

		//this.pz.setVisible(false);
		this.addChild(this.pz , 0);
		//慢慢出现
        var action = cc.Sequence.create(
        		//cc.Hide.create(),
        		//cc.DelayTime.create(0.5),
                cc.FadeIn.create(1.0)
        );
        this.pz.runAction(action);
		//this.initWithCircle(5,this.x,this.y,yc.settings.outer.aminoacid.density) ;
        
        yc.outer.Bottles.list.push(this);
        
	},
	rect:function () {
		return cc.rect(-30 / 2, -30 / 2, 30, 30);
	},
	containsTouchLocation:function (touch) {
		
		//判断点击的是否是瓶子
		var getPoint = touch.getLocation(); // screen
		var myRect = this.rect();
		
		var p = new Object();
		p.x = this.x;
		p.y = this.y;
		
		var cameraPosition = yc.outer.Camera.worldPos2ScreenPos( p ) // world
		myRect.origin.x += cameraPosition.x;
		myRect.origin.y += cameraPosition.y;
		
		//console.log(myRect);
		
		return cc.Rect.CCRectContainsPoint(myRect, getPoint);
	},
	onEnter:function () {
		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
		
		this._super();
	},
	onTouchBegan:function (touch, event) 
	{
		if (!this.containsTouchLocation(touch)) return false;
		
		if( typeof(this.pp) == "undefined" )
		{
			this.msgClear();
			this.pp = cc.Sprite.create("res/organ/Msg.png");
			this.addChild(this.pp);
			this.pp.setPosition(-40,80);

			if( g_architecture=='html5' )
			{
				bThis = this;
				$.ajax({
					type: "POST",
					url: "http://icell.jecat.cn/service/bottles.php",
					jsonp:'jsonp_callback',
					data: {
						"act":"get",
						"id":this.id
					},
					dataType: 'jsonp',
					success: function(json){
						
						if(json.msg == "ok"){

							bThis.label = cc.Sprite.create();
							bThis.label.setPosition(13,97);
							bThis.label.draw = function(ctx)
							{
						    	var font = ins(yc.ui.font.Font);
						    	font.setWidth(140);
						    	font.setHeight(75);
						    	font.setTextIndent(0);
						    	font.setTextAlign('left');
						    	font.setLetterSpacing(4);
						    	font.setLineHeight(15);
						    	font.setText(json.content);
						    	font.draw(ctx);
							}
							bThis.pp.addChild(bThis.label);
							//bThis.label.setString(json.content);
						}
					}
				}); 
			}
			return true;
		}
		
		if( typeof(this.pp) == "object" && this.pp._isVisible == true)
		{
			this.pp.setVisible(false);
		}else{
			this.msgClear();
			this.pp.setVisible(true);
		}
		
//		this.label.removeFromParent(true);
//		this.pp.removeFromParent(true);
//		this.pp = null;
//		this.label = null;
		
		return true;
	},
	onTouchMoved:function (touch, event) {
		
	},
	onTouchEnded:function (touch, event) {
		
	},
	msgClear: function(){
		for(var rs in yc.outer.Bottles.list)
		{
			if(typeof(yc.outer.Bottles.list[rs].pp) == "object"){
				yc.outer.Bottles.list[rs].pp.setVisible(false);
			}
		}
	},
	transform: yc.outer.Camera.transformSprite
}) ;

/**
 * 所有瓶子
 */
yc.outer.Bottles.all = function( level){
	
	yc.outer.Bottles.list = new Array();


	// 加载关卡上的留言
	if( g_architecture=='html5' )
	{
		$.ajax({
			type: "POST",
			url: "http://icell.jecat.cn/service/bottles.php",
			jsonp:'jsonp_callback',
			data: {
				"act":"getAll",
				"level":level
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
					
					yc.outer.Bottles.list.push(bottles);
				}
			}
		}); 
	}
}


