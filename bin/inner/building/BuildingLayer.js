yc.inner.building.BuildingLayer = cc.Layer.extend({  

	assigned: 0
	
    , createBuilding: function(buildingClass,x,y)
    {   
        var hexgon = ins(yc.inner.InnerLayer).cell.aAxes.hexgon(x,y)
        if( !hexgon || hexgon.type!='cytoplasm' || hexgon.building )
        {
            return ;
        }
        
        var building = new buildingClass ;
        
        this.addChild(building) ;
        building.setVisible(false) ;
        building.idx = this.assigned++ ;
        
        building.put(hexgon) ;
        
        
        return building ;
    }
}) ;
