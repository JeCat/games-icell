yc.inner.Cell = function()
{
	this.hpMax = 10 ;
	this.hp = this.hpMax ;
	
    this.aAxes = new HexgonAxes( game.settings.inner.width, game.settings.inner.height, game.settings.inner.hexgonSideLength ) ;
    this.aAxes._hexgonClass = yc.inner.CellHexgon ;
    this.aAxes.initHexgons() ;
    
    axes = this.aAxes ;
    cell = this ;
            
    // 格子：细胞核
    this.nucleus = null ;
    // 格子：细胞膜
    this.membranes = [] ;
    // 格子：细胞质
    this.cytoplasms = [] ;
    // 细胞质格子的厚度
    this.cytoplasmLevels = game.settings.inner.cellInitialLevels ;
    
    // 氨基酸池
    this.poolAminoAcids = yc.inner.AminoAcidPool.ins() ;
    
    
    
    
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
    this.nucleus = this.aAxes.hexgon( game.settings.inner.nucleus.x, game.settings.inner.nucleus.y ) ;
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


// 新玩家 初始化新细胞的建筑
yc.inner.Cell.prototype.newbornBuildings = function(){
    // 初始化一个 炮塔 和 蛋白质工厂
    yc.inner.InnerLayer.ins().buildings.createBuilding( yc.inner.building.Tower, 6, 5 ) ;
    yc.inner.InnerLayer.ins().buildings.createBuilding( yc.inner.building.ProteinFactory, 7, 5 ) ;
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

	// 偷走蛋白质
	var pool = ins(yc.inner.ProteinPool) ;
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
	
	// 清空资源
	yc.inner.AminoAcidPool.ins().clear() ;
	ins(yc.inner.ProteinPool).clear() ;
	
	// 回收所有建筑
	for(var i=0;i<this.cytoplasms.length;i++)
	{
		if( this.cytoplasms[i].building )
		{
			this.cytoplasms[i].building.demolish() ;
		}
	}
	
	this.revive() ;
}

/**
 * 重生
 */
yc.inner.Cell.prototype.revive = function(){
	
	this.increaseHp(10) ;
	
	// 重置基础建筑
    this.newbornBuildings() ;
	
	// 清除尚未结束攻击的病毒
	
	// 返回原点
	ins(yc.outer.Cell).jump(0,0) ;
}

yc.inner.Cell.ins = function(){
    if(typeof(yc.inner.Cell._ins)=='undefined'){
        yc.inner.Cell._ins = new yc.inner.Cell() ;
    }
    return yc.inner.Cell._ins ;
}
