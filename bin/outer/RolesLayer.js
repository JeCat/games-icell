yc.outer.RolesLayer = cc.Layer.extend({
    
    

	nAminoAcids: 0 
	
	, aminoAcidDensity: 20
	// this.dbg = $('<div id="dbg-aminoacid"></div>').appendTo('#debug-output') ;
		
    , ctor:function  () { 
        
        this._super () ;
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        var layer = this ;
        setInterval(function(){layer.update()},1000) ; 
        this.update() ;
    }
    
	, update: function()
	{
	   var camera = yc.outer.Camera.ins() ;
	
	    // ----------------------------
		// 氨基酸
		var range = {
			left: 0|(camera.x - camera.width)
			, right: 0|(camera.x + 2*camera.width)
			, top: 0|(camera.y + 2*camera.height)
			, bottom: 0|(camera.y - camera.height)
		} ;
		range.width = range.right - range.left ;
		range.height = range.top - range.bottom ;
		
		
		// log(range) ;
		//var dbgOutput = '<br />' + $.toJSON(range) ;
			
		// 回收范围以外的对象
		for(var id in yc.util.ObjectPool.ins(yc.outer.AminoAcid).usingObjects)
		{
				
			var aAminoAcid = yc.util.ObjectPool.ins(yc.outer.AminoAcid).usingObjects[id] ;
			// dbgOutput+= '<br />AminoAcid:'+Math.round(aAminoAcid.x)+','+Math.round(aAminoAcid.y) ;
			
			if( aAminoAcid.x<range.left || aAminoAcid.x>range.right || aAminoAcid.y>range.top || aAminoAcid.y<range.bottom )
			{
				this.deleteAminoAcid(aAminoAcid) ;	
			}
		}
		
		var a = yc.util.ObjectPool.ins(yc.outer.AminoAcid) ; 
		var num = this.aminoAcidDensity-yc.util.ObjectPool.ins(yc.outer.AminoAcid).count ;
		//log('new amino acid '+num)
		if(num)
		{
		    //log(range) ;
        	for(var i=0;i<num;i++)
        	{
        	    var x = range.left+(0|(Math.random()*range.width)) ;
        	    var y = range.bottom+(0|(Math.random()*range.height)) ;
        	    
        	    // 避免在玩家视线内产生一个氨基酸
        	    if( x>camera.x && x<(camera.x+camera.width) && y>camera.y && y<(camera.y+camera.height) )
        	    {
        	        continue ;
        	    }
        	    
        		var aAminoAcid = yc.util.ObjectPool.ins(yc.outer.AminoAcid).ob() ;
        		this.nAminoAcids ++ ;
        		
        		aAminoAcid.x = x ;
        		aAminoAcid.y = y ;
        		//log(aAminoAcid.x+','+aAminoAcid.y) ;
        		
        		this.addChild(aAminoAcid) ;
        		
        	}
		}
		
		//this.dbg.html(dbgOutput) ;
	}
	
	
	, deleteAminoAcid: function(aAminoAcid)
	{
		//log(aAminoAcid) ;
		//this.delEntity(aAminoAcid) ;
		this.removeChild(aAminoAcid,true) ;
		yc.util.ObjectPool.ins(yc.outer.AminoAcid).free(aAminoAcid) ;
		
		this.nAminoAcids -- ;
	}
}) ;
