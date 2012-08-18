yc.inner.BuildingLayer = cc.Layer.extend({  

    createBuilding: function(buildingClass,x,y)
    {   
        var hexgon = yc.inner.InnerLayer.ins().cell.aAxes.hexgon(x,y)
        if( !hexgon || hexgon.type!='cytoplasm' || hexgon.building )
        {
            return ;
        }
        
        var building = new buildingClass ;
        this.addChild(building) ;
        building.setVisible(false) ;
    
        building.put(hexgon) ;
        
        return building ;
    }
}) ;
