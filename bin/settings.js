yc.settings = {
	
	MUTE : false

	, camera: {

		// 切换内外场景的倍数
		switchZoom: 0.5

		// 初始显示倍数
		, firstZoom: 0.5

		// 细胞在放大时，外壳的透明度
		, outerBuildingOpacityLow: 100

		// 显示倍数 （弃用）
		, cellInnerZoom: 1

		// 默认的最大、最小缩放比例
		, defautlMaxZoom: 1
		, defautlMinZoom: 0.2

	}

	, layers: {

		// 远景层的视差
		perspective: 0.25

		// 背景层的视差
		, background: 0.5

		// 前景层的视差
		, foreground: 1.2
	}

	// 内部场景 ------------------------------
	, inner: {
		// 六边形边长
		hexgonSideLength: 60
		// 六边形格子的最大层数
		, cellMaxLevels: 5
		// 六边形格子层数的游戏初始值
		, cellInitialLevels: 1
		
		// 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
		, totalHexgonLevels: 13
		
		// 当放大倍数大于 zoom 时，显示细胞内部
		// , displayZoom: 2	
		
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

			, defaultColor: "150,150,150"
			, defaultBorderColor: "80,80,80"
		}
	
		// 病毒群
		, virus:{
			dbgInfo: false
			, defaultVigilanceRange: 2000	// 默认警视范围
			, turnRate: 0.04				// 转向灵活度
			, moseySpeed: 10				// 漫步速度
			, normalSpeed: 15				// 正常速度 (追击速度)
			, defaultSize: 100				// 默认尺寸（半径）
			, density: 0.2 					// 物理密度（决定物体的物理质量，影响物体的冲撞力）
		}
		
		// 氨基酸
		, aminoacid: {
			turnRate: 0.2			// 转向灵活度
			, normalSpeed: 2		// 正常速度
			, density: 0.2 			// 物理密度（决定物体的物理质量，影响物体的冲撞力）
			, dbgInfo: false
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
			normalSpeedDown: 50

				
			, defaultAccel: 0.5			// 默认加速度\
			, basePower: 250
		}
		
		, box2d: {
			// world debug draw
			dbg: false
		}

		// 透视视差
		, defaultParallax: {
			foreground: 1.2 		// 前景层
			, background: 1			// 背景层
			, perspective: 0.25		// 远景层
		}
		
	}

	
	
	, player: {
		// 免伤害
		nohurt: false
		// 隐身(怪不会攻击)
		, stealth: false
	}

	, building: {

		// 射击防御塔
		Shooter: {
			// 基础属性
			base: {
				speed: 300					// 炮弹速度
				, freq: 1300				// 射击频率
				, injure: 8				// 伤害
				, range: 250				// 射程
				, sputtering: 1 			// 溅射半径
				, sputtering_injure: 1 		// 溅射伤害
				, retardment: 0				// 减速
				, retardment_duration: 0	// 减速持续时间
			}
			// 建造费用（蛋白质）
			, cost: {
				protein:{
					// red: 3
					// , yellow: 3 
					// , blue: 3
				},
				aminoacid:{
					red: 3
					, yellow: 3 
					, blue: 3
				}
			}
		}

		// 火炮防御塔
		, Cannon: {
			// 基础属性
			base: {
				speed: 300					// 炮弹速度
				, freq: 1500				// 射击频率
				, injure: 7				// 伤害
				, range: 210					// 射程
				, sputtering: 5 			// 溅射半径
				, sputtering_injure: 2		// 溅射伤害
				, retardment: 0				// 减速
				, retardment_duration: 0	// 减速持续时间
			}
			// 建造费用（蛋白质）
			, cost: {
				protein:{
					// red: 5
					// , yellow: 5 
					// , blue: 5
				},
				aminoacid:{
					red: 5
					, yellow: 5 
					, blue: 5
				}
			}
		}

		// 喷射防御塔
		, Jetter: {
			// 基础属性
			base: {
				speed: 300					// 炮弹速度
				, freq: 1500				// 射击频率
				, injure: 10				// 伤害
				, range: 280					// 射程
				, sputtering: 10 			// 溅射半径
				, sputtering_injure: 10 		// 溅射伤害
				, retardment: 0				// 减速
				, retardment_duration: 0	// 减速持续时间
			}
			// 建造费用（蛋白质）
			, cost: {
				protein:{
					// red: 3
					// , yellow: 3 
					// , blue: 3
				},
				aminoacid:{
					red: 3
					, yellow: 3 
					, blue: 3
				}
			}
		}

		// 减速防御塔
		, Slower : {
			// 基础属性
			base: {
				speed: 300					// 炮弹速度
				, freq: 1500				// 射击频率
				, injure: 1					// 伤害
				, range: 280				// 射程
				, sputtering: 10 			// 溅射半径
				, sputtering_injure: 1 		// 溅射伤害
				, retardment: 0.5			// 减速
				, retardment_duration: 2	// 减速持续时间
			}
			// 建造费用（蛋白质）
			, cost: {
				protein:{
					// red: 3
					// , yellow: 3 
					// , blue: 3
				},
				aminoacid:{
					red: 3
					, yellow: 3 
					, blue: 3
				}
			}
		}


		// 回收站
		, Recycle : {
			// 建造费用（蛋白质）
			cost: {
				protein:{
					// red: 5
					// , yellow: 5 
					// , blue: 5
				},
				aminoacid:{
					red: 5
					, yellow: 5 
					, blue: 5
				}
			}
		}

	}


	// 蛋白质的合成公式
	, protein: {
		red: {
			name: 'red'
			// 材料（氨基酸）
			, materials: {		
				red: 5
			}
			// 颜色值（红、绿、蓝）
			, rgb: [255,0,0]
		}
		, yellow: {
			name: 'yellow'
			// 材料（氨基酸）
			, materials: {		
				yellow: 5
			}
			// 颜色值（红、绿、蓝）
			, rgb: [255,255,0]
		}
		, blue: {
			name: 'blue'
			// 材料（氨基酸）
			, materials: {		
				blue: 5
			}
			// 颜色值（红、绿、蓝）
			, rgb: [0,0,255]
		}


		, orange: {
			name: 'orange'
			// 材料（氨基酸）
			, materials: {		
				red: 3
				, yellow: 3
			}
			// 颜色值（红、绿、蓝）
			, rgb: [255,165,0]
		}

		, green: {
			name: 'green'
			// 材料（氨基酸）
			, materials: {		
				blue: 3
				, yellow: 3
			}
			// 颜色值（红、绿、蓝）
			, rgb: [0,165,0]
		}

		, violet: {
			name: 'violet'
			// 材料（氨基酸）
			, materials: {		
				red: 3
				, blue: 3
			}
			// 颜色值（红、绿、蓝）
			, rgb: [255,0,255]
		}
	}

	
	, dbg: true



	// 内置 章节和关卡
	, buildin_chapter_levels:{


		// 第一章
		'c1' : {
			title: "马桶"

			// 关卡地图
			, levelsMapImg: "res/map-c1.png"

			, levels: {
				'c1.l1': {
					// 在关卡地图上的位置
					x: 233
					, y: 280
					, title: "c1.l1"		// (可选)
					, script: "yc.levels.c1.l1"
				}
				
				, 'c1.l2': {
					// 在关卡地图上的位置
					x: 362
					, y: 381
					, title: "c1.l2"
					, script: "yc.levels.c1.l2"
				}
				
				, 'c1.l3': {
					// 在关卡地图上的位置
					x: 520
					, y: 504
					, title: "c1.l3"
					, script: "yc.levels.c1.l3"
				}
				
				, 'c1.l4': {
					// 在关卡地图上的位置
					x: 568
					, y: 373
					, title: "c1.l4"
					, script: "yc.levels.c1.l4"
				}

				, 'c1.l5': {
					// 在关卡地图上的位置
					x: 352
					, y: 668
					, title: "c1.l5"
					, script: "yc.levels.c1.l5"
				}

				, 'c1.l6': {
					// 在关卡地图上的位置
					x: 355
					, y: 812
					, title: "c1.l6"
					, script: "yc.levels.c1.l6"
				}

				, 'c1.l7': {
					// 在关卡地图上的位置
					x: 261
					, y: 972
					, title: "c1.l7"
					, script: "yc.levels.c1.l7"
				}

				, 'c1.l8': {
					// 在关卡地图上的位置
					x: 559
					, y: 907
					, title: "c1.l8"
					, script: "yc.levels.c1.l8"
				}
			}
		}
	}
} 






// 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
yc.settings.inner.totalHexgonLevels = yc.settings.inner.cellMaxLevels*2+1+2 ;

// 细胞核 六边形的坐标
//yc.settings.inner.nucleus.x = yc.settings.inner.nucleus.y = yc.settings.inner.cellMaxLevels+1 ;

// 内部舞台的宽
yc.settings.inner.width = Math.ceil( 1.5 * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels + yc.settings.inner.hexgonSideLength/2 ) ;

// 内部舞台的高
yc.settings.inner.height = Math.ceil( Math.sqrt(3) * yc.settings.inner.hexgonSideLength * yc.settings.inner.totalHexgonLevels ) ;




var b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2World = Box2D.Dynamics.b2World
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2Transform = Box2D.Common.Math.b2Transform
	, b2Mat22 = Box2D.Common.Math.b2Mat22 ;
