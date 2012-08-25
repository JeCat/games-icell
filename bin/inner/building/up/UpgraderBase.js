yc.inner.building.up.UpgraderBase = function(){
    
    this.lv = 0 ;
    
    this.title = 'Nothing' ;
    this.description = 'Nothing todo ...' ;
    this.icon = '' ;
    
    this.isUnlock = function(){
        return false ;
    }
    
    this.upgrade = function(building){
        
        // 检查是否解锁
        if(!this.isUnlock())
        {
            return false ;
        }
        
        // 检查资源
        var cost = this.cost() ;
        var pool = ins(yc.inner.ProteinPool) ;
        for(var protein in cost)
        {
            if( pool.num(protein) < cost[protein] )
            {
                alert('缺少蛋白质：'+protein) ;
                return ;
            }
        }
        
        // 消耗资源
        for(var protein in cost)
        {
            pool.increase(protein,-cost[protein]) ;
        }
        
        // 开始升级
        var increased = this.upgradeDetail(building) ;
        for(var property in increased)
        {
            building[property]+= increased[property] ;
        }
            
        this.lv ++ ;
        
        return true ;
    }
    
    this.cost = function()
    {
        return {}
    }
    
    this.upgradeDetail = function(building)
    {
        return {}
    }
        
}
