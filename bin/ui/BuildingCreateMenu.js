yc.ui.BuildingCreateMenu = function(){
	
	this.ui = $('#bulding-create-menu') ;
	var menu = this ;
	
	this.items = {
				 
		shooter: {
			title: '防御塔(射击)'
			, description: '用于攻击进入细胞内的病毒'
			, texture : "res/building/shooter.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return yc.settings.building.Shooter.cost ;
			}
			, buildingClass: yc.inner.building.TowerShooter
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['tower(shooter)']!==undefined ;
			}
		}
	
		, cannon: {
			title: '防御塔(火炮)'
			, description: '大范围攻击进入细胞内的病毒'
			, texture : "res/building/cannon.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return yc.settings.building.Cannon.cost ;
			}
			, buildingClass: yc.inner.building.TowerCannon
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['tower(cannon)']!==undefined ;
			}
		}

		, jetter: {
			title: '防御塔(喷射)'
			, description: '向进入细胞体内的病毒喷射酸性物质，接触到的病毒都将受到伤害'
			, texture : "res/building/jetter.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return yc.settings.building.Jetter.cost ;
			}
			, buildingClass: yc.inner.building.TowerJetter
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['tower(jetter)']!==undefined ;
			}
		}

		, slower: {
			title: '防御塔(减速)'
			, description: '用于攻击进入细胞内的病毒，同时使病毒的移动减慢'
			, texture : "res/building/slower.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return yc.settings.building.Slower.cost ;
			}
			, buildingClass: yc.inner.building.TowerSlower
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['tower(slower)']!==undefined ; ;
			}
		}

		, recycle: {
			title: '回收站'
			, description: '在细胞内释放出线粒体，线粒体会主动搜集病毒在细胞内被杀死时掉落的氨基酸'
			, texture : "res/building/recycle.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return {
					red: 7
					, yellow: 7
					, blue: 7
				}
			}
			, buildingClass: yc.inner.building.Recycle
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['recycle']!==undefined ;
			}
		}
		
		, grow: {
			title: '生长'
			, description: '扩张为细胞内部区域'
			, texture : "res/building/recycle.png"
			, hexgonTypes: ['membrane']
			, cost: function(){
				
				return {
					red: 10 * (ins(yc.inner.Cell).grown+1)
					, green: 10 * (ins(yc.inner.Cell).grown+1)
					, violet: 10 * (ins(yc.inner.Cell).grown+1)
				}
			}
			, constructFunc: function(hexgon){
				ins(yc.inner.Cell).grow(hexgon.x,hexgon.y) ;
				ins(yc.outer.Cell).init() ;
				menu.close() ;
			}
			, isUnlock: function(){
				if( typeof(ins(yc.user.Character).dna.genes.grow)=='undefined' )
				{
					return false ;
				}
				return ins(yc.inner.Cell).grown < ins(yc.user.Character).dna.genes.grow.superimposing ;
			}
		}
		
		, eye: {
			title: '眼睛'
			, description: '一双美丽的大眼睛'
			, texture : "res/building/recycle.png"
			, hexgonTypes: ['membrane']
			, cost: function(){
				return {
					red: 1
					, yellow: 1
					, blue: 1
				}
			}
			, buildingClass: yc.inner.organ.Eye
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['eye']!==undefined ;
			}
			, isBlock: false
			, layer: 'OrganLayer'
			, hasSkill: true
		}
		, oshooter: {
			title: '攻击塔'
			, description: '攻击细胞外部的病毒群'
			, texture : "res/building/recycle.png"
			, hexgonTypes: ['membrane']
			, cost: function(){
				return {
					red: 1
					, yellow: 1
					, blue: 1
				}
			}
			, buildingClass: yc.inner.organ.Tower
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['oshooter']!==undefined ;
			}
			, isBlock: false
			, layer: 'OrganLayer'
			, hasSkill: true
		}
		, bottles: {
			title: '漂流瓶'
			, description: '朋友无处不在'
			, texture : "res/building/recycle.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return {
					red: 1
					, yellow: 1
					, blue: 1
				}
			}
			, buildingClass: yc.inner.organ.Bottles
			, isUnlock: function(){
				return ins(yc.user.Character).dna.genes['bottles']!==undefined ;
			}
			, isBlock: false
			, hasSkill: true
		}
	} ;


	this.hideItems = {
		factory: {
			title: '蛋白质工厂'
			, description: '用于将细胞搜集到的氨基酸合成为蛋白质；蛋白质是建造和升级细胞器官的材料。'
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return {
					red: 5
					, yellow: 5
					, blue: 5
				}
			}
			, buildingClass: yc.inner.building.ProteinFactory
			, isUnlock: function(){
				return true ;
			}
		}
	}

	this.show = function(hexgon){
		var buildingCreateMenu = this;
		var inner = ins(yc.inner.InnerLayer) ;

		if(!this.buildMenu){
			var arrPositions = [
				[0,100]
				, [-50,87]
				, [-87,50]
				, [-100,0]
				, [-87,-50]
				, [-50,-87]
				, [0,-100]
				, [50,-87]
				, [87,-50]
				, [100,0]
				, [87,50]
				, [50,87]
			];

			console.log('create menu');

			this.buildMenu = new cc.Layer();
			scene.layerUi.addChild(this.buildMenu);
			// this.buildMenu.setPosition(cc.p(0,0));
			// this.buildMenu.setContentSize(new cc.Size(200,200));
			// this.buildMenu.setAnchorPoint(cc.p(hexgon.center[0],hexgon.center[1]));
			// this.buildMenu.setPosition(cc.p(hexgon.center[0],hexgon.center[1]));

			var position = yc.util.clientToWindow( ins(yc.outer.Cell) , hexgon.center[0],hexgon.center[1]);

			this.buildMenuCenter = [position[0] , position[1]];
			
			for(var n in this.items )
			{
				var item = this.items[n] ;
				if(yc.util.arr.search(item.hexgonTypes,hexgon.type)===false)
				{
					continue ;
				}

				var itemUi = BuildingBtn.buildingBtnWithTexture(item.texture) ;
				itemUi.setScale(0.3,0.3);
				var screenSize = cc.Director.getInstance().getWinSize();
				var position = arrPositions.shift();
				itemUi.setPosition(cc.p( this.buildMenuCenter[0] + position[0], this.buildMenuCenter[1]  + position[1] ));
				this.buildMenu.addChild( itemUi );
			}

			var closeBtn = cc.MenuItemImage.create(
		        "res/btn-no.png",
		        "res/btn-no-1.png",
		        null,
		        this,
		        function (){
		        	buildingCreateMenu.buildMenu.setVisible(false);
		        	buildingCreateMenu.buildMenu.removeFromParent();
		        	buildingCreateMenu.buildMenu = null;
		        	window.event.cancelBubble = true;   //stop event go through
		        }
		    );
		    var closeMenu = cc.Menu.create(closeBtn);
		    closeMenu.setPosition(this.buildMenuCenter[0]  , this.buildMenuCenter[1] );
		    this.buildMenu.addChild(closeMenu);
		}
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
	
	this.createBuilding = function(hexgon,item){
		
		var inner = ins(yc.inner.InnerLayer) ;
		
		// 已经有建筑了
		if(hexgon.building)
		{
			return ;
		}
		
		if( item.isBlock ){
			// 检查路径 ------
			var oriBlock = hexgon.block ;
			hexgon.block = true ;
		}
		
		// 重新计算路径
		var cell = ins(yc.inner.InnerLayer).cell ;
		var world = cell.researchPath() ;
		
		// 检查所有细胞膜格子，必须保证病毒从任何一个细胞膜格子进入时，都能够到达细胞核
		for(var i=0;i<cell.membranes.length;i++)
		{
			if( !world.pos(cell.membranes[i].x,cell.membranes[i].y).way )
			{
				hexgon.block = oriBlock ;
				
				// 重新计算，恢复路径
				cell.researchPath() ;
				
				// 关闭
				this.close() ;
		
				alert("无法在这里建造建筑") ;
				return ;
			}
		}
		
		// create building ----
		if(typeof(item.buildingClass)!='function')
		{
			log(item.title + " has no avalid class") ;
			return ;
		}
		
		// new buildingClass
		var building = new item.buildingClass ;
		
		// info and cost
		building.info = item ;
		building.cost = item.cost() ;
		
		// is blocking
		if( item.isBlocking ){
			building._isBlocking = item.isBlocking ;
		}
		
		// 决定 building 放在哪个 layer 上
		var bLayer = null;
		if( 'OrganLayer' == item.layer ){
			bLayer = ins(yc.inner.organ.OrganLayer); 
		}else{
			bLayer = inner.buildings ;
		}
		
		// 分配 idx
		building.idx = bLayer.assigned++ ;
		
		// 添加
		bLayer.addChild( building );
		
		// hexgon
		hexgon.building = building ;
		building.hexgon = hexgon ;
		
		// position
		building.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
		
		if( true == item.hasSkill ){
			// 技能
			var skillBar = ins(yc.ui.UILayer).skillBar;
			var i;
			var _skillList = building.skillList();
			for( i in _skillList ){
				var skill = _skillList[i];
				var skillButton = skillBar.createButtonForSkill( skill );
			}
		}
		return building ;
	}
}

