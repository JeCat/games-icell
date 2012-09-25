function HexgonAxes(sideLen,dbgCanvas)
{
	this.sideLen = sideLen ;

	this._dbgCanvas = typeof(dbgCanvas)=='undefined'? null: dbgCanvas ;
	this._hexgonClass = function(){} ;
	
	this.mapHexgons = {} ;
}



//HexgonAxes.prototype.initHexgons = function()
//{
//	this.mapHexgons = {} ;
//	
//	// var this.sideLen = setting.innerStage.hexgonSize ;
//	var ct = this._dbgCanvas? this._dbgCanvas.getContext('2d'): null ;
//	if(ct)
//	{
//		ct.clearRect(0,0,this.w,this.h) ;
//		ct.strokeStyle = "rgb(150,150,150)" ;
//		ct.font="8px san-serif";
//		ct.beginPath() ;
//	}
//	
//	var gridW = 3/2*this.sideLen ;
//	var gridH = Math.sqrt(3)/2*this.sideLen ;
//	
//	// 创建所有的六边形对象	
//	var hoSteps = Math.ceil(this.w/(gridW*2)) ;
//	var veSteps = Math.ceil(this.h/(gridH*2)) ;
//	
//	var move = function (p){ ct.moveTo(p[0],p[1]) ; }
//	var line = function (p){ ct.lineTo(p[0],p[1]) ; }
//	
//	for(var v=0;v<veSteps;v++)
//	{
//		for(var h=0;h<hoSteps;h++)
//		{
//			var nStartX = gridW*2*h ;
//			var nStartY = gridH*2*v ;
//				
//			//
//			var hexgon1 = this._createHexgon( (h*2), v, nStartX+this.sideLen, nStartY+gridH ) ;
//			
//			hexgon1.points.A = [ nStartX+this.sideLen/2, nStartY ] ;
//			hexgon1.points.B = [ nStartX+(3/2)*this.sideLen, nStartY ] ;
//			hexgon1.points.C = [ nStartX+2*this.sideLen, (nStartY+gridH) ] ;
//			hexgon1.points.D = [ nStartX+(3/2)*this.sideLen, (nStartY+2*gridH) ] ;
//			hexgon1.points.E = [ nStartX+this.sideLen/2, (nStartY+2*gridH) ] ;
//			hexgon1.points.F = [ nStartX, (nStartY+gridH) ] ;
//			
//			var hexgon2 = this._createHexgon( (h*2+1), v, nStartX+(5/2)*this.sideLen, nStartY+2*gridH ) ;
//			hexgon2.points.A = hexgon1.points.C ;
//			hexgon2.points.B = [nStartX+3*this.sideLen,(nStartY+gridH)] ;
//			hexgon2.points.F = hexgon1.points.D ;
//			
//			var hexgon3 = this.vDirection==-1? hexgon1.ws(): hexgon1.wn() ;
//			if(hexgon3)
//			{
//				hexgon3.points.C = hexgon1.points.A ;
//				hexgon3.points.D = hexgon1.points.F ;
//			}
//			
//			var hexgon4 = this.vDirection==-1? hexgon1.es(): hexgon1.en() ;
//			if(hexgon4)
//			{
//				hexgon4.points.E = hexgon1.points.C ;
//			}
//				
//			if(ct)
//			{
//				
//				move(hexgon1.points.F) ;
//				line(hexgon1.points.E) ;
//				
//				move(hexgon1.points.F) ;
//				line(hexgon1.points.A) ;
//				line(hexgon1.points.B) ;
//				line(hexgon1.points.C) ;
//				line(hexgon1.points.D) ;
//				
//				move(hexgon1.points.C) ;
//				line(hexgon2.points.B) ;
//				
//				// 写坐标
//				ct.fillText(hexgon1.x+','+hexgon1.y,hexgon1.center[0]-8,hexgon1.center[1]+8);
//				ct.fillText(hexgon2.x+','+hexgon2.y,hexgon2.center[0]-8,hexgon2.center[1]+8);
//			}
//		}
//	}
//
//	if(ct)
//	{
//		ct.closePath();
//		ct.stroke();
//	}
//}

HexgonAxes.prototype.hexgonByPoint = function(px,py,bAutoCreate){

	bAutoCreate = typeof(bAutoCreate)=='undefined' || bAutoCreate ;
	
	var floor = function(v){
		return v>0? Math.floor(v): Math.ceil(v) ;
	}
	
	
	
	var gridW = 3/2*this.sideLen ;
	var gridH = Math.sqrt(3)*this.sideLen ;
	var gridHalfH = gridH/2 ;
	
	var x = (Math.floor((px-this.sideLen/2)/gridW) + 1) ;
	
	if(x%2)
	{
	   var y = Math.floor( py / gridH ) ;
	}
	else
	{
		var y = (Math.floor((py-gridHalfH)/gridH) + 1) ;
	}
	
	var hexgon = this.hexgon(x,y,bAutoCreate) ;
	
	if( hexgon && hexgon.center[0]-px>this.sideLen/2 )
	{
		if(py>hexgon.center[1])
		{
			var neighbor = hexgon.wn(bAutoCreate) ;
		}
		else
		{
			var neighbor = hexgon.ws(bAutoCreate) ;
		}
		
		if( neighbor && yc.util.pointsDis(hexgon.center[0],hexgon.center[1],px,py) > yc.util.pointsDis(neighbor.center[0],neighbor.center[1],px,py) )
		{
			hexgon = neighbor ;
		}
	}
	
	return hexgon ;
}
HexgonAxes.prototype.hexgon = function(x,y,bAutoCreate)
{
	bAutoCreate = typeof(bAutoCreate)=='undefined' || bAutoCreate ;
	
	if( typeof(this.mapHexgons[x])=='undefined' )
	{
		if(!bAutoCreate)
		{
			return null ;
		}
		this.mapHexgons[x] = {} ;		
	}
	
	if( typeof(this.mapHexgons[x][y])=='undefined' )
	{
		if(!bAutoCreate)
		{
			return null ;
		}
		this._createHexgon(x,y) ;
	}
	
	return this.mapHexgons[x][y] ;
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
HexgonAxes.prototype._createHexgon = function(x,y)
{
	var centerX = 3/2*this.sideLen * x ;
	var centerY = Math.sqrt(3)*this.sideLen * y ;
	if( x%2 )
	{
		centerY+= Math.sqrt(3)/2*this.sideLen ;
	}
	
	if( typeof(this.mapHexgons[x])=='undefined' )
	{
		this.mapHexgons[x] = {} ;
	}
	
	var aHexgon = $.extend(false,new Hexgon(),new this._hexgonClass()) ;
	
	aHexgon.x = x ;
	aHexgon.y = y ;
	aHexgon.center = [centerX, centerY] ;
	aHexgon.aAxes = this ;
	
	aHexgon.points.A = [centerX-this.sideLen/2,centerY+Math.sqrt(3)*this.sideLen/2,'A'] ;
	aHexgon.points.E = [centerX-this.sideLen/2,centerY-Math.sqrt(3)*this.sideLen/2,'E'] ;
	aHexgon.points.B = [centerX+this.sideLen/2,aHexgon.points.A[1],'B'] ;
	aHexgon.points.D = [centerX+this.sideLen/2,aHexgon.points.E[1],'D'] ;
	aHexgon.points.C = [centerX+this.sideLen,centerY,'C'] ;
	aHexgon.points.F = [centerX-this.sideLen,centerY,'F'] ;

	return this.mapHexgons[x][y] = aHexgon ;
}