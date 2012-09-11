yc.settings = {
		
	// 内部场景 ------------------------------
	inner: {
	    // 六边形边长
	    hexgonSideLength: 30
	    // 六边形格子的最大层数
	    , cellMaxLevels: 5
	    // 六边形格子层数的游戏初始值
	    , cellInitialLevels: 1
	    
	    // 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
	    , totalHexgonLevels: 13
	    
	    , width: 600
	    , height: 676
	    
	    // 细胞核
	    , nucleus: {
	        x: null
	        , y: null
	    }
	    , dbg: true
	}

	, outer: {
		
		// 污渍
		stain: {
			dbg: false
		}
	
		, virus:{
			dbg: {
				showId: false
			}
		}
		
		, box2d: {
			dbg: false
		}
		
	}
	
	, player: {
		// 免伤害
		nohurt: false
		// 隐身(怪不会攻击)
		, stealth: false
	}
	
	, dbg: true
} 




// 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
yc.settings.inner.totalHexgonLevels = yc.settings.inner.cellMaxLevels*2+1+2 ;

// 细胞核 六边形的坐标
yc.settings.inner.nucleus.x = yc.settings.inner.nucleus.y = yc.settings.inner.cellMaxLevels+1 ;

// 内部舞台的宽
yc.settings.inner.width = Math.ceil( 1.5 * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels + yc.settings.inner.hexgonSideLength/2 ) ;

// 内部舞台的高
yc.settings.inner.height = Math.ceil( Math.sqrt(3) * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels ) ;
