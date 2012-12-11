yc.inner.skill.Bullet = cc.Sprite.extend({
	ctor: function(){
		this._super();
		
		this.sound = "Wind06.ogg";
		
		this._fromPosition = cc.p(0,0);
		this._targetPosition = cc.p(0,0);
		var _speed = 500;
		var _injure = 10;// 伤害
		var _injure_radius = 20;// 伤害半径
		
		this.setFromPosition=function(p){
			this._fromPosition = p;
		}
		this.fromPosition=function(p){
			return this._fromPosition;
		}
		this.setTargetPosition = function(p){
			this._targetPosition = p;
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
		var from = this._fromPosition;
		this.setPosition(from);
		
		var target = this._targetPosition;
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
	//, transform: yc.outer.Camera.transformSprite
});
