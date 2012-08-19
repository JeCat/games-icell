function HexgonAxesPathMap(aAxes)
{
	this.aAxes = aAxes ;
	this.target = null ;
	this.map = {} ;
	
	this.orientationMapping = {
		n: 's'
		, s: 'n'
		, wn: 'es'
		, en: 'ws'
		, ws: 'en'
		, es: 'wn'
	}
	
	this.seekAll = function(x,y)
	{
		this.target = this.aAxes.hexgon(x,y) ;
		this.pos(this.target.x,this.target.y).step = 0 ;
		
		//log('HexgonAxesPathMap::seekAll() target: '+x+','+y) ;
			
		this._processHexgon(this.target,0) ;
	}
	
	this.next = function(hexgon){
		var info = this.pos(hexgon.x,hexgon.y) ;
		if( info.way )
		{
			return hexgon[info.way] () ;
		}
		else
		{
			return null ;
		}
	}
	
	this.pos = function (x,y)
	{
		if( typeof(this.map[x])=='undefined' )
		{
			this.map[x] = {} ;
		}
		if( typeof(this.map[x][y])=='undefined' )
		{
			this.map[x][y] = {
				way: null
				, step: -1
			} ;
		}
		return this.map[x][y] ;
	}
	
	this.testPath = function(hexgonX,hexgonY)
	{
		if(this.target.x==hexgonX && this.target.y==hexgonY)
		{
			log('bingo! arrive targe: ('+hexgonX+','+hexgonY+')') ;
			return ;
		}
		
		var hexgonInfo = this.pos(hexgonX,hexgonY) ;
		var hexgon = this.aAxes.hexgon(hexgonX,hexgonY) ;
		
		if(hexgonInfo.step<0 || !hexgonInfo.way)
		{
			log('无法到达：hexgon ('+hexgon.x+','+hexgon.y+') ') ;
			return ;
		}
		
		
		//log('HexgonAxesPathMap::testPath() hexgon ('+hexgon.x+','+hexgon.y+') step:'+hexgonInfo.step+', next way: '+hexgonInfo.way) ;
		
		var nextHexgon =  hexgon[hexgonInfo.way]() ;
		this.testPath(nextHexgon.x,nextHexgon.y) ;
	}
	
	
	this._processHexgon = function( hexgon, step )
	{
		var nextStep = step + 1 ;
		var nextHexgons = [] ;
		
		// 先计算所有邻接格子的距离
		for(var way in this.orientationMapping)
		{
			var neighbor = hexgon[way]() ;
			if(!neighbor)
			{
			    //log(['hexgon 没有'+way+'方向上的邻接格子',hexgon]) ;
			    continue ;
			}
			var neighborInfo = this.pos(neighbor.x,neighbor.y) ;
			
			// 格子无效
			if(neighbor.isBlocking())
			{
				neighborInfo.step = -1 ;
				neighborInfo.way = null ;
				continue ;
			}
			
			// 格子有其他更近的路径
			if( neighborInfo.step>=0 && neighborInfo.step<=nextStep )
			{
				continue ;
			}
		
			neighborInfo.step = nextStep ;
			neighborInfo.way = this.orientationMapping[way] ;
		
			//log('HexgonAxesPathMap::_processHexgon() hexgon ('+neighbor.x+','+neighbor.y+') step:'+nextStep+' way:'+neighborInfo.way) ;
		
			nextHexgons.push(neighbor) ;
		}
		
		
		// 邻接格都设置完毕以后，再递归下去
		for(var i=0;i<nextHexgons.length;i++)
		{
			this._processHexgon(nextHexgons[i],nextStep) ;
		}
	}
}
