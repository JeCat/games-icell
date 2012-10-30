yc.inner.Cell = function()
{
	this.hpMax = 10 ;
	this.hp = this.hpMax ;
	
	this.aAxes = new HexgonAxes( yc.settings.inner.hexgonSideLength, yc.inner.CellHexgon ) ;

	axes = this.aAxes ;
	cell = this ;
			
	// 格子：细胞核
	this.nucleus = null ;
	// 格子：细胞膜
	this.membranes = [] ;
	// 格子：细胞质
	this.cytoplasms = [] ;
	// 细胞质格子的厚度
	this.cytoplasmLevels = yc.settings.inner.cellInitialLevels ;
	
	this.grown = 0 ;
	
	
	if(this.aAxes._dbgCanvas)
	{
		var ct = this.aAxes._dbgCanvas.getContext('2d') ;
		var move = function (p){ ct.moveTo(p[0],p[1]) ; }
		var line = function (p){ ct.lineTo(p[0],p[1]) ; }
	
		// 画细胞核
		ct.strokeStyle = "rgb(50,50,50)" ;
		ct.fillStyle = "rgb(180,180,180)" ;
		ct.beginPath() ;
		move(this.nucleus.points.A) ;
		line(this.nucleus.points.B) ;
		line(this.nucleus.points.C) ;
		line(this.nucleus.points.D) ;
		line(this.nucleus.points.E) ;
		line(this.nucleus.points.F) ;
		line(this.nucleus.points.A) ;
		ct.closePath()
		ct.fill() ;
		ct.stroke();
		
	
		// 画细胞膜的外边缘 
		for(var i=0;i<this.membranes.length;i++)
		{
			var hexgon = this.membranes[i] ;
			
			var outsideHexgons = hexgon.neighborsByType(null) ;
			for(var way in outsideHexgons)
			{
				var borderLine = hexgon.line(way) ;
				
				ct.beginPath() ;
				move(borderLine[0]) ;
				line(borderLine[1]) ;
				ct.closePath()
				ct.stroke();
			}
		}
	}
}

yc.inner.Cell.prototype.increaseHp = function(val){
	this.hp+= val ;
	if(this.hp>this.hpMax)
	{
		this.hp = this.hpMax ;
	}
	else if(this.hp<0)
	{
		this.hp=0 ;
	}
	
	// 触发事件
	$(window).trigger('yc.inner.Cell::onAfterChange',[this,val,this.hp]) ;
	
	if(this.hp==0)
	{
		this.die() ;
	}
}

// 新玩家 初始化一个新细胞
yc.inner.Cell.prototype.newborn = function()
{
	this.increaseHp(0) ;
	
	// 找到关键的格子
	// ------
	// 细胞核
	this.nucleus = this.aAxes.hexgon( yc.settings.inner.nucleus.x, yc.settings.inner.nucleus.y ) ;
	this.nucleus.type = 'nucleus' ;
	
	// 细胞质
	var findoutHexgon = this.nucleus ;
	var findPath = [ ['s','e'], ['s',''], ['s','w'], ['n','w'], ['n',''], ['n','e'] ] ; //
		
	this.cytoplasms = [] ;
	this.membranes = [] ;
	for(var l=0;l<this.cytoplasmLevels;l++)
	{
		// 从正北
		findoutHexgon = findoutHexgon.n() ;
		
		// 按照路径找格子
		for(var w=0;w<findPath.length;w++)
		{
			// 关键格子之间的距离 和 正在找第几层格子有关
			for(var dis=1;dis<=l+1;dis++)
			{
				findoutHexgon = findoutHexgon.neighbor( findPath[w][0], findPath[w][1] ) ;
				findoutHexgon.type = 'cytoplasm' ;
				this.cytoplasms.push(findoutHexgon) ;
			}
		}
	}
	
	// 细胞膜
	for(var i=0;i<cell.cytoplasms.length;i++)
	{
		this.expandCytoplasm(cell.cytoplasms[i]) ;
	}
	
	this.newbornBuildings() ;
}

//新玩家 初始化新细胞的建筑
yc.inner.Cell.prototype.newbornBuildings = function(){
	// 初始化一个 炮塔 和 蛋白质工厂
	var menu = ins(yc.ui.BuildingCreateMenu) ;
	menu.createBuilding( this.aAxes.hexgon(0,-1), menu.items.shooter ) ;
	menu.createBuilding( this.aAxes.hexgon(1,-1), menu.hideItems.factory ) ;
}


/**
 * 细胞生长：将一个细胞膜格子转变成细胞质
 */
yc.inner.Cell.prototype.grow = function(x,y){
	var hexgon = this.aAxes.hexgon(x,y) ;
	if( !hexgon /*|| hexgon.type!='membrane'*/ )
	{
		return ;
	}

	yc.util.arr.remove(this.cytoplasms,hexgon) ;
	yc.util.arr.remove(this.membranes,hexgon) ;

	hexgon.type = 'cytoplasm' ;
	this.cytoplasms.push(hexgon) ;
	
	this.expandCytoplasm(hexgon) ;
	
	this.grown ++ ;
}