yc.ui.costHtml = function(cost){

	var costHtml = '' ;
	var idx = 0 ;
	for(var proteinName in cost)
	{
		var proteinFormula = ins(yc.user.ProteinFormulas).worldFormulas[proteinName] ;
		if(proteinFormula===undefined)
		{
			log("mission protein "+proteinName+"'s formula.") ;
			continue ;
		}
		if(idx++)
		{
			costHtml+= ' + ' ;
		}
		costHtml+= '<span style="color:'+proteinFormula.colorHtml+'">♫ ' + cost[proteinName] + '</span> ' ;
	}
	
	return costHtml ;
}
yc.ui.checkCost = function(cost){

	var pool = ins(yc.user.Character).proteins ;
	for(var protein in cost)
	{
		if( pool.num(protein) < cost[protein] )
		{
			return false ;
		}
	}
	return true ;
}





// 	.click(function(){
					
			// 		var item = $(this).data('item') ;
					
			// 		// 检查蛋白质
			// 		var cost = item.cost() ;
			// 		if( !yc.ui.checkCost(cost) )
			// 		{
			// 			alert("缺少材料") ;
						
			// 			// 关闭
			// 			menu.close() ;
			// 			return ;
			// 		}
					
			// 		// 建造
			// 		if( typeof(item.buildingClass)!='undefined' )
			// 		{
			// 			menu.createBuilding(hexgon,item) ;
			// 		}
			// 		if( typeof(item.constructFunc)!='undefined' )
			// 		{
			// 			item.constructFunc(hexgon) ;
			// 		}
					
			// 		// 消耗蛋白质
			// 		var pool = ins(yc.user.Character).proteins ;
			// 		for(var protein in cost)
			// 		{
			// 			pool.increase( protein, -cost[protein] ) ;
			// 		}
					
			// 		// 关闭
			// 		menu.close() ;
			// 	}) ;
			
			// if(!item.isUnlock())
			// {
			// 	itemUi.find('.create').attr('disabled',true) ;
			// 	itemUi.find('.message').html('尚未解锁') ;
			// }
			// if(!yc.ui.checkCost(item.cost()))
			// {
			// 	itemUi.find('.create').attr('disabled',true) ;
			// 	itemUi.find('.message').html('缺少材料') ;
			// }