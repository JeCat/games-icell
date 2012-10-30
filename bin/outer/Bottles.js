yc.outer.Bottles = cc.Sprite.extend({  

	id : 0,
	
	ctor : function(){
		this._super();
	},
	
	create: function()
	{
		this.initWithFile("res/organ/Bullet.png");
		//this.initWithCircle(5,this.x,this.y,yc.settings.outer.aminoacid.density) ;
	},
	rect:function () {
		return cc.rect(-50 / 2, -50 / 2, 50, 50);
	},
	containsTouchLocation:function (touch) {
		
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
					alert(json.content)
				}
				
			}
		}); 
		
		return true;
	},
	onTouchMoved:function (touch, event) {
	}
	,onTouchEnded:function (touch, event) {
	},
	draw: function( ctx){
		this._super( ctx, true);
	},
	transform: yc.outer.Camera.transformSprite
}) ;