// 将个六边形格子扩张为细胞质
yc.inner.Cell.prototype.expandCytoplasm = function(hexgon){
	
	// 更新细胞膜
	for(var way in hexgon.neighbors)
	{
		var neighbor = hexgon[way]() ;
		
		// 邻接的空格子改为细胞膜
		if( neighbor && neighbor.type==null )
		{
			this.membranes.push(neighbor) ;
			neighbor.type = 'membrane' ;
		}
	}
}



yc.inner.Cell.prototype.researchPath = function(){
	return this.aAxes.searchPath( this.nucleus.x, this.nucleus.y ) ;
}
yc.inner.Cell.prototype.pathMap = function(){
	var pathMap = this.nucleus.data('path-map') ;
	if(!pathMap)
	{
		return this.researchPath() ;
	}
	else
	{
		return pathMap ;
	}
}

/**
 * 病毒攻击到细胞核
 */
yc.inner.Cell.prototype.getHurt = function(){

	// 免受伤害
	if( yc.settings.player.nohurt )
	{
		return ;
	}
	
	// 偷走蛋白质
	var pool = ins(yc.user.Character).proteins ;
	if(pool.total>0)
	{
		var proteins = [] ;
		for(var key in pool.mapProteins)
		{
			if(pool.mapProteins[key]>0)
			{
				proteins.push(key) ;
			}
		}
		
		// 随机一种类型的蛋白质
		var i = Math.floor(proteins.length * Math.random()) ;
		var type = proteins[i] ;
		
		pool.increase(type,-1) ;
	}
	
	// 攻击细胞核
	else
	{
		this.increaseHp(-1) ;
	}
}

yc.inner.Cell.prototype.die = function(){
	alert('you are die !') ;
	
	// 回到关卡选择菜单
	cc.Director.getInstance().replaceScene( new yc.MainScene ) ;
	
//	// 清空资源
//	ins(yc.user.Character).aminoacids.clear() ;
//	ins(yc.user.Character).proteins.clear() ;
//	
//	// 回收所有建筑
//	for(var i=0;i<this.cytoplasms.length;i++)
//	{
//		if( this.cytoplasms[i].building )
//		{
//			this.cytoplasms[i].building.demolish() ;
//		}
//	}
//	
//	this.revive() ;
}

/**
 * 重生
 */
yc.inner.Cell.prototype.revive = function(){
//	
//	this.increaseHp(10) ;
//	
//	// 重置基础建筑
//	this.newbornBuildings() ;
//	
//	// 返回原点
//	ins(yc.outer.Cell).jump(0,0) ;
}

/**
 * 回收
 */
yc.inner.Cell.prototype.destory = function(){
	for(var i=0;i<this.cytoplasms.length;i++)
	{
		if( this.cytoplasms[i].building )
		{
			this.cytoplasms[i].building.demolish() ;
		}
	}
}

/**
 * 导出为 json
 */
yc.inner.Cell.prototype.exportScript = function() {

	var script = {
		nucleus: [ this.nucleus.x, this.nucleus.y ]
		, cytoplasms: []
		, membranes: []
		, buildings: []
	}

	var cell = this ;
	(function (type){
		for(var i=0; i<cell[type].length; i++)
		{
			// 坐标
			script[type].push([
				cell[type][i].x
				, cell[type][i].y
			]) ;

			// 建筑
			if( cell[type][i].building )
			{
				var building = cell[type][i].building.exportScript() ;
				building.x = cell[type][i].x ;
				building.y = cell[type][i].y ;
				script.buildings.push( building ) ;
			}
		}

		return arguments.callee  ;
	})
	("cytoplasms")		// 细胞质
	("membranes") ;		// 细胞膜


	return script ;
}

/**
 * 从 json 导入
 */
yc.inner.Cell.prototype.initWithScript = function( script ){

	this.aAxes = new HexgonAxes( yc.settings.inner.hexgonSideLength, yc.inner.CellHexgon ) ;
	this.grown = 0 ;

	// 格子：细胞核
	this.nucleus = this.aAxes.hexgon( script.nucleus[0], script.nucleus[1] ) ;
	this.nucleus.type = "nucleus" ;

	// 细胞质
	for(var i=0;i<script.cytoplasms.length;i++){
		script.cytoplasms[i] ;
		this.grow( script.cytoplasms[i][0], script.cytoplasms[i][1] ) ;
	}
	
	// 建筑
	for(var i=0;i<script.buildings.length;i++){
		var building = new (eval(script.buildings[i].className)) ;
		building.putOn(script.buildings[i].x,script.buildings[i].y) ;

		// 升级
		var upgraders = script.buildings[i].upgraders ;
		for(var name in upgraders)
		{
			for(var u=0;u<upgraders[name];u++)
			{
				building.upgrader( eval(name) )
							.upgrade(building,false) ;
			}
		}
	}

	this.grown = 0 ;


	return ;
}
