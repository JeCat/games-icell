yc.levels.FreeWorld = yc.GameScene.extend({
	
	onEnter: function(){

		this.lft = -800 ;
		this.rgt = 6000 ;
		this.top = 1500 ;
		this.btm = -1500 ;
	
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
		this._super() ;
		
		// 创建各种角色
		this.randomCreateEntities(yc.outer.VirusCluster,30,this.layerRoles) ;
		this.randomCreateEntities(yc.outer.AminoAcid,30,this.layerRoles) ;
		this.randomCreateEntities(yc.outer.Stain,30,this.layerStains) ;
		
		this._initBoss() ;
		
		
		this.testscript() ;
	}

	
	, _initBoss: function(){
		
		// boss 指南针
		this.compassBoss = ins(yc.outer.BossCompass) ;
		this.layerUi.addChild(this.compassBoss) ;
		//this.compassBoss.setPosition(cc.p(100,100)) ;
		compass = this.compassBoss ;
		

		// boss
		var boss = new yc.outer.Boss(5800,200) ;
		boss.lv = 5 ;
		
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
	
	
	, testscript: function(){
		
		return ;
	}
}) ;
