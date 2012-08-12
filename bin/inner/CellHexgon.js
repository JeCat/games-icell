yc.inner.CellHexgon = function CellHexgon(){
	
	// 类型：nucleus(细胞核)，membrane(细胞膜)，sap(细胞液)
	this.type = null ;
	
	// 建筑物
	this.building = null ; 

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
	
	
	this.isBlocking = function()
	{
		return (this.type===null || this.block)? true: false ;
	}
}


