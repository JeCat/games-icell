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
    
    this.close = function(){
        var inner = yc.inner.InnerLayer.ins() ;
        inner.map.selcted_hexgon.selected = false ;
        inner.map.selcted_hexgon = null ;
        this.ui.hide() ;
    }
    
    this.createBuilding = function(buildingClass){
        
        var inner = yc.inner.InnerLayer.ins() ;
        
        // 检查蛋白质
        var pool = ins(yc.inner.ProteinPool) ;
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
        
        // 已经有建筑了
        if(inner.map.selcted_hexgon.building)
        {
            return ;
        }
        
        // 检查路径 ------
        var oriBlock = inner.map.selcted_hexgon.block ;
        inner.map.selcted_hexgon.block = true ;
        // 重新计算路径
        var cell = yc.inner.InnerLayer.ins().cell ;
        var map = cell.researchPath() ;
        
        // 检查所有细胞膜格子，必须保证病毒从任何一个细胞膜格子进入时，都能够到达细胞核
        for(var i=0;i<cell.membranes.length;i++)
        {
            if( !map.pos(cell.membranes[i].x,cell.membranes[i].y).way )
            {
                inner.map.selcted_hexgon.block = oriBlock ;
                
                // 重新计算，恢复路径
                cell.researchPath() ;
                
                // 关闭
                this.close() ;
        
                alert("无法在这里建造建筑") ;
                return ;
            }
        }
        
        
        // create building ----
        inner.buildings.createBuilding(buildingClass,inner.map.selcted_hexgon.x,inner.map.selcted_hexgon.y) ;
        
        // 消耗蛋白质
        for(var protein in buildingClass.price)
        {
            pool.increase( protein, -buildingClass.price[protein] ) ;
        }
        
        // 关闭
        this.close() ;
    }
}

yc.ui.BuildingCreateMenu.ins = new yc.ui.BuildingCreateMenu() ;
