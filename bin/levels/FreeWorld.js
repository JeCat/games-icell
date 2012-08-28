yc.levels.FreeWorld = yc.GameScene.extend({
	
	_onEnter: yc.GameScene.prototype.onEnter
	, onEnter: function(){

		this.minX = -1000 ;
		this.maxX = 10000 ;
		this.minY = -800 ;
		this.maxY = 800 ;
	
		// dna ----------------
		//  定义基因
		yc.dna.genes = {
            'tower:firepower': new yc.dna.GeneBuildingUpgrader({
                name: 'tower:firepower'
                , title: '防御塔：火力'
                , description: '解锁：能够将“防御塔：火力”升级到更高等级'
                , upgrader: yc.inner.building.up.TowerFierpower
            })
            , 'tower:bombing': new yc.dna.GeneBuildingUpgrader({
                name: 'tower:bombing'
                , title: '防御塔：轰炸'
                , description: '解锁：能够将“防御塔：轰炸”升级到更高等级'
                , upgrader: yc.inner.building.up.TowerBombing
            })
		}
		
		// ---------------
		// 初始化基本场景
		this._onEnter() ;
		
		
		// ---------------
		// 初始化资源
		//  氨基酸池
		/*yc.inner.AminoAcidPool.ins()
			.increase('red',10)
			.increase('yellow',10)
			.increase('blue',10) ;*/
		//  合成公式
		ins(yc.inner.ProteinFormulas)
		    .addNewFormula({
		        name: 'red'
		        , materials: {red:5}
		        , rgb: [255,0,0]
		    })
		    .addNewFormula({
		        name: 'yellow'
		        , materials: {yellow:5}
		        , rgb: [255,255,0]
		    })
		    .addNewFormula({
		        name: 'blue'
		        , materials: {blue:5}
		        , rgb: [0,0,255]
		    })
		    .addNewFormula({
		        name: 'orange'
		        , materials: {red:3,yellow:3}
		        , rgb: [255,165,0]
		    }) 
		    .addNewFormula({
		        name: 'green'
		        , materials: {blue:3,yellow:3}
		        , rgb: [0,165,0]
		    }) 
		    .addNewFormula({
		        name: 'violet'
		        , materials: {red:3,blue:3}
		        , rgb: [255,0,255]
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
		

		// boss
        var boss = new yc.outer.Boss() ;
		boss.lv = 5 ;
        boss.x = 9500 ;
        boss.y = 200 ;
        
        // boss掉落的基因
        boss.genes.push(yc.dna.genes['tower:firepower']) ;
        boss.genes.push(yc.dna.genes['tower:bombing']) ;
        
        this.compassBoss.arrBosses.push(boss);
        this.layerRoles.addChild(boss) ;
        
		
		// 一环: 半径5km, 4个boss, lv30
		/*for(var i=0;i<4;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(5000,20) ) ;
		}
		
		// 二环: 半径10km, 8个boss, lv50
		for(var i=0;i<8;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(10000,40) ) ;
		}
		
		// 三环:半径15km, 12个boss, lv80
		for(var i=0;i<12;i++)
		{
			this.compassBoss.arrBosses.push( this._createRandomBoss(15000,60) ) ;
		}*/
		
		
        //this.compassBoss.arrBosses.push( this._createRandomBoss(500,10) ) ;
		
       
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
