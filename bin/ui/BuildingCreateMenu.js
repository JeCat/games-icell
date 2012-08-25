yc.ui.BuildingCreateMenu = function(){
    
    this.ui = $('#bulding-create-menu') ;
    var menu = this ;
    
    this.show = function(){
        this.ui.css({
                left: window.event.clientX-this.ui.width()/2
                , top: window.event.clientY-this.ui.height()/2
            })
            .show()
            [0].focus() ;
    }
    
    this.createBuilding = function(buildingClass){
        
        var inner = yc.inner.InnerLayer.ins() ;
        
        // 检查蛋白质
        var pool = yc.inner.ProteinPool.ins() ;
        for(var protein in buildingClass.price)
        {
            if( pool.num(protein) < buildingClass.price[protein] )
            {
                alert('缺少蛋白质：'+protein) ;
                
                // 取消
                inner.map.selcted_hexgon.selected = false ;
                inner.map.selcted_hexgon = null ;
                this.ui.hide() ;
                
                return ;
            }
        }
        
        // create building
        inner.buildings.createBuilding(buildingClass,inner.map.selcted_hexgon.x,inner.map.selcted_hexgon.y) ;
        
        // 消耗蛋白质
        for(var protein in buildingClass.price)
        {
            pool.increase( protein, -buildingClass.price[protein] ) ;
        }
        
        // 取消
        inner.map.selcted_hexgon.selected = false ;
        inner.map.selcted_hexgon = null ;
        this.ui.hide() ;
        
    }
}

yc.ui.BuildingCreateMenu.ins = new yc.ui.BuildingCreateMenu() ;
