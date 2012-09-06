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
			, 'tower:retardment': new yc.dna.GeneBuildingUpgrader({
				name: 'tower:retardment'
				, title: '防御塔：减速'
				, description: '解锁：能够将“防御塔：减速”效果升级到更高等级'
				, upgrader: yc.inner.building.up.TowerRetardment
			})
			, 'grow': new yc.dna.Gene({
				name: 'grow'
				, title: '生长'
				, description: '解锁：允许细胞扩充新的格子'
			})
		}
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:firepower']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:firepower']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:firepower']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:firepower']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:bombing']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:bombing']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:bombing']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:bombing']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:retardment']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:retardment']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:retardment']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['tower:retardment']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['grow']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['grow']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['grow']) ;
		ins(yc.dna.DNA).obtainGene(yc.dna.genes['grow']) ;
		
		// ---------------
		// 初始化基本场景
		this._onEnter() ;
		
		// 创建各种角色
		this.randomCreateEntities(yc.outer.VirusCluster,40,this.layerRoles) ;
		this.randomCreateEntities(yc.outer.AminoAcid,40,this.layerRoles) ;
		this.randomCreateEntities(yc.outer.Stain,60,this.layerStains) ;
		
		// ---------------
		// 初始化资源
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
        
        
		this._initBoss() ;
		
	}
	
	, _initBoss: function(){
		
		// boss 指南针
		this.compassBoss = yc.outer.BossCompass.ins() ;
		this.layerUi.addChild(this.compassBoss) ;
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
        boss.genes.push(yc.dna.genes['tower:retardment']) ;
        boss.genes.push(yc.dna.genes['grow']) ;
        
        this.compassBoss.arrBosses.push(boss);
        this.layerRoles.addChild(boss) ;
       
	}
	
	, _createRandomBoss: function(radius,lv){
		var angle = Math.random() * 2*Math.PI ;
		
		var boss = new yc.outer.Boss() ;
		boss.lv = lv ;
		boss.x = radius*Math.sin(angle) ;
		boss.y = radius*Math.cos(angle) ;
		
		this.layerEnemies.addChild(boss) ;
		
		return boss ;
	}
	
}) ;
