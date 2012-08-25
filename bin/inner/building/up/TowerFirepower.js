yc.inner.building.up.TowerFierpower = function(){
    
    
    yc.inner.building.up.UpgraderBase.apply(this) ;

    this.title = '防御塔：火力' ;
    this.description = '增加防御塔对单一目标的攻击力' ;
    this.icon = '' ;
    
    this.isUnlock = function(){
        return this.lv < yc.inner.building.up.TowerFierpower.maxLv ;
    }
    
    this.upgradeDetail = function(tower)
    {
        return {
            injure: tower.injure
            , range: tower.range*0.2
            , freq: -tower.freq*0.1
            , speed: tower.speed*0.2
        }
    }
    
    this.cost = function(){
        var lv = this.lv+1 ;
        
        return {
            orange: 1
        }
    }
}

yc.inner.building.up.TowerFierpower.maxLv = 0 ;

// 可用于建筑
yc.inner.building.up.TowerFierpower.buildings = [ yc.inner.building.Tower ] ;
