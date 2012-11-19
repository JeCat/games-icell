yc.inner.building.Recycle = yc.inner.building.Building.extend({
	
	ctor: function(){
		this.mitochondrias = [] ;
		this.mitochondriaCount = 1 ;
	}
	
	, put: function(hexgon){
		this._super(hexgon) ;
		
		this.releaseMitochondrias() ;
	}
	
	, releaseMitochondrias: function(){
		while( this.mitochondrias.length < this.mitochondriaCount )
		{
			var entity = new yc.inner.monster.Mitochondria(this) ;
			ins(yc.inner.monster.VirusLayer).addChild(entity) ;
			this.mitochondrias.push(entity) ;

			entity.release(cc.p( this.hexgon.center[0], this.hexgon.center[1] )) ;
		}
	}
	
	/**
	 * 拆除
	 */
	, demolish: function(){
		this._super() ;
		
		// 回收线粒体
		for(var m=0;m<this.mitochondrias.length;m++)
		{
			this.mitochondrias[m].destroy() ;
			yc.util.arr.remove(this.mitochondrias,this.mitochondrias[m]) ;
		}
	}
	
	/**
	 * 停用：线粒体回到漫步状态
	 */
	, stop: function(){}
}) ;

yc.inner.building.Recycle.price = {}

yc.inner.building.Recycle.upgraders = [] ;

yc.inner.building.Recycle.block = true ;
