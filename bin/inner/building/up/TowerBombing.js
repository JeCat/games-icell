yc.inner.building.up.TowerBombing = function(){
	
	
	yc.inner.building.up.UpgraderBase.apply(this) ;

	this.title = '防御塔：轰炸' ;
	this.description = '增强防御塔的溅射伤害和溅射面积' ;
	this.texture = "res/building/up_1.png";
	this.texture_l = "res/building/up_1.png";
	this.texture_nm = "res/building/up_1.png";
	this.icon = '' ;
	
	this.isUnlock = function(){
		return this.lv < yc.inner.building.up.TowerBombing.maxLv ;
	}
	
	this.upgradeDetail = function(tower)
	{
		return {
			sputtering_injure: tower.sputtering_injure*0.5
			, sputtering: tower.sputtering*0.15
			, range: tower.range*0.05
		}
	}
	
	this.cost = function(){
		var lv = this.lv+1 ;
		
		return {
			protein:{
				// violet: 5 * lv
				// , green: 3 * lv
			},
			aminoacid:{
				red: 8 * lv
				, yellow: 5 * lv
			}
		}
	}
}

yc.inner.building.up.TowerBombing.maxLv = 0 ;

// 可用于建筑
yc.inner.building.up.TowerBombing.buildings = [ yc.inner.building.TowerCannon ] ;
