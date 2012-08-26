yc.inner.building.up.TowerBombing = function(){
    
    
    yc.inner.building.up.UpgraderBase.apply(this) ;

    this.title = '防御塔：轰炸' ;
    this.description = '增强防御塔的溅射伤害和溅射面积' ;
    this.icon = '' ;
    
    this.isUnlock = function(){
        return this.lv < yc.inner.building.up.TowerBombing.maxLv ;
    }
    
    this.upgradeDetail = function(tower)
    {
        return {
            sputtering_injure: tower.injure
            , sputtering: tower.sputtering*0.1
            , range: tower.range*0.05
        }
    }
    
    this.cost = function(){
        var lv = this.lv+1 ;
        
        return {
            orange: 0
        }
    }
}

yc.inner.building.up.TowerBombing.maxLv = 0 ;

// 可用于建筑
yc.inner.building.up.TowerBombing.buildings = [ yc.inner.building.Tower ] ;
