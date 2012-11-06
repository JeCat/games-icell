yc.ui.BuildingCreateMenu = function(){
	
	this.ui = null ;
	var menu = this ;
	
	this.items = {
				 
		shooter: {
			title: '防御塔(射击)'
			, description: '用于攻击进入细胞内的病毒'
			, texture : "res/building/shooter.png"
			, texture_l : "res/building/shooter-l.png"
			, texture_nm : "res/building/shooter-nm.png"
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
			, texture_l : "res/building/cannon-l.png"
			, texture_nm : "res/building/cannon-nm.png"
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
			, texture_l : "res/building/jetter-l.png"
			, texture_nm : "res/building/jetter-nm.png"
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
			, texture_l : "res/building/slower-l.png"
			, texture_nm : "res/building/slower-nm.png"
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
			, texture_l : "res/building/recycle-l.png"
			, texture_nm : "res/building/recycle-nm.png"
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
			, texture_l : "res/building/recycle-l.png"
			, texture_nm : "res/building/recycle-nm.png"
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
				log(ins(yc.user.Character).dna.genes.grow)
				if( typeof(ins(yc.user.Character).dna.genes.grow)=='undefined' )
				{
					return false ;
				}
				return ins(yc.inner.Cell).grown < ins(yc.user.Character).dna.genes.grow.superimposing ;
			}
		}

		, factory: {
			title: '蛋白质工程'
			, description: '将氨基酸合成为蛋白质'
			, texture : "res/building/recycle.png"
			, texture_l : "res/building/recycle-l.png"
			, texture_nm : "res/building/recycle-nm.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return {}
			}
			, buildingClass: yc.inner.building.ProteinFactory
			, isUnlock: function(){
				return true ;
			}
		}
		
		, eye: {
			title: '眼睛'
			, description: '一双美丽的大眼睛'
			, texture : "res/building/recycle.png"
			, texture_l: "res/building/recycle-l.png"
			, texture_nm: "res/building/recycle-nm.png"
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
			, texture : "res/building/oshooter.png"
			, texture_l : "res/building/oshooter-l.png"
			, texture_nm : "res/building/oshooter-nm.png"
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
			, texture : "res/building/8.png"
			, texture_l : "res/building/8-l.png"
			, texture_nm : "res/building/8-nm.png"
			, hexgonTypes: ['cytoplasm']
			, cost: function(){
				return {}
			}
			, buildingClass: yc.inner.organ.Bottles
			, isUnlock: function(){
				return true ;
			}
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
	};

	this.show = function(hexgon){
		var buildingCreateMenu = this;
		var inner = ins(yc.inner.InnerLayer) ;

		if(hexgon.type === 'nucleus'){
			return;
		}
		// cc.MoveTo.create(2, cc.p(s.width - 40, s.height - 40));

		if(!this.ui){

			ins(yc.outer.PlayerLayer).setNeedFaceToPoint(false) ;


			var arrPositions = [
				[0,150]
				, [-75,129]
				, [-129,75]
				, [-150,0]
				, [-129,-75]
				, [-75,-129]
				, [0,-150]
				, [75,-129]
				, [129,-75]
				, [150,0]
				, [129,75]
				, [75,129]
			];

			console.log('create menu');

			this.ui = new cc.Layer();
			scene.layerUi.addChild(this.ui);
			// this.ui.setPosition(cc.p(0,0));
			// this.ui.setContentSize(new cc.Size(200,200));
			// this.ui.setAnchorPoint(cc.p(hexgon.center[0],hexgon.center[1]));
			// this.ui.setPosition(cc.p(hexgon.center[0],hexgon.center[1]));

			var centerPosition = yc.util.clientToWindow( ins(yc.outer.Cell) , hexgon.center[0],hexgon.center[1]);

			this.uiCenter = [centerPosition[0] , centerPosition[1]];
			
			// var screenSize = cc.Director.getInstance().getWinSize();

			for(var buildingName in this.items )
			{
				var item = this.items[buildingName] ;
				if(yc.util.arr.search(item.hexgonTypes,hexgon.type)===false)
				{
					continue ;
				}

				var itemUi = BuildingBtn.buildingBtnWithTexture(item.texture,item.texture_l,item.texture_nm) ;
				var position = arrPositions.shift();
				itemUi.isBuildingBtn =  true;
				itemUi.building = item;
				itemUi.hexgon = hexgon;
				// itemUi.setScale(0.3,0.3);
				itemUi.toPosition = cc.p(  position[0], position[1] );
				// itemUi.toPosition = cc.p( this.uiCenter[0] + position[0], this.uiCenter[1]  + position[1] );
				// itemUi.setPosition(cc.p( this.uiCenter[0] + position[0], this.uiCenter[1]  + position[1] ));
				itemUi.setPosition(cc.p(  position[0],  position[1] ));
				// itemUi.setContentSize(new cc.Size(10,10));
				this.ui.addChild( itemUi );
			}

			var closeBtn = cc.MenuItemImage.create(
		        "res/btn-no.png",
		        "res/btn-no-1.png",
		        null,
		        this,
		        this.close
		    );
		    var closeMenu = cc.Menu.create(closeBtn);
		    closeMenu.setPosition( cc.p( 0 , 0) );
		    this.ui.addChild(closeMenu);

		    // for(var buildingBtn in ){

		    // }



			// itemUi.setPosition(cc.p( this.uiCenter[0] + position[0], this.uiCenter[1]  + position[1] ));
		 //    cc.MoveTo.create(2, cc.p(s.width - 40, s.height - 40));

		 	

		 	this.onProteinsChanged();

		 	this.ui.setPosition(cc.p( this.uiCenter[0] ,this.uiCenter[1]));
		 	this.ui.setAnchorPoint( cc.p(0.5,0.5) );
		 	// this.ui.setRotation(20);
		}
	}
	
	this.close = function(){
		var inner = ins(yc.inner.InnerLayer) ;

		if(inner.map.selcted_hexgon)
		{
			inner.map.selcted_hexgon.selected = false ;
			inner.map.selcted_hexgon = null ;
		}
		if(this.ui){
			this.ui.removeFromParent(true);
    		this.ui = null;
		}
		// cancel event
		if(window.event.type === 'mouseup'){
			window.event.cancelBubble = true;
		}
		ins(yc.outer.PlayerLayer).setNeedFaceToPoint(true) ;
	}
	
	this.createBuilding = function(hexgon,item){
		
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

		building.putOn(hexgon.x,hexgon.y) ;
		
		return building ;
	}

	this.showBuildingDes = function(hexgon , building , position , allowBuild){
		var that = this;
		if(this.yesMenu){
            this.yesMenu.removeFromParent(true);
            
        }
        if(this.pp){
        	this.pp.removeFromParent(true);
    	}

        if(this.ui.label){
            this.ui.label.removeFromParent(true);
        }

        this.pp = cc.Sprite.create("res/building/dec_bg.png");
        this.ui.label = cc.Sprite.create();
        this.ui.label.draw = function(ctx)
        {
            var font = ins(yc.ui.font.Font);
            font.setWidth(190);
            font.setHeight(75);
            font.setTextIndent(0);
            font.setTextAlign('left');
            font.setLetterSpacing(4);
            font.setLineHeight(18);
            font.setText("[color=#F00;weight=bold;size=16;font=隶书]"+building.title +'[/]'+ 
                "[color=#F00;size=14;font=隶书]"+building.description+'[/]'+
                yc.ui.costDec(building.cost())
                );
            font.draw(ctx);
        }
        this.pp.setPosition( cc.p(-320 , 0) ) ;
        this.pp.setScale(0.4,0.4);
        this.ui.label.setPosition( cc.p(-420 , 50) ) ;
        that.ui.addChild(this.pp);
        that.ui.addChild(this.ui.label);

        if(allowBuild){
        	this.yesBtn = cc.MenuItemImage.create(
	            "res/btn-yes.png",
	            "res/btn-yes-1.png",
	            null,
	            this,
	            function (){
	                if(that.createBuilding( hexgon , building )){
	                    that.close();
	                }
	            }
	        );
	        this.yesMenu = cc.Menu.create(this.yesBtn);
	        this.yesMenu.setPosition(position);
	        that.ui.addChild(this.yesMenu);
        }
	}

	this.onProteinsChanged = function(){
		if(!this.ui){
			return;
		}
		var children = this.ui.getChildren();
		for(var btn in children){
			if(children[btn]._rect){ //is btn?
				if(children[btn].isLocked()){
					continue;
				}
				if(yc.ui.checkCost(children[btn].building.cost())){
					children[btn].setFaceType(0);
					children[btn].setBuildable(true);
				}else{
					children[btn].setFaceType('nm');
					children[btn].setBuildable(false);
				}
			}
		}
	}
}
yc.ui.checkCost = function(cost){
	var pool = ins(yc.user.Character).proteins ;
	for(var protein in cost)
	{
		// console.log(pool.num(protein) , cost[protein]);
		if( pool.num(protein) < cost[protein] )
		{
			return false ;
		}
	}
	return true ;
}


yc.ui.costDec = function(cost){
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
		costHtml+= '[color='+proteinFormula.colorHtml+']♫ ' + cost[proteinName] + '[/]' ;
	}
	
	return costHtml ;
}
