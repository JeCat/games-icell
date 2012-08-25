yc.inner.building.up.TowerFierpower = function(){
    
    
    yc.inner.building.up.UpgraderBase.apply(this) ;

    
    this.isUnlock = function(){
        return this.lv < yc.inner.building.up.TowerFierpower.maxLv ;
    }
    
    this._upgrade = this.upgrade ;
    this.upgrade = function(tower){
        
        if(!this._upgrade(tower))
        {
            return false ;
        }
        
        // 开始升级
        this.lv ++ ;
        
        // 伤害
        tower.injure*= 2 ;
        
        // 范围
        tower.range*= 1.2 ;
        
        // 射击频率
        tower.freq*= 0.9 ;
        
        // 子弹速度
        tower.speed*= 1.2 ; 
    }
    
    this.cost = function(){
        var lv = this.lv+1 ;
        
        return {
            
        }
    }
}

yc.inner.building.up.TowerFierpower.maxLv = 0 ;

// 可用于建筑
yc.inner.building.up.TowerFierpower.buildings = [ yc.inner.building.Tower ] ;
