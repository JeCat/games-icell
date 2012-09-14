function Hexgon()
{
	this.aAxes = null ;
	this.x = null ;
	this.y = null ;
	this.center = [null,null] ;
	this.block = false ;	// 允许通行
	
	this.mapData = {} ;
	
	this.points = {
	    A: null ,
	    B: null ,
	    C: null ,
	    D: null ,
	    E: null ,
	    F: null ,
	} ;
	
	this.lines = {
		n : undefined
		, s : undefined
		, wn : undefined
		, en : undefined
		, es : undefined
		, ws : undefined
	} ;
	
	this.neighbors = {
		n : undefined
		, s : undefined
		, wn : undefined
		, en : undefined
		, es : undefined
		, ws : undefined
	}
	
	this.n = function(){ return this.neighbor('n','') ; }
	this.s = function(){ return this.neighbor('s','') ; }
	this.wn = function(){ return this.neighbor('n','w') ; }
	this.en = function(){ return this.neighbor('n','e') ; }
	this.ws = function(){ return this.neighbor('s','w') ; }
	this.es = function(){ return this.neighbor('s','e') ; }
	
	
	this.neighbor = function(waySN,wayEW)
	{
		var way = wayEW + waySN ;
		
		if(typeof(this.neighbors[way])=='undefined')
		{		
			switch(way)
			{
				case 'n' :
					this.neighbors[way] = this.aAxes.hexgon(this.x,this.y+1) ;
					break ;
					
				case 's' :
					this.neighbors[way] = this.aAxes.hexgon(this.x,this.y-1) ;
					break ;
				
				default :
				
					var x = this.x + (wayEW=='e'? 1: -1) ;
					var y = this.y ;
				
					// 单数列
					if( this.x%2 )
					{
                        // 偏北
                        if( waySN=='n' )
                        {
                            y+= 1 ;
                        }
					}
					
					// 双数列
					else
					{
                        // 偏南
                        if(waySN=='s')
                        {
                            y-= 1 ;
                        }
					}
    	           
					this.neighbors[way] = this.aAxes.hexgon(x,y) ;
					
					break ;
			}
		}
		return this.neighbors[way] ;
	}
	
	this.line = function(way)
	{
		if(typeof(this.lines[way])=='undefined')
		{
			switch(way)
			{
				case 'n' :
					this.lines[way] = [this.points.A,this.points.B] ;
					break ;
				case 's' :
					this.lines[way] = [this.points.D,this.points.E] ;
					break ;
				case 'wn' :
					this.lines[way] = [this.points.F,this.points.A] ;
					break ;
				case 'en' :
					this.lines[way] = [this.points.B,this.points.C] ;
					break ;
				case 'ws' :
					this.lines[way] = [this.points.E,this.points.F] ;
					break ;
				case 'es' :
					this.lines[way] = [this.points.C,this.points.D] ;
					break ;
			}
		}
		
		return this.lines[way] ;
	}
	
	this.drawCoor = function(ct)
	{		
		// 写坐标
		ct.fillText(this.x+','+this.y,this.center[0]-8,this.center[1]+8);
	}
	
	this.isBlocking = function(){
		return this.block? true: false ;
	}
	
	this.data = function(sName,value)
	{
		if( typeof(value)!='undefined' )
		{
			this.mapData[sName] = value ;
		}
		
		else if( typeof(this.mapData[sName])=='undefined' )
		{
			this.mapData[sName] = null ;
		}
		
		return this.mapData[sName] ;
	}
}