yc.ui.BuildingUpgradeMenu = function(){
	
	this.ui = $('#bulding-upgrade-menu') ;
	var menu = this ;

	this.ui.find('.btn-close').click(function(){
		menu.close() ;
	})
	
	this.building = null ;
	this.costRecovering = {} ;
	
	// 拆除处理
	this.ui.find('#btn-demolish').click(function(){
		
		menu.close() ;
		
		if(!confirm('确定要拆除建筑：'+menu.building.info.title+'？'))
		{
			return ;
		}
		
		// 拆除建筑
		menu.building.demolish() ;
		
		// 回收资源
		var pool = ins(yc.user.Character).proteins ;
		for(var p in menu.costRecovering)
		{
			pool.increase(p,+menu.costRecovering[p]) ;
		}
		
		// 重新计算路径
		var cell = ins(yc.inner.InnerLayer).cell ;
		var map = cell.researchPath() ;
	}) ;
	
	this.show = function(building){
		
		this.building = building ;
		var buildingClass = building.constructor ;
		
		
		if(buildingClass.upgraders.length)
		{
			$('#bulding-upgraders-outer').html('') ;
			for(var u=0;u<buildingClass.upgraders.length;u++)
			{
				var upgraderClass = buildingClass.upgraders[u] ;
				var upgrader = building.upgrader(upgraderClass) ;
				
				var upgraderUi = $('#bulding-upgrader-template')
						.clone()
						.appendTo('#bulding-upgraders-outer')
						.attr({id:''})
						.show() ;
						
				var v = upgraderUi.find('.title') ;
				
				upgraderUi.find('.newLv').html('Lv '+(upgrader.lv+1)) ;
				upgraderUi.find('.title').html(upgrader.title) ;
				upgraderUi.find('.description').html(upgrader.description) ;
				
				// 升级效果
				var detail = upgrader.upgradeDetail(building) ;
				var detailHtml = '效果' ;
				for(var property in detail)
				{
					detailHtml+= '<div>' +property +':'+ building[property].toFixed(1) + ' -> ' + (building[property]+detail[property]).toFixed(1) + '</div>' ;
				}
				upgraderUi.find('.detail').html(detailHtml) ;
				
				// 升级费用
				var cost = upgrader.cost() ;
				upgraderUi.find('.cost').html( '费用：'+yc.ui.costHtml(cost) ) ;
				
				// 升级按钮
				upgraderUi.find('.upgrade')
					.attr('disabled',!upgrader.isUnlock())  // 是否解锁
					.data('upgrader',upgrader)
					.data('cost',cost)
					.click(function(){
						// 关闭菜单
						menu.ui.hide() ;
						
						// 执行升级
						$(this).data('upgrader').upgrade(building) ;
						
						// 建筑附加值
						var cost = $(this).data('cost') ;
						for(var p in cost)
						{
							building.cost[p] = (p in building.cost? building.cost[p]: 0) + cost[p] ;
						}
					}) ;
			}
		}
		else
		{
			$('#bulding-upgraders-outer').html('没有可用升级') ;
		}
		
		//拆除回收
		this.costRecovering = {} ;
		for(var p in building.cost)
		{
			this.costRecovering[p] = Math.round(building.cost[p]*0.7) ;
		}
		// this.ui.find('#cost-recovering').html(yc.ui.costHtml(this.costRecovering)) ;

		
		this.ui.css({
				left: window.event.clientX-this.ui.width()-100
				, top: ($(window).height()-this.ui.height())/2
			})
			.show()
			[0].focus() ;
	}

	this.close = function(){
		var inner = ins(yc.inner.InnerLayer) ;
		if(inner.map.selcted_hexgon)
		{
			inner.map.selcted_hexgon.selected = false ;
			inner.map.selcted_hexgon = null ;
		}
		this.ui.hide() ;
	}
	
}


yc.ui.BuildingUpgradeMenu.className = 'yc.ui.BuildingUpgradeMenu' ;
