yc.inner.building.BuildingLayer = cc.Layer.extend({  

	assigned: 0
	
    , createBuilding: function(buildingClass,x,y)
    {   
        var hexgon = yc.inner.InnerLayer.ins().cell.aAxes.hexgon(x,y)
        if( !hexgon || hexgon.type!='cytoplasm' || hexgon.building )
        {
            return ;
        }
        
        var building = new buildingClass ;
        log(building._upgraders)
        
        this.addChild(building) ;
        building.setVisible(false) ;
        building.idx = this.assigned++ ;
        
        building.put(hexgon) ;
        
        
        return building ;
    }
}) ;
