yc.inner.skill.Bullet = cc.Sprite.extend({
	x: 0
	, y: 0
	, ctor: function(){
		this._super();
		
		var _fromPosition = cc.p(0,0);
		var _targetPosition = cc.p(0,0);
		var _speed = 500;
		var _injure = 10;// 伤害
		var _injure_radius = 20;// 伤害半径
		
		this.setPosition = function(p){
			this.x = p.x;
			this.y = p.y;
		}
		this.getPosition = function(){
			return cc.p(this.x,this.y);
		}
		
		this.setFromPosition=function(p){
			_fromPosition = p;
		}
		this.fromPosition=function(p){
			return _fromPosition;
		}
		this.setTargetPosition = function(p){
			_targetPosition = p;
		}
		this.targetPosition=function(){
			return _targetPosition;
		}
		this.setSpeed=function(s){
			_speed = s;
		}
		this.speed=function(){
			return _speed;
		}
		this.setInjure = function(i){
			_injure = i;
		}
		this.injure = function(){
			return _injure;
		}
		this.setInjureRadius = function(r){
			_injure_radius = r;
		}
		this.injure_radius = function(){
			return _injure_radius;
		}
	}
	, run: function(){
		var from = this.fromPosition();
		this.setPosition(from);
		
		var target = this.targetPosition();
		var dis = yc.util.pointsDis(
			from.x,
			from.y,
			target.x,
			target.y
		);
		var time = dis/this.speed() ;
		
		var action = cc.MoveTo.create(time,target) ;
		var bullet = this;
		action._stop = action.stop;
		action.stop = function(){
			this._stop();
			bullet.bomb() ;
			// 回收对象
			bullet._parent.removeChild(bullet) ;
			yc.op.ins(yc.inner.skill.Bullet).free(bullet) ;
		}
		this.runAction(action);
	}
	, draw: function(ctx){
		if(g_architecture=='native')
		{
			this._super() ;
			return ;
		}
		
		this._super(ctx);
		var radius = 5;
		ctx.fillStyle = "rgba(0,255,0,1)" ;
		ctx.beginPath() ;
		ctx.moveTo(radius,0) ;
		ctx.arc(0,0, radius, 0, Math.PI*2 , false) ;
		ctx.closePath();
		ctx.fill() ;
	}
	// 子弹到达目标是发生爆炸
	, bomb: function(){
		var i;
		var virusClusterList = yc.outer.VirusCluster.instances ;
		var from = this.getPosition() ;
		for(i in virusClusterList){
			var virusCluster = virusClusterList[i];
			var vPos = cc.p( virusCluster.x , virusCluster.y );
			var dist = yc.util.pointsDis(
				from.x,
				from.y,
				vPos.x,
				vPos.y
			);
			if( dist < this.injure_radius() ){
				virusCluster.hit( this.injure() );
			}
		}
	}
	, transform: yc.outer.Camera.transformSprite
});
