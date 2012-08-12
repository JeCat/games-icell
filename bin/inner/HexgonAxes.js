function HexgonAxes(w,h,sideLen,dbgCanvas)
{
	this.w = w ;
	this.h = h ;
	this.sideLen = sideLen ;

	this._dbgCanvas = typeof(dbgCanvas)=='undefined'? null: dbgCanvas ;
	this._hexgonClass = function(){} ;
	
	this.mapHexgons = {} ;
	
	// 纵向的方向，1 表示从上向下递增，-1表示从下向上递增
	this.vDirection = -1 ;
}



HexgonAxes.prototype.initHexgons = function()
{
	this.mapHexgons = {} ;
	
	// var this.sideLen = setting.innerStage.hexgonSize ;
	var ct = this._dbgCanvas? this._dbgCanvas.getContext('2d'): null ;
	if(ct)
	{
		ct.clearRect(0,0,this.w,this.h) ;
		ct.strokeStyle = "rgb(150,150,150)" ;
		ct.font="8px san-serif";
		ct.beginPath() ;
	}
	
	var gridW = 3/2*this.sideLen ;
	var gridH = Math.sqrt(3)/2*this.sideLen ;
	
	// 创建所有的六边形对象	
	var hoSteps = Math.ceil(this.w/(gridW*2)) ;
	var veSteps = Math.ceil(this.h/(gridH*2)) ;
	
	var move = function (p){ ct.moveTo(p[0],p[1]) ; }
	var line = function (p){ ct.lineTo(p[0],p[1]) ; }
	
	for(var v=0;v<veSteps;v++)
	{
		for(var h=0;h<hoSteps;h++)
		{
			var nStartX = gridW*2*h ;
			var nStartY = gridH*2*v ;
				
			//
			var hexgon1 = this._createHexgon( (h*2), v, nStartX+this.sideLen, nStartY+gridH ) ;
			
			hexgon1.points.A = [ nStartX+this.sideLen/2, nStartY ] ;
			hexgon1.points.B = [ nStartX+(3/2)*this.sideLen, nStartY ] ;
			hexgon1.points.C = [ nStartX+2*this.sideLen, (nStartY+gridH) ] ;
			hexgon1.points.D = [ nStartX+(3/2)*this.sideLen, (nStartY+2*gridH) ] ;
			hexgon1.points.E = [ nStartX+this.sideLen/2, (nStartY+2*gridH) ] ;
			hexgon1.points.F = [ nStartX, (nStartY+gridH) ] ;
			
			var hexgon2 = this._createHexgon( (h*2+1), v, nStartX+(5/2)*this.sideLen, nStartY+2*gridH ) ;
			hexgon2.points.A = hexgon1.points.C ;
			hexgon2.points.B = [nStartX+3*this.sideLen,(nStartY+gridH)] ;
			hexgon2.points.F = hexgon1.points.D ;
			
			var hexgon3 = this.vDirection==-1? hexgon1.ws(): hexgon1.wn() ;
			if(hexgon3)
			{
				hexgon3.points.C = hexgon1.points.A ;
				hexgon3.points.D = hexgon1.points.F ;
			}
			
			var hexgon4 = this.vDirection==-1? hexgon1.es(): hexgon1.en() ;
			if(hexgon4)
			{
				hexgon4.points.E = hexgon1.points.C ;
			}
				
			if(ct)
			{
				
				move(hexgon1.points.F) ;
				line(hexgon1.points.E) ;
				
				move(hexgon1.points.F) ;
				line(hexgon1.points.A) ;
				line(hexgon1.points.B) ;
				line(hexgon1.points.C) ;
				line(hexgon1.points.D) ;
				
				move(hexgon1.points.C) ;
				line(hexgon2.points.B) ;
				
				// 写坐标
				ct.fillText(hexgon1.x+','+hexgon1.y,hexgon1.center[0]-8,hexgon1.center[1]+8);
				ct.fillText(hexgon2.x+','+hexgon2.y,hexgon2.center[0]-8,hexgon2.center[1]+8);
			}
		}
	}

	if(ct)
	{
		ct.closePath();
		ct.stroke();
	}
}

HexgonAxes.prototype.hexgon = function(x,y)
{
	if( typeof(this.mapHexgons[x])=='undefined' || typeof(this.mapHexgons[x][y])=='undefined' )
	{
		return null ;
	}
	else
	{
		return this.mapHexgons[x][y] ;
	}
}

	
HexgonAxes.prototype.searchPath = function(targetX,targetY)
{
	var target = this.hexgon(targetX,targetY) ;
	
	var aPathMap = new HexgonAxesPathMap(this) ;
	aPathMap.seekAll(targetX,targetY) ;
	
	var oriPathMap = target.data('path-map') ;
	if(oriPathMap)
	{
		delete oriPathMap ;
	}
	target.data('path-map',aPathMap) ;
	
	return aPathMap ;
}


// ------------------------------------------------------------------------
// PRIVATE
HexgonAxes.prototype._createHexgon = function(x,y,centerX,centerY)
{
	if( typeof(this.mapHexgons[x])=='undefined' )
	{
		this.mapHexgons[x] = {} ;
	}
	
	var aHexgon = $.extend(false,new Hexgon(),new this._hexgonClass()) ;
	
	aHexgon.x = x ;
	aHexgon.y = y ;
	aHexgon.center = [centerX, centerY] ;
	aHexgon.aAxes = this ;

	return this.mapHexgons[x][y] = aHexgon ;
}