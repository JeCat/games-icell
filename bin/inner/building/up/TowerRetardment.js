yc.inner.building.up.TowerRetardment = function(){
	
	
	yc.inner.building.up.UpgraderBase.apply(this) ;

	this.title = '防御塔：减速' ;
	this.description = '增强减速效果' ;
	this.icon = '' ;
	this.texture = "res/building/up_1.png";
	this.texture_l = "res/building/up_1.png";
	this.texture_nm = "res/building/up_1.png";
	
	this.isUnlock = function(){
		return this.lv < yc.inner.building.up.TowerRetardment.maxLv ;
	}
	
	this.upgradeDetail = function(tower)
	{
		return {
			injure: tower.retardment*0.2
			, injure: tower.retardment_duration*0.1
		}
	}
	
	this.cost = function(){
		var lv = this.lv+1 ;
		
		return {
			protein:{
				// blue: 10 * lv
				// , green: 5 * lv
			},
			aminoacid:{
				red: 8 * lv
				, blue: 5 * lv
			}
		}
	}
}

yc.inner.building.up.TowerRetardment.maxLv = 0 ;

// 可用于建筑
yc.inner.building.up.TowerRetardment.buildings = [ yc.inner.building.TowerSlower ] ;
