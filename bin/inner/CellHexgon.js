yc.inner.CellHexgon = function CellHexgon(){
	
	// 类型：nucleus(细胞核)，membrane(细胞膜)，sap(细胞液)
	this.type = null ;
	
	// 建筑物
	this.building = null ; 
	
	this.selected = false ;

	// 取得特定类型的邻接格子（type==null）
	this.neighborsByType = function(type)
	{
		var returnNeighbors = {} ;
		
		for(var way in this.neighbors)
		{
			var neighbor = this[way]() ;
			if( neighbor && neighbor.type===type )
			{
				returnNeighbors[way] = neighbor ;
			}
		}
		
		return returnNeighbors ;
	}
	
	// 到细胞核的弧度
	this._radianToNucleus = null ;
	this.radianToNucleus = function(){
	    if( this._radianToNucleus===null )
	    {
	        this._radianToNucleus = yc.util.radianBetweenPoints( cell.nucleus.center[0], cell.nucleus.center[1], this.center[0], this.center[1] ) ;
	    }
	    return this._radianToNucleus ;
	}
	
	this.isBlocking = function()
	{
	    return (
           this.type===null        // 无法使用的区域
            || this.block          // 被标记为空
    	    || (this.building && this.building.isBlocking()) // 建造了禁止通行的建筑
    	)? true: false ;
	}
}


