yc.inner.skill.ShootVirusCluster = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
	}
	, start: function(){
		var bullet = yc.op.ins(yc.inner.skill.Bullet).ob();
		var gs = scene;
		gs.layerFg.addChild(bullet);
		
		// injure
		bullet.setInjure( 3 );
		bullet.setInjureRadius( 30 );
		
		// from
		bullet.setFromPosition( this.building().getPosition() );
		
		// target
		var cvc = this.findClosestVirusCluster(bullet.fromPosition()) ;
		var target ;
		if( cvc ) {
			target = cc.p( cvc.x , cvc.y );
		}else{
			target = cc.p(-100,-100);
		}
		
		console.log( target );
		bullet.setTargetPosition( target ) ;
		bullet.run() ;
	}
	, findClosestVirusCluster: function(from){
		var i;
		var virusClusterList = yc.outer.VirusCluster.instances ;
		
		var minDist = 100000;
		var minV = null;
		for(i in virusClusterList){
			var virusCluster = virusClusterList[i];
			var vPos = cc.p( virusCluster.x , virusCluster.y );
			console.log( from );
			var dist = yc.util.pointsDis(
				from.x,
				from.y,
				vPos.x,
				vPos.y
			);
			console.log( dist );
			if( dist < minDist ){
				minDist = dist ;
				minV = virusCluster ;
			}
		}
		return minV;
	}
})
