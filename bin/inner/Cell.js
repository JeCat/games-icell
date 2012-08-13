yc.inner.Cell = function()
{
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
    
    
    // 新玩家初始化一个新细胞
    this.newborn() ;
    
    
    
    
    
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

// 新玩家 初始化一个新细胞
yc.inner.Cell.prototype.newborn = function()
{
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



yc.inner.Cell.ins = function(){
    if(typeof(yc.inner.Cell._ins)=='undefined'){
        yc.inner.Cell._ins = new yc.inner.Cell() ;
    }
    return yc.inner.Cell._ins ;
}