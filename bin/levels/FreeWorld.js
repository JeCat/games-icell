yc.levels.FreeWorld = yc.GameScene.extend({
	
	_onEnter: yc.GameScene.prototype.onEnter
	, onEnter: function(){
		
		// ---------------
		// 初始化基本场景
		this._onEnter() ;
		
		
		// ---------------
		// 初始化资源
		//  氨基酸池
		yc.inner.AminoAcidPool.ins()
			.increase('red',10)
			.increase('yellow',10)
			.increase('blue',10) ;
		//  合成公式
		yc.inner.ProteinFormulas.ins
		    .addNewFormula({
		        name: 'red'
		        , materials: {red:5}
		        , color: 'rgb(255,0,0)'
		    })
		    .addNewFormula({
		        name: 'yellow'
		        , materials: {yellow:5}
		        , color: 'rgb(255,255,0)'
		    })
		    .addNewFormula({
		        name: 'blue'
		        , materials: {blue:5}
		        , color: 'rgb(0,0,255)'
		    })
		    .addNewFormula({
		        name: 'orange'
		        , materials: {red:4,yellow:4}
		        , color: 'rgb(255,165,0)'
		    }) ;
		
		
		// ---------------
        // 新玩家初始化一个新细胞 
        this.layerInner.cell.newborn() ;
        
        
		// ---------------
		// 初始化 Boss
		this._initBoss() ;
	}
	
	, _initBoss: function(){
		
		// boss 指南针
		this.compassBoss = yc.outer.BossCompass.ins() ;
		this.layerRoles.addChild(this.compassBoss) ;
		//this.compassBoss.setPosition(cc.p(100,100)) ;
		compass = this.compassBoss ;
		
		
		// 一环: 半径5km, 4个boss, lv30
		for(var i=0;i<4;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(5000,30) ) ;
		}
		
		// 二环: 半径10km, 8个boss, lv50
		for(var i=0;i<8;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(10000,50) ) ;
		}
		
		// 三环:半径15km, 12个boss, lv80
		for(var i=0;i<12;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(15000,80) ) ;
		}
	}
	
	, _createRandomBoss: function(radius,lv){
		var angle = Math.random() * 2*Math.PI ;
		
		var boss = new yc.outer.Boss() ;
		boss.lv = lv ;
		boss.x = radius*Math.sin(angle) ;
		boss.y = radius*Math.cos(angle) ;
		
		this.layerRoles.addChild(boss) ;
		
		return boss ;
	}
	
}) ;
