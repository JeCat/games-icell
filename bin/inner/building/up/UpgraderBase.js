yc.inner.building.up.UpgraderBase = function(){
	
	this.lv = 0 ;
	
	this.title = 'Nothing' ;
	this.description = 'Nothing todo ...' ;
	this.icon = '' ;
	
	this.isUnlock = function(){
		return false ;
	}
	
	this.upgrade = function(building,checking){
		
		if(checking===undefined)
		{
			checking = true ;
		}

		if(checking)
		{
			// 检查是否解锁
			if( !yc.inner.building.isIgnoreAllUpgradeLock && !this.isUnlock())
			{
				log(this , '未解锁');
				return false ;
			}
			
			// 检查资源
			var cost = this.cost() ;
			var proteinsPool = ins(yc.user.Character).proteins ;
			var aminoacidsPool = ins(yc.user.Character).aminoacids ;
			
			// 消耗资源
			for(var protein in cost['protein'])
			{
				proteinsPool.increase(protein,-cost['protein'][protein]) ;
			}
			for(var aminoacid in cost['aminoacid'])
			{
				aminoacidsPool.increase(aminoacid,-cost['aminoacid'][aminoacid]) ;
			}
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
