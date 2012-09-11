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
			// 细胞核所在格子的坐标
	        x: null
	        , y: null
	    }
	    , dbg: true
	}


	// 外部场景
	, outer: {
		
		// 污渍
		stain: {
			dbg: false
		}
	
		// 病毒群
		, virus:{
			dbg: {
				showId: false
			}
			, vigilanceRange: 200	// 警视范围
			, turnRate: 0.04		// 转向灵活度
			, moseySpeed: 2			// 漫步速度
			, normalSpeed: 5		// 正常速度 (追击速度)
			, size: 6				// 尺寸（半径）
		}
		
		// 氨基酸
		, aminoacid: {
			turnRate: 0.2			// 转向灵活度
			, normalSpeed: 2		// 正常速度
		}
		
		// 角色
		, role: {
			// TSD(turn speed down)
			// NPC转向时角度大于 TSD_radian 时，减速 TSD_rate
			TSD_radian: Math.PI/3		
			, TSD_rate: 0.3
			
		}
		
		// 玩家
		, player: {
			// 正常减速
			// 当玩家停止移动后，每帧递减值
			normalSpeedDown: 0.5

				
			, defaultAccel: 0.3			// 默认加速度
			, defaultMaxSpeed: 5		// 默认最大速度
		}
		
		, box2d: {
			// world debug draw
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
