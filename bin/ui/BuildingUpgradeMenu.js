yc.ui.BuildingUpgradeMenu = function(){
	
	this.ui = null ;    
	var that = this ;
	
	this.building = null ;
	this.costRecovering = {} ;
	
	this.show = function( hexgon ){
		this.hexgon = hexgon;
		this.building = hexgon.building ;
		var buildingClass = this.building.constructor ;
		
		if(!buildingClass.upgraders)
		{
			return;
		}
		if(!this.ui){

			ins(yc.outer.PlayerLayer).setNeedFaceToPoint(false) ;

			this.ui = new cc.Layer();
			this.ui.building = this.building;
			scene.layerUi.addChild(this.ui);

			var centerPosition = yc.util.clientToWindow( ins(yc.outer.Cell) , hexgon.center[0],hexgon.center[1]);

			this.uiCenter = [centerPosition[0] , centerPosition[1]];

			for(var u=0;u<buildingClass.upgraders.length;u++)
			{
				var item = new buildingClass.upgraders[u] ;

				var itemUi = UpgradeBuildingBtn.buildingBtnWithTexture(item.texture,item.texture_l,item.texture_nm) ;
				
				itemUi.isUpgradeBuildingBtn =  true;
				itemUi.building = item;
				itemUi.hexgon = hexgon;
				this.ui.addChild( itemUi );
			}

			var closeBtn = cc.MenuItemImage.create(
		        "res/btn-no.png",
		        "res/btn-no-1.png",
		        null,
		        this.close,
		        this
		    );
		    var closeMenu = cc.Menu.create(closeBtn);
		    closeMenu.setPosition( cc.p( 0 , 0) );
		    this.ui.addChild(closeMenu);

		 	this.onProteinsChanged();

		 	this.ui.setPosition(cc.p( this.uiCenter[0] ,this.uiCenter[1]));
		 	this.ui.setAnchorPoint( cc.p(0.5,0.5) );
		 	// this.ui.setRotation(20);

		 	var childrenCount = this.ui.getChildrenCount() - 1;
			if(childrenCount === 0 ){
				that.close();
				return;
			}
			var perBuildingRadian = Math.PI * 2 / childrenCount;
			var children = this.ui.getChildren();
			var radius = childrenCount * 50 / childrenCount ;
			var actDelay = 0.01;

		 	for(var buildingBtnIndex in children){
		 		if(!children[buildingBtnIndex]._rect){
		 			continue;
		 		}

	 			var x = Math.sin(perBuildingRadian*buildingBtnIndex)*radius;
				var y = Math.cos(perBuildingRadian*buildingBtnIndex)*radius;

		 		actDisappear = cc.Sequence.create([
					cc.DelayTime.create(buildingBtnIndex * actDelay)
		 			, cc.Spawn.create( cc.MoveTo.create(0.09, cc.p( x , y )), cc.RotateBy.create(0.11, 360))
		 		]) ;
		 		children[buildingBtnIndex].actDisappear = actDisappear ;
		 		children[buildingBtnIndex].runAction(actDisappear);
		    }
		}


		// var upgraderClass = buildingClass.upgraders[u] ;
		// 		var upgrader = building.upgrader(upgraderClass) ;
				
		// 		// 升级效果
		// 		var detail = upgrader.upgradeDetail(building) ;
		// 		var detailHtml = '效果: ' ;
		// 		for(var property in detail)
		// 		{
		// 			detailHtml+= '<div>' +property +':'+ building[property].toFixed(1) + ' -> ' + 
		// 			(building[property]+detail[property]).toFixed(1) + '</div>' ;
		// 		}
		// 		upgraderUi.find('.detail').html(detailHtml) ;
				
		// 		// 升级费用
		// 		var cost = upgrader.cost() ;
		// 		// upgraderUi.find('.cost').html( '费用：'+yc.ui.costHtml(cost) ) ;
				
		// 		// 升级按钮
		// 		upgraderUi.find('.upgrade')
		// 			.attr('disabled',!upgrader.isUnlock())  // 是否解锁
		// 			.data('upgrader',upgrader)
		// 			.data('cost',cost)
		// 			.click(function(){
		// 				// 关闭菜单
		// 				that.ui.hide() ;
						
		// 				// 执行升级
		// 				$(this).data('upgrader').upgrade(building) ;
						
		// 				// 建筑附加值
		// 				var cost = $(this).data('cost') ;
		// 				for(var p in cost)
		// 				{
		// 					building.cost[p] = (p in building.cost? building.cost[p]: 0) + cost[p] ;
		// 				}
		// 			}) ;
		
			// $('#bulding-upgraders-outer').html('没有可用升级') ;
		
		//拆除回收
		// this.costRecovering = {} ;
		// for(var p in building.cost)
		// {
		// 	this.costRecovering[p] = Math.round(building.cost[p]*0.7) ;
		// }

		// this.ui.find('#cost-recovering').html(yc.ui.costHtml(this.costRecovering)) ;

		// this.ui.css({
		// 		left: window.event.clientX-this.ui.width()-100
		// 		, top: ($(window).height()-this.ui.height())/2
		// 	})
		// 	.show()
		// 	[0].focus() ;
	}

	this.showBuildingDes = function(hexgon , building , position , allowBuild){
		var that = this;
		if(this.yesMenu){
            this.yesMenu.removeFromParent(true);
            
        }
        if(this.ui.pp){
        	this.ui.pp.removeFromParent(true);
    	}

        if(this.ui.label){
            this.ui.label.removeFromParent(true);
        }

        this.ui.pp = cc.Sprite.create("res/building/dec_bg.png");
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
        this.ui.pp.setPosition( cc.p(-320 , 0) ) ;
        this.ui.pp.setScale(0.4,0.4);
        this.ui.label.setPosition( cc.p(-420 , 50) ) ;
        that.ui.addChild(this.ui.pp);
        that.ui.addChild(this.ui.label);

        if(allowBuild){
        	this.yesBtn = cc.MenuItemImage.create(
	            "res/btn-yes.png",
	            "res/btn-yes-1.png",
	            null,
	            function (){
	                if(that.createBuilding( hexgon , building )){
	                    that.close();
	                }
	            },
	            this
	        );
	        this.yesMenu = cc.Menu.create(this.yesBtn);
	        this.yesMenu.setPosition(position);
	        that.ui.addChild(this.yesMenu);
        }
	}



	this.close = function(){
		var inner = ins(yc.inner.InnerLayer) ;
		var that = this;

		if(inner.map.selcted_hexgon)
		{
			inner.map.selcted_hexgon.selected = false ;
			inner.map.selcted_hexgon = null ;
		}
		if(this.ui){
			if(this.ui.label){
				this.ui.pp.removeFromParent(true);
				this.ui.label.removeFromParent(true);
			}
			var childrenCount = this.ui.getChildrenCount() - 1;
			if(childrenCount == 0){
				if(this.ui){
					this.ui.removeFromParent(true);
					this.ui = null;
				}
				// cancel event
				if(window.event.type === 'mouseup'){
					window.event.cancelBubble = true;
				}
				ins(yc.outer.PlayerLayer).setNeedFaceToPoint(true) ;
				return;
			}
			var children = this.ui.getChildren();

			for(var buildingBtnIndex in children){
				if(!children[buildingBtnIndex]._rect){
					continue;
				}
				children[buildingBtnIndex].runAction(

					this.actDisappear = cc.Sequence.create([
						cc.Spawn.create( 
							cc.MoveTo.create(0.09, cc.p( 0,0 ))
							, cc.RotateBy.create(0.11, 360)
						)
						, cc.CallFunc.create(function(){
							if(this.ui){
								this.ui.removeFromParent(true);
								this.ui = null;
							}
						},that)
					])
				);
			}
		}
		// cancel event
		if(window.event.type === 'mouseup'){
			window.event.cancelBubble = true;
		}
		ins(yc.outer.PlayerLayer).setNeedFaceToPoint(true) ;
	}

	// 拆除处理
	this.removeBuilding = function(){
		
		that.close() ;
		
		// if(!confirm('确定要拆除建筑：'+that.building.info.title+'？'))
		// {
		// 	return ;
		// }
		
		// 拆除建筑
		that.building.demolish() ;
		
		// 回收资源
		var pool = ins(yc.user.Character).proteins ;
		for(var p in that.costRecovering)
		{
			pool.increase(p,+that.costRecovering[p]) ;
		}
		
		// 重新计算路径
		var cell = ins(yc.inner.InnerLayer).cell ;
		var map = cell.researchPath() ;
	} ;

	this.onProteinsChanged = function(){
		if(!this.ui){
			return;
		}
		var children = this.ui.getChildren();
		for(var btn in children){
			if(children[btn]._rect){ //is btn?
				// if(children[btn].isLocked()){
				// 	continue;
				// }
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

	this.touchMiss = function(touch){
		if( !this.touchMissCount){
			this.touchMissCount = {};
		}
		var key = touch._point.x+":"+touch._point.y;
		if(this.touchMissCount[key]){
			this.touchMissCount[key]++;
		}else{
			this.touchMissCount[key] = 1;
		}

		var childrenCount = 0;
		var children = this.ui.getChildren();
		for(var item in children){
			if(children[item].type && children[item].type=="UpgradeBuildingBtn"){
				childrenCount++;
			}
		}
		if(this.touchMissCount[key] >= childrenCount ){
			this.close();
		}
	}
	
}


yc.ui.BuildingUpgradeMenu.className = 'yc.ui.BuildingUpgradeMenu' ;
