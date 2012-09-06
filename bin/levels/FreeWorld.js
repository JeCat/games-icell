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
		this.randomCreateEntities(yc.outer.VirusCluster,10,this.layerRoles) ;
		this.randomCreateEntities(yc.outer.AminoAcid,100,this.layerRoles) ;
		//this.randomCreateEntities(yc.outer.Stain,60,this.layerStains) ;
		
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
		
		

//        var b2Vec2 = Box2D.Common.Math.b2Vec2
//            , b2BodyDef = Box2D.Dynamics.b2BodyDef
//            , b2Body = Box2D.Dynamics.b2Body
//            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
//            , b2World = Box2D.Dynamics.b2World
//            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
//
//        var screenSize = cc.Director.getInstance().getWinSize();
//        log(screenSize) ;
//
//        var fixDef = new b2FixtureDef;
//        fixDef.density = 1.0;
//        fixDef.friction = 0.5;
//        fixDef.restitution = 0.2;
//
//        var bodyDef = new b2BodyDef;
//
//        //create ground
//        bodyDef.type = b2Body.b2_staticBody;
//        fixDef.shape = new b2PolygonShape;
//        fixDef.shape.SetAsBox(20, 2);
//        // upper
//        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
//        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//        // bottom
//        bodyDef.position.Set(10, -1.8);
//        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//
//        fixDef.shape.SetAsBox(2, 14);
//        // left
//        bodyDef.position.Set(-1.8, 13);
//        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//        // right
//        bodyDef.position.Set(26.8, 13);
//        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//        
       
        

        var debugDraw = new Box2D.Dynamics.b2DebugDraw();
        debugDraw.SetSprite ( document.getElementById ("gameCanvas").getContext ("2d"));
        debugDraw.SetDrawScale(30); //define scale
        debugDraw.SetFillAlpha(0.3); //define transparency
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
        
        
		box = this.addNewSpriteWithCoords(100,100) ;
		body = box.body ;
		
		// 打开世界编辑器
		worldediter() ;
	}


, addNewSpriteWithCoords:function (x,y) {
	
	
    var sprite = new yc.outer.PhysicalEntity();
    sprite.draw = function(ctx){
    	yc.util.drawPolygon( [
          [-PTM_RATIO/2,PTM_RATIO/2]
          ,[PTM_RATIO/2,PTM_RATIO/2]
          ,[PTM_RATIO/2,-PTM_RATIO/2]
          ,[-PTM_RATIO/2,-PTM_RATIO/2]
    	],ctx,'yellow') ;
    }
    this.layerPlayer.addChild(sprite);

    sprite.setWorldPosition(x, y) ;

    // Define the dynamic body.
    //Set up a 1m squared box in the physics world
    var b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.userData = sprite;
    var body = this.world.CreateBody(bodyDef);

    // Define another box shape for our dynamic body.
    var dynamicBox = new b2PolygonShape();
    dynamicBox.SetAsBox(1,1);//These are mid points for our 1m box

    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.3;
    body.CreateFixture(fixtureDef);

    sprite.body = body ;
    return sprite ;
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
