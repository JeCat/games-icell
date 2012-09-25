yc.util.ObjectPool = yc.op = function ObjectPool(className)
{
	this.freeObjects = [] ;
	this.usingObjects = {} ;
	this.count = 0 ;
	this.nAssignedId = 0 ;
	
	this.className = className ;
	
	/**
	 * 从对象池中取出一个对象
	 */
	this.ob = function(){
		if(!this.freeObjects.length)
		{
			var ob = new className() ;
			ob.__ObjectPoolId__ = this.nAssignedId ++
		}
		else
		{
			var ob = this.freeObjects.pop() ;
		}
		
		ob.using = true ;
		this.usingObjects[ob.__ObjectPoolId__] = ob ;
		this.count ++ ;
		
		return ob ;
	}
	/**
	 * 将对象归还到对象池中
	 */
	this.free = function(ob){
		delete this.usingObjects[ob.__ObjectPoolId__] ;
		this.count -- ;
		ob.using = false ;
		
		this.freeObjects.push(ob) ;
	}
	
	this.total = function(){
		return this.freeObjects.length + this.count ;
	}
}

yc.util.ObjectPool.ActionFree = cc.Action.extend({
	stop: function(){
		yc.util.ObjectPool.ins(this._target.contructor).free(this._target) ;

		if( typeof(this._target.free)=='function' )
		{
			this._target.free() ;
		}
	}
	, isDone: function(){
		return ! this._target.using ;
	}
}) ;

yc.util.ObjectPool.mapFlyweights = {} ;
yc.util.ObjectPool.ins = function(className){
	
	var name = typeof(className.className)=='undefined'? className.name: className.className ;
	if( !name || typeof(name)=='undefined' )
	{
		return null ;
	}
	if( typeof(yc.util.ObjectPool.mapFlyweights[name])=='undefined' )
	{
		yc.util.ObjectPool.mapFlyweights[name] = new yc.util.ObjectPool(className) ;
	}
	return yc.util.ObjectPool.mapFlyweights[name] ;
}
