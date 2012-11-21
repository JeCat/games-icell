var STAR_STATE_GRABBED = 0;
var STAR_STATE_UNGRABBED = 1;

yc.ui.skill.ButtonBase = cc.Sprite.extend({
	boxWidth: 50
	, boxHeight: 50
	, _state : STAR_STATE_UNGRABBED
	, title : null
	, keyCode : null
	, icon : null
	, ctor: function(icon){
		var _skillList = [] ;
		this.addSkill=function(s){
			_skillList.push( s );
		}
		this.removeSkill=function(s){
			
			for(var i=0; i<_skillList.length; i++)
			{
				if(s.num == _skillList[i].num){
					_skillList.splice(i,1);
				}
			}
			
			if( _skillList.length < 1){
				this.setVisible(false);
			}
			
		}
		this.skillList = function(){
			return _skillList;
		}


		this.initWithFile("res/skillbj.png");
		

	},
	setTitle: function(title){
		if(title){
			this.title = title;
		}
	},
	setIcon: function(icon){
		if(icon){
			this.icon = icon;
		}
	},
	setKeyCode: function(keyCode){
		if(keyCode){
			this.keyCode = keyCode;
		}
	},
	draw: function(ctx){
		
			if(g_architecture=='native')
			{
				this._super() ;
				return ;
			}
		
			this._super() ;

			var h = this.getCoolDownPercent();
			if ( h != 1)
			{
				h = 1-h;
				this.cd.setScaleY(h);
			}
		
	},
	rect:function () {
		return cc.rect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
	},
	onEnter:function () {

		var skill = cc.Sprite.create(this.icon);
		skill.setPosition( cc.p( 25,26) );
		this.addChild(skill);

		var skillk = cc.Sprite.create("res/skill.png");
		skillk.setPosition( cc.p( 25,26) );
		this.addChild(skillk);
		
		this.cd = cc.LayerColor.create(cc.c4(0, 0, 0, 180), 36 ,36);  
		this.cd.setAnchorPoint(new cc.Point(0,0));
		this.cd.setPosition(cc.p(7, 8));
        //this.cd.setVisible(false);
		this.cd.setScale(1,0.000001);
        this.addChild(this.cd);  
        
        
        var title = cc.LabelTTF.create(this.title, "Arial", 8);
        title.setPosition(cc.p(7, 42));
        this.addChild(title);  
		
		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
		cc.Director.getInstance().getKeyboardDispatcher().addDelegate(this);
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
		var i,skill;
		var skillList = this.skillList() ;
		for( i in skillList ){
			skill = skillList[i];
			if( skill.canStart() ){
				if(skill.start.apply(skill.target) != false){
					
					

				}
		        
				/*
				var thisb = this;
				var skill = cc.Sprite.create();
				skill.draw = function(ctx){

					var radius = 16;
					ctx.fillStyle = "#513f2f" ;
					ctx.beginPath() ;
					ctx.moveTo(0,0) ;
					ctx.lineTo(radius,0) ;
					ctx.arc(0,0, radius, 0, Math.PI*2 * thisb.getCoolDownPercent(), false) ;
					ctx.lineTo(0,0) ;
					ctx.closePath();
					ctx.fill() ;
					
					if(thisb.getCoolDownPercent() == 1){
						//this.setVisible(false);
					}
				}
				skill.setPosition( cc.p( 34,28 ) );
				thisb.addChild(skill);*/
				
				break;
			}
		}
		
	}
	,onKeyUp:function (key) {
		if(key == this.keyCode){
			this.onclick();
		}
	}
	,onKeyDown:function (key) {
		
	}
	,getCoolDownPercent:function(){
		var i,skill;
		var skillList = this.skillList() ;
		var coolingTime = skillList[0].coolingTime() ;
		var minLeftCoolingTime = coolingTime ;
		for( i in skillList ){
			skill = skillList[i];
			if( skill.leftCoolingTime() < minLeftCoolingTime ){
				minLeftCoolingTime = skill.leftCoolingTime() ;
			}
		}
		return 1.0 - 1.0*minLeftCoolingTime / coolingTime ;
	}
	
});
