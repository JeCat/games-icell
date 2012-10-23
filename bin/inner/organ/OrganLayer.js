yc.inner.organ.OrganLayer = cc.Sprite.extend({
	ctor: function(){
		
		this._super() ;
		this.setScale(1/yc.settings.inner.zoom) ;
	}
	, assigned: 0
	, createBuilding: function(item,hexgon)
	{
		if( !hexgon || hexgon.type!='membrane' || hexgon.building )
		{
			return ;
		}
		
		var building = new item.buildingClass ;
		
		if( item.isBlocking ){
			building._isBlocking = item.isBlocking ;
		}
		
		this.addChild(building) ;
		
		building.idx = this.assigned++ ;
		
		hexgon.building = building ;
		hexgon.block = item.isBlock ;
		
		building.hexgon = hexgon ;
		building.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
		
		return building ;
	}
});
