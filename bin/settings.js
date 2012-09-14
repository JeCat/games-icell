yc.settings = {
		
	// 内部场景 ------------------------------
	inner: {
	    // 六边形边长
	    hexgonSideLength: 15
	    // 六边形格子的最大层数
	    , cellMaxLevels: 5
	    // 六边形格子层数的游戏初始值
	    , cellInitialLevels: 1
	    
	    // 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
	    , totalHexgonLevels: 13
	    
	    , width: 600
	    , height: 676
	    
	    // 当放大倍数大于 zoom 时，显示细胞内部
	    , displayZoom: 2
	    
	    , zoom: 5
	    
	    // 细胞核
	    , nucleus: {
			// 细胞核所在格子的坐标
	        x: 0
	        , y: 0
	    }
	    , dbg: true
	    
	    
	    // 病毒
	    , virus: {
	    	// 病毒群释放病毒的默认间隔时间(sec)
	    	defaultReleaseDt: 1.5
	    }
	}


	// 外部场景
	, outer: {
		
		// 污渍
		stain: {
			dbg: false
			, defaultMultipleLinearDamping: 2			// 默认 线速度阻尼系数倍数 (相对污渍质量的倍数)
			, defaultMultipleAngularDamping: 4			// 默认 角速度阻尼系数倍数 (相对污渍质量的倍数)
		}
	
		// 病毒群
		, virus:{
			dbg: {
				showId: false
			}
			, defaultVigilanceRange: 200	// 默认警视范围
			, turnRate: 0.04				// 转向灵活度
			, moseySpeed: 2					// 漫步速度
			, normalSpeed: 5				// 正常速度 (追击速度)
			, size: 6						// 尺寸（半径）
			, density: 0.2 					// 物理密度（决定物体的物理质量，影响物体的冲撞力）
		}
		
		// 氨基酸
		, aminoacid: {
			turnRate: 0.2			// 转向灵活度
			, normalSpeed: 2		// 正常速度
			, density: 0.2 			// 物理密度（决定物体的物理质量，影响物体的冲撞力）
		}
		
		// 角色
		, role: {
			// TSD(turn speed down)
			// NPC转向时角度大于 TSD_radian 时，减速 TSD_rate
			TSD_radian: Math.PI/3		
			, TSD_rate: 0.3
			
		}
		
		// 玩家控制的细胞
		, cell: {
			density: 0.2 			// 物理密度（决定物体的物理质量，影响物体的冲撞力）
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
//yc.settings.inner.nucleus.x = yc.settings.inner.nucleus.y = yc.settings.inner.cellMaxLevels+1 ;

// 内部舞台的宽
yc.settings.inner.width = Math.ceil( 1.5 * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels + yc.settings.inner.hexgonSideLength/2 ) ;

// 内部舞台的高
yc.settings.inner.height = Math.ceil( Math.sqrt(3) * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels ) ;
