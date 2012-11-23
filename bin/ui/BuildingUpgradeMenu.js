yc.ui.BuildingUpgradeMenu = function(){
	
	this.ui = null ;    
	var that = this ;
	
	// this.building = null ;
	// this.costRecovering = {} ;

	this.removeBuildingUpgrader = {
		texture:"res/building/remove.png"
		, texture_l :  "res/building/remove.png"
		, texture_nm :  "res/building/remove.png"
		, title : '回收器官'
		, description : '回收器官换取部分资源'
		// , cost : function(){
		// 	return '';
		// }
	};
	
	this.show = function( hexgon ){
		this.hexgon = hexgon;

		this.building = hexgon.building;

		if(!this.hexgon.finalCost){
			this.hexgon.finalCost = {};
			yc.util.cloneObject( this.hexgon.finalCost , this.building.cost);
		}

		var buildingClass = this.building.constructor ;
		if(!this.ui){

			ins(yc.outer.PlayerLayer).setNeedFaceToPoint(false) ;

			this.ui = new cc.Layer();
			this.ui.building = this.building;
			scene.layerUi.addChild(this.ui);

			var centerPosition = yc.util.clientToWindow( ins(yc.outer.Cell) , hexgon.center[0],hexgon.center[1]);

			this.uiCenter = [centerPosition[0] , centerPosition[1]];

			if(buildingClass.upgraders){
				for(var u=0;u<buildingClass.upgraders.length;u++)
				{
					var upgraderClass = buildingClass.upgraders[u] ;
					var upgrader = this.building.upgrader(upgraderClass) ;

					var itemUi = UpgradeBuildingBtn.buildingBtnWithTexture(
						upgrader.texture
						,upgrader.texture_l
						,upgrader.texture_nm
					) ;
					
					itemUi.upgraderClass = upgraderClass;
					itemUi.building = this.building;
					itemUi.upgrader = upgrader;
					itemUi.hexgon = hexgon;
					this.ui.addChild( itemUi );
				}
			}

			var removeBuilding = UpgradeBuildingBtn.buildingBtnWithTexture(
				this.removeBuildingUpgrader.texture
				,this.removeBuildingUpgrader.texture_l
				,this.removeBuildingUpgrader.texture_nm
			) ;
			removeBuilding.building = this.building;
			removeBuilding.upgrader = this.removeBuildingUpgrader;
			removeBuilding.hexgon = hexgon;
			removeBuilding.isRemoveBuilding = true;
			this.ui.addChild( removeBuilding );

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
			var radius = ( childrenCount / (childrenCount + 1) ) * 100;
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
	}

	this.showBuildingDes = function(hexgon , building , upgrader , position , allowBuild , target){
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

        if(target.isRemoveBuilding){
        	var detailHtml = '';
        }else{
			var detail = upgrader.upgradeDetail(building) ;
	        var detailHtml = '效果:╗' ;
	        for(var property in detail)
			{
				detailHtml+= property +':'+ building[property].toFixed(1) + '->' + (building[property]+detail[property]).toFixed(1) + "╗";
			}
        }

        this.ui.pp = cc.Sprite.create("res/building/dec_bg.png");
        this.ui.label = cc.Sprite.create();

        // console.log(building);

        this.ui.label.draw = function(ctx)
        {
            var font = ins(yc.ui.font.Font);
            font.setWidth(190);
            font.setHeight(185);
            font.setTextIndent(0);
            font.setTextAlign('left');
            font.setLetterSpacing(4);
            font.setLineHeight(18);

            var costText = ""; 
            if(target.isRemoveBuilding){
	        	costText = '可回收:';

    			//拆除回收
				that.costRecovering = {} ;

				for(var p in that.hexgon.finalCost)
				{
					that.costRecovering[p] = Math.round(that.hexgon.finalCost[p]*0.7) ;
				}
				costText+=yc.ui.costDec(that.costRecovering);
	        }else{
	        	costText = yc.ui.costDec(upgrader.cost());
	        }

	        var lv = ""; 
            if(target.isRemoveBuilding){

	        }else{
	        	lv = "[color=#F00;size=14;]Lv "+ (upgrader.lv+1) + "[/]";
	        }

            var dec = "[color=#F00;weight=bold;size=16;font=隶书]"+upgrader.title +'[/]'
            	+lv
            	+"╗"
                +"[color=#F00;size=14;font=隶书]"+upgrader.description+'[/]╗'
                +"[color=#F00;size=12;font=隶书]"+detailHtml+'[/]╗'
                +costText;

            font.setText( dec );
            font.draw(ctx);
        }
        this.ui.pp.setPosition( cc.p(-320 , 0) ) ;
        this.ui.pp.setScale(0.8 , 1);
        this.ui.label.setPosition( cc.p(-420 ,90) ) ;
        that.ui.addChild(this.ui.pp);
        that.ui.addChild(this.ui.label);

        if(allowBuild){
        	this.yesBtn = cc.MenuItemImage.create(
	            "res/btn-yes.png",
	            "res/btn-yes-1.png",
	            null,
	            function (){
	            	// upgrader.isUnlock()
	            	if(target.isRemoveBuilding){
						that.removeBuilding();
			        }else{
		        	 	upgrader.upgrade(that.building);

						//	 建筑附加价值
						var cost = upgrader.cost();
						for(var p in cost)
						{
							that.hexgon.finalCost[p] = (p in that.hexgon.finalCost? that.hexgon.finalCost[p]: 0) + cost[p] ;
						}
			        }
			        that.close();
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
					this.costRecovering = {};
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
								this.costRecovering = {};
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

		this.hexgon.finalCost = {};
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

				if(children[btn].isRemoveBuilding){
					continue;
				}
				if(yc.ui.checkCost(children[btn].upgrader.cost())){
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








// yc.ui.BuildingUpgradeMenu = function(){


// 	this.show = function(building){
		
// 		this.building = building ;
// 		var buildingClass = building.constructor ;
		
		
// 		if(buildingClass.upgraders.length)
// 		{
// 			$('#bulding-upgraders-outer').html('') ;
// 			for(var u=0;u<buildingClass.upgraders.length;u++)
// 			{
// 				var upgraderClass = buildingClass.upgraders[u] ;
// 				var upgrader = building.upgrader(upgraderClass) ;
				
// 				var upgraderUi = $('#bulding-upgrader-template')
// 						.clone()
// 						.appendTo('#bulding-upgraders-outer')
// 						.attr({id:''})
// 						.show() ;
						
// 				var v = upgraderUi.find('.title') ;
				
// 				upgraderUi.find('.newLv').html('Lv '+(upgrader.lv+1)) ;
// 				upgraderUi.find('.title').html(upgrader.title) ;
// 				upgraderUi.find('.description').html(upgrader.description) ;
				
// 				// 升级效果
// 				var detail = upgrader.upgradeDetail(building) ;
// 				var detailHtml = '效果' ;
// 				for(var property in detail)
// 				{
// 					detailHtml+= '<div>' +property +':'+ building[property].toFixed(1) + ' -> ' + (building[property]+detail[property]).toFixed(1) + '</div>' ;
// 				}
// 				upgraderUi.find('.detail').html(detailHtml) ;
				
// 				// 升级费用
// 				var cost = upgrader.cost() ;
// 				upgraderUi.find('.cost').html( '费用：'+yc.ui.costHtml(cost) ) ;
				
// 				// 升级按钮
// 				upgraderUi.find('.upgrade')
// 					.attr('disabled',!upgrader.isUnlock())  // 是否解锁
// 					.data('upgrader',upgrader)
// 					.data('cost',cost)
// 					.click(function(){
// 						// 关闭菜单
// 						menu.ui.hide() ;
						
// 						// 执行升级
// 						$(this).data('upgrader').upgrade(building) ;
						
// 						// 建筑附加值
// 						var cost = $(this).data('cost') ;
// 						for(var p in cost)
// 						{
// 							building.cost[p] = (p in building.cost? building.cost[p]: 0) + cost[p] ;
// 						}
// 					}) ;
// 			}
// 		}
// 		else
// 		{
// 			$('#bulding-upgraders-outer').html('没有可用升级') ;
// 		}
		
// 		//拆除回收
// 		this.costRecovering = {} ;
// 		for(var p in building.cost)
// 		{
// 			this.costRecovering[p] = Math.round(building.cost[p]*0.7) ;
// 		}
// 		// this.ui.find('#cost-recovering').html(yc.ui.costHtml(this.costRecovering)) ;

// 	}