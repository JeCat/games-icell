yc.inner.building.Building = cc.Sprite.extend({  


	ctor: function(){
		this._upgraders = {}
		this.hexgon = null
		this.cost = {} ;
		this.bStop = false ;
		this.layer = "inner" ;
		this.bBlock = true ;

		this.skills = [] ;
	} 

	, addSkill: function(skillObj){
		skillObj.setBuilding( this );
		skillObj.num = Math.random();
		this.skills.push(skillObj);
	}
	
	, removeSkill: function(){
		
		if(this.skills){

			// 处理技能 -----------------
			var skillBar = ins(yc.ui.UILayer).skillBar ;
			
			for( var i=0;i<this.skills.length;i++){
				var skill = this.skills[i];
				skillBar.removeButtonForSkill( skill );
			}
			this.skills = [] ;
		}
	}

	, put: function(hexgon){

		// 决定 building 放在哪个 layer 上
		if( 'shell' == this.layer ){
			var bLayer = ins(yc.outer.Cell).shell; 
		}else{
			var bLayer = ins(yc.inner.InnerLayer).buildings ;
		}
		
		// 分配 idx
		this.idx = bLayer.assigned ++ ;
		
		// 添加
		bLayer.addChild(this) ;

		hexgon.building = this ;
		hexgon.block = this.bBlock ;
		this.hexgon = hexgon ;
		this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
		this.setVisible(true) ;

		// 处理技能 -----------------
		var skillBar = ins(yc.ui.UILayer).skillBar ;

		if(this.skills){
			for( var i=0;i<this.skills.length;i++){
				var skill = this.skills[i];
				skillBar.createButtonForSkill( skill );
			}
		}
	}
	, putOn: function(x,y){
		return this.put( ins(yc.inner.InnerLayer).cell.aAxes.hexgon(x,y) ) ;
	}
	
	, draw: function(ctx){
		if(!this.hexgon)
		{
			return ;
		}

		// 调整建筑的旋转（补偿细胞旋转）
		ctx.rotate( this.getRotation() ) ;

		this._super(ctx) ;
	}
	
	/**
	 * 拆除
	 */
	, demolish: function(){
		
		// remove skill
		this.removeSkill();
		
		this.hexgon.building = null ;
		this.hexgon.block = false ;
		this.hexgon = null ;
		this._parent.removeChild(this) ;
		
		// 停用
		this.stop() ;
	}
	
	/**
	 * 出售
	 */
	, sell: function(){
		this.demolish() ;
		
		// 回收一点蛋白质
	}
	
	/**
	 * 建筑停用
	 */
	, stop: function(){
		this.bStop = true ;
	}
	
	, isBlocking: function(){
		return this.bBlock ;
	}
	
	, upgrader: function(upgraderClass){
		if( typeof(this._upgraders[upgraderClass.className])=='undefined' )
		{
			this._upgraders[upgraderClass.className] = new upgraderClass ;
		}
		return this._upgraders[upgraderClass.className] ;
	}
	
	, onExit: function(){
		log(this.constructor.className+" onExit") ;
		this.stop() ;
	}

	, exportScript: function(){
		var script = {
			className: this.constructor.className
			, upgraders: {}
			, cost : this.cost
		}		

		// 升级
		for( var name in this._upgraders )
		{
			script.upgraders[name] = this._upgraders[name].lv ;
		}

		return script ;
	}

	, initWithScript: function(script){

		this.cost = script.cost;
		// 升级
		for( var name in script.upgraders )
		{
			var upgrader = this.upgrader(eval(name)) ;

			// 执行升级
			for(var i=0;i<script.upgraders[name];i++)
			{
				upgrader.upgrade(this) ;
			}
		}
	}

	// 获得建筑在世界中对应的坐标位置
	, worldAxes: function(){
		var cell = ins(yc.outer.Cell) ;
		var mypos = yc.util.clientToWindow( ins(yc.inner.InnerLayer).buildings, this.hexgon.center[0], this.hexgon.center[1], ins(yc.outer.PlayerLayer) ) ;
		return [ 
			cell.x + mypos[0]
			, cell.y + mypos[1]
		] ;
	}

}) ;
