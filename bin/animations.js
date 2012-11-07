yc.animations = {
	frames: {}
}

yc.animations.createAction = function(name){
	return cc.Animate.create( yc.animations.frames[name] ) ;
}

yc.animations.initBuildinAnimations = function (){

	/**
	 * 加载帧序列
	 */
	function __loadAnimation(name,plist,png,frameNameTemp,idxStart,idxEnd,callback){
		
		var spriteFrameCache = cc.SpriteFrameCache.getInstance();
		spriteFrameCache.addSpriteFrames(plist,png) ;

		var animFrames = [];
		for (var i = idxStart; i <= idxEnd; i++) {

			// str = "artillery_lvl4_tesla_00" + (i<10?'0':'') + i + ".png";
			var framename = frameNameTemp.replace("%idx%",(i<10?'0':'') + i) ;

			var frame=spriteFrameCache.getSpriteFrame(framename);
			if( !frame ){
				continue ;
			}

			if(callback!==undefined){
				callback(frame) ;
			}

			animFrames.push(frame);
		}

		yc.animations.frames[name] = cc.Animation.create( animFrames, 0.1 ) ;
	}

	// 防御塔：射击 ----------------------------------
	__loadAnimation(
			'towers.shooter'
			, "res/building/tower.plist"
			, "res/building/tower.png"
			, "artillery_lvl4_tesla_00%idx%.png"	// 帧名称模板
			, 49, 65								// 帧名称中的下标的数值范围
			, function(frame){						// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}) ;
	// 子弹火焰 (防御塔：射击) ----------------------------------
	__loadAnimation(
			'towers.shooter.bulletflame'
			, "res/building/tower.plist"
			, "res/building/tower.png"
			, "explosion_air_00%idx%.png"
			, 1, 17
	) ;

	// 蛋白质工厂 ----------------------------------
	__loadAnimation(
			'towers.factory'
			, "res/building/factory.plist"
			, "res/building/factory.png"
			, "artillery_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 22								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}) ;

	// 病毒动画 ----------------------------------
	__loadAnimation(
			'role.virus_a'
			, "res/role/virus.plist"
			, "res/role/virus.png"
			, "golemHead_00%idx%.png"
			, 1, 88) ;
	
	__loadAnimation(
			'towers.factory_molino'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "molino_big_00%idx%.png"		// 帧名称模板
			, 1, 15								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
				    // 矫正一下 图片位置，统一下边界对齐
				    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
				    frame._offset.x = 0 ;
			  });
	
	__loadAnimation(
			'towers.factory_arcane_tower'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "arcane_tower_00%idx%.png"		// 帧名称模板
			, 1, 49								// 帧名称中的下标的数值范围
			
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			 });
	
	//建筑物升级动画
	/*
	__loadAnimation(
			'towers.factory_archer_tower'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "archer_tower_00%idx%.png"		// 帧名称模板
			, 1, 5								// 帧名称中的下标的数值范围
			
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}
				
	) ;
	*/
	
	__loadAnimation(
			'towers.factory_artillery_lvl1'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl1_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  });
	
	__loadAnimation(
			'towers.factory_artillery_lvl2'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_artillery_lvl3'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl3_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_artillery_lvl4_bfg'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl4_bfg_00%idx%.png"		// 帧名称模板
			, 1, 76								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_artillery_lvl4_tesla'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl4_tesla_00%idx%.png"		// 帧名称模板
			, 49, 65								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_barrack_lvl1'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl1_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_barrack_lvl2'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_barrack_lvl3'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl3_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
	
	__loadAnimation(
			'towers.factory_barrack_lvl4_barbarians'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl4_barbarians_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}
	);
	
	__loadAnimation(
			'towers.factory_barrack_lvl4_paladins'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl4_paladins_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			});
}
