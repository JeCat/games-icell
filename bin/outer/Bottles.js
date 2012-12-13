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
//        var action2 = cc.RepeatForever.create(
//                		
//                		cc.RotateTo.create(1, this.Rotation + 60),
//                        cc.RotateBy.create(1, this.Rotation + 60)
//                
//        );
        this.pz.runAction(action);
		//this.initWithCircle(5,this.x,this.y,yc.settings.outer.aminoacid.density) ;
        
        yc.outer.Bottles.list.push(this);
        
	},
	rect:function () {
		return cc.rect(-80 / 2, -80 / 2, 80, 80);
	},
	containsTouchLocation:function (touch) {
		
		//判断点击的是否是瓶子
		var getPoint = touch.getLocation(); // screen
		var p = yc.util.windowToClient(this,getPoint.x,getPoint.y) ;
		return cc.Rect.CCRectContainsPoint( this.rect(), {x:p[0], y:p[1]} ) ;
	},
	onEnter:function () {
		//cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
		this._super();
	},
	onTouchesEnded:function (touch, event) 
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
					url: "http://games.jecat.cn/service/bottles.php",
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
	}
}) ;

yc.outer.Bottles.bottlesLayer = cc.Layer.extend({
	
	ctor: function(){
		this._super() ;
		// 点击事件
//		this.setTouchMode( cc.TOUCH_ONE_BY_ONE);
		this.setTouchEnabled(true);
	},
	onTouchesBegan: function(touches, event){
		
		if( typeof(touches[0]) == "object"){
			var children = this.getChildren() ;
			var isRightClick = false;
			for(var i=0;i<children.length;i++)
			{
				// 传递点击事件
				if( children[i].onTouchesEnded(touches[0])){
					isRightClick = true;
				} 
			}
		}

		return !isRightClick;
	}
}) ;

/**
 * 所有瓶子
 */
yc.outer.Bottles.all = function( level){
	
	if( g_architecture=='html5' )
	{
		yc.outer.Bottles.list = new Array();
		$.ajax({
			type: "POST",
			url: "http://games.jecat.cn/service/bottles.php",
			jsonp:'jsonp_callback',
			data: {
				"act":"getAll",
				"level":level
			},
			dataType: 'jsonp',
			success: function(json){
				
				var scene = cc.Director.getInstance().getRunningScene() ;
				var bottlesLayer = new yc.outer.Bottles.bottlesLayer;
				scene.layerRoles.addChild(bottlesLayer) ;
				
				for(var i =0;i<json.length;i++){
					
					var bottles = new yc.outer.Bottles ;
					bottles.id = json[i].id;
					bottles.create();
					bottles.setPosition(cc.p(json[i].x,json[i].y)) ;

					bottlesLayer.addChild(bottles);
					
					yc.outer.Bottles.list.push(bottles);
				}
			}
		}); 
	}
}


