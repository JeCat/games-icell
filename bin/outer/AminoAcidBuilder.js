yc.outer.AminoAcidBuilder = function ()
{
	this.nAminoAcids = 0 ;
	
	this.density = 30 ;
	// this.dbg = $('<div id="dbg-aminoacid"></div>').appendTo('#debug-output') ;
		

	this.update = function()
	{
		this.world.player ;
		
		var range = {
			left: Math.round(this.world.cameraX() - this.world.cameraWidth())
			, right: Math.round(this.world.cameraX() + 2*this.world.cameraWidth())
			, top: Math.round(this.world.cameraY() - this.world.cameraHeight())
			, bottom: Math.round(this.world.cameraY() + 2*this.world.cameraHeight())
		} ;
		range.width = range.right - range.left ;
		range.height = range.bottom - range.top ;
		
		
		// log(range) ;
		var dbgOutput = '<br />' + $.toJSON(range) ;
			
		// 回收范围以外的对象
		for(var id in ObjectPool.ins(AminoAcid).usingObjects)
		{
				
			var aAminoAcid = ObjectPool.ins(AminoAcid).usingObjects[id] ;
			// dbgOutput+= '<br />AminoAcid:'+Math.round(aAminoAcid.x)+','+Math.round(aAminoAcid.y) ;
			
			if( aAminoAcid.x<range.left || aAminoAcid.x>range.right || aAminoAcid.y<range.top || aAminoAcid.y>range.bottom )
			{
				this.deleteAminoAcid(aAminoAcid) ;	
			}
		}
		
		var a = ObjectPool.ins(AminoAcid) ; 
		var num = this.density-ObjectPool.ins(AminoAcid).count ;
		for(var i=0;i<num;i++)
		{
			var aAminoAcid = ObjectPool.ins(AminoAcid).ob() ;
			aAminoAcid.world = this.world ;
			this.nAminoAcids ++ ;
			
			this.gs.addEntity(aAminoAcid) ;
			
			aAminoAcid.x = range.left+gs.random(0,range.width) ;
			aAminoAcid.y = range.top+gs.random(0,range.height) ;
		}
		
		
		this.dbg.html(dbgOutput) ;
	}
	
	var builder = this ;
	setInterval(function(){builder.update()},1000) ;
	
	this.deleteAminoAcid = function(aAminoAcid)
	{
		log(aAminoAcid) ;
		this.gs.delEntity(aAminoAcid) ;
		ObjectPool.ins(AminoAcid).free(aAminoAcid) ;
		
		this.nAminoAcids -- ;
	}
}

yc.outer.AminoAcidBuilder._ins = null ;
yc.outer.AminoAcidBuilder.ins = function(){
    if(!yc.outer.AminoAcidBuilder._ins)
    {
        yc.outer.AminoAcidBuilder._ins = new yc.outer.AminoAcidBuilder() ;
    }
    return yc.outer.AminoAcidBuilder._ins ;
}

