yc.inner.skill.OutsideShooter = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
		
		this.setName( 'OutsideShooter' );
		this.setCoolingTime( 5 );// 冷却时间
	}
	, start: function(){
		var bullet = yc.op.ins(yc.inner.skill.Bullet).ob();
		var gs = scene;
		gs.layerFg.addChild(bullet);
		
		// injure
		bullet.setInjure( 3 );
		bullet.setInjureRadius( 30 );
		
		// from
		var b = this.building().getParent().getParent() ;
		var ptf = yc.util.clientToWindow(
			b,
			b.x,
			b.y
		);
		var ptr = cc.p(ptf[0],ptf[1]);
		bullet.setFromPosition( ptr );
		
		// target
		var cvc = this.findClosestVirusCluster(bullet.fromPosition()) ;
		var target ;
		if( cvc ) {
			target = cc.p( cvc.x , cvc.y );
		}else{
			target = cc.p(-100,-100);
		}
		
		bullet.setTargetPosition( target ) ;
		bullet.run() ;
		
		this._super();
	}
	, findClosestVirusCluster: function(from){
		var i;
		var virusClusterList = yc.outer.VirusCluster.instances ;
		
		var minDist = 100000;
		var minV = null;
		for(i in virusClusterList){
			var virusCluster = virusClusterList[i];
			var vPos = cc.p( virusCluster.x , virusCluster.y );
			var dist = yc.util.pointsDis(
				from.x,
				from.y,
				vPos.x,
				vPos.y
			);
			if( dist < minDist ){
				minDist = dist ;
				minV = virusCluster ;
			}
		}
		return minV;
	}
})
