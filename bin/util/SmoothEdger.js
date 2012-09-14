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
			this._points.push({
				p: point
				, used: false
				, idx: this._points.length
			}) ;
		}
	}
	
	this.build = function(len){
		
		// 找到 y 最大的一个点
		var maxY = null ;
		var maxYPtIdx = -1 ;
		for(var i=0;i<this._points.length;i++)
		{
			var p = this._points[i].p ;
			
			if(maxY===null || p[1]>maxY)
			{
				maxYPtIdx = i ;
				maxY = p[1] ;
			}
		}
		// log([maxYPtIdx,maxY]) ;
		
		// -------
		var output = [] ;
		var pt = this._points[maxYPtIdx] ;
		this._points[maxYPtIdx].used = true ;
		output.push(pt.p) ;
		var preR = 0 ;
		
		while(1){
			
			// 用完了
			if(this._points.length<1)
			{
				break ;
			}
			
			var nearestPtR = 0 ;
			var nearestPtIdx = -1 ;
			
			for(var i=0;i<this._points.length;i++)
			{
				var nextPt = this._points[i].p ;
				if(pt.idx==nextPt.idx)
				{
					continue ;
				}
				var dis = yc.util.pointsDis(pt.p[0],pt.p[1],nextPt[0],nextPt[1]) ;
				if( dis < len )
				{
					//nearPts.push(nextPt) ;
					var r = yc.util.radianBetweenPoints(pt.p[0],pt.p[1],nextPt[0],nextPt[1]) ;
					
					if(r<preR)
					{
						r+= Math.PI * 2 ;
					}
					
					if(nearestPtR==0 || nearestPtR>r)
					{
						nearestPtR = r ;
						nearestPtIdx = i ;
					}
				}
			}
			
			// 断了 ……
			if(nearestPtIdx==-1)
			{
				log('break') ;
				break ;
			}
			
			// 完成
			if(this._points[nearestPtIdx].used)
			{
				break ;
			}
			
			this._points[nearestPtIdx].used = true ;
			output.push( this._points[nearestPtIdx].p ) ;
			pt = this._points[nearestPtIdx] ;
			
			preR = nearestPtR - Math.PI ;
			
			this._points.splice(nearestPtIdx,1) ;
			
		}
		
		this._points = [] ;
		return output ;
	}
}