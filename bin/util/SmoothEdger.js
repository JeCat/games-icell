yc.util.SmoothEdger = function(){
	
	this._points = [] ;
	this._pointMapping = {} ;
	
	this.put = function(point) {
		var keyX = Math.round(point[0]*100) ;
		var keyY = Math.round(point[1]*100) ;
		
		if( !(keyX in this._pointMapping) )
		{
			this._pointMapping[keyX] = {} ;
		}
		if( !(keyY in this._pointMapping[keyX]) )
		{
			this._pointMapping[keyX][keyY] = point ;
			this._points.push(point) ;
		}
	}
	
	this.build = function(len){
		
		var output = [] ;
		var pt = this._points[0] ;
        arr.splice(0,1) ;
		output.push(pt) ;
		
		while(1){
			
			// 用完了
			if(this._points.length<1)
			{
				break ;
			}
			
			var nearestPtDis = 0 ;
			var nearestPtIdx = -1 ;
			
			for(var i=0;i<this._points.length;i++)
			{
				var nextPt = this._points[i] ;
				var dis = yc.util.yc.util.pointsDis(pt[0].pt[1],nextPt[0],nextPt[1]) ;
				if( dis < len )
				{
					nearPts.push(nextPt) ;
					
					if(nearestPtDis==0 || nearestPtDis>dis)
					{
						nearestPtDis = dis ;
						nearestPtIdx = i ;
					}
				}
			}
			
			// 断了 ……
			if(nearestPtIdx==-1)
			{
				break ;
			}
			
			output.push( this._points[nearestPtIdx] ) ;
			this._points.splice(nearestPtIdx,1) ;
		}
		
		this._points = [] ;
		return output ;
	}
}