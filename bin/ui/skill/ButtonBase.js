var STAR_STATE_GRABBED = 0;
var STAR_STATE_UNGRABBED = 1;

yc.ui.skill.ButtonBase = cc.Sprite.extend({
	boxWidth: 20
	, boxHeight: 20
	, _state : STAR_STATE_UNGRABBED
	, ctor: function(){
		var _skill = null;
		this.setSkill=function(s){
			_skill = s;
		}
		this.skill = function(){
			return _skill;
		}
	},
	draw: function(ctx){
		this._super();
		
		var radius = 10;
		ctx.fillStyle = "rgba(0,255,0,1)" ;
		ctx.beginPath() ;
		ctx.moveTo(radius,0) ;
		ctx.arc(0,0, radius, 0, Math.PI*2 , false) ;
		ctx.closePath();
		ctx.fill() ;
	},
	rect:function () {
		return cc.rect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
	},
	onEnter:function () {
		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
		this._super();
	},
	onExit:function () {
		cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
		this._super();
	},
	containsTouchLocation:function (touch) {
		var getPoint = touch.getLocation();
		var myRect = this.rect();
		myRect.origin.x += this.getPosition().x;
		myRect.origin.y += this.getPosition().y;
		return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
	}
	,onTouchBegan:function (touch, event) {
		if (this._state != STAR_STATE_UNGRABBED) return false;
		if (!this.containsTouchLocation(touch)) return false;
		this._state = STAR_STATE_GRABBED;
		return true;
	}
	,onTouchMoved:function (touch, event) {
	}
	,onTouchEnded:function (touch, event) {
		cc.Assert(this._state == STAR_STATE_GRABBED, "Star - Unexpected state!");
		this._state = STAR_STATE_UNGRABBED;
		if( this.containsTouchLocation(touch) ){
			this.onclick();
		}
	}
	,onclick:function(){
		this.skill().start();
	}
	
});
