yc.dna.GeneBuildingUpgrader = function(opts){
    
    for(var attr in opts)
    {
        this[attr] = opts[attr] ;
    }
    
    // 叠加
    this.superimposing = 0 ;
    
    this.takeEffect = function(){
        
        this.superimposing ++ ;
        
        this.upgrader.maxLv ++ ;
        
        // 为建筑注册 upgrader
        for(var i=0; i<this.upgrader.buildings.length; i++)
        {
            var buildingClass = this.upgrader.buildings[i] ;
            
            if( yc.util.arr.search(buildingClass.upgraders,this.upgrader)===false )
            {
                buildingClass.upgraders.push(this.upgrader)
            }
        }
    }
}
