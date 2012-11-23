yc.animations = {
	frames: {}
}

yc.animations.createAction = function(name){
	var animation = cc.AnimationCache.getInstance().getAnimation(name);
	return cc.Animate.create( animation ) ;
}

yc.animations.firstFrame = function(spriteName){
	return cc.AnimationCache.getInstance().getAnimation(spriteName).getFrames()[0].getSpriteFrame() ;
}

yc.animations.initBuildinAnimations = function (){

	/**
	 * 加载帧序列
	 */
	function __loadAnimation(name,plist,png,frameNameTemp,idxStart,idxEnd,callback,framerate){
		
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

			if(callback!==undefined && callback){
				callback(frame) ;
			}

			animFrames.push(frame);
		}

		var animation = cc.Animation.create(animFrames,framerate||0.1);
		yc.animations.frames[name] = animation ;
		cc.AnimationCache.getInstance().addAnimation(animation,name);
	}

	// 防御塔：射击 ----------------------------------
	__loadAnimation(
			'towers.shooter'
			, "res/building/tower.plist"
			, "res/building/tower.png"
			, "artillery_lvl4_tesla_00%idx%.png"	// 帧名称模板
			, 49, 65								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn) ;
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
			, yc.animations.adjustFrameBtn) ;

	// 病毒动画 ----------------------------------
	__loadAnimation(

			'role.virus_a'
			, "res/role/virus.plist"
			, "res/role/virus.png"
			, "golemHead_00%idx%.png"
			, 1, 88) ;

	__loadAnimation(
			'building.molino'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "molino_big_00%idx%.png"		// 帧名称模板
			, 1, 15								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_arcane_tower'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "arcane_tower_00%idx%.png"		// 帧名称模板
			, 1, 49								// 帧名称中的下标的数值范围
			
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_artillery_lvl1'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl1_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_artillery_lvl2'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_artillery_lvl3'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl3_00%idx%.png"		// 帧名称模板
			, 1, 35								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_artillery_lvl4_bfg'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl4_bfg_00%idx%.png"		// 帧名称模板
			, 1, 76								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_artillery_lvl4_tesla'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "artillery_lvl4_tesla_00%idx%.png"		// 帧名称模板
			, 49, 65								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_barrack_lvl1'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl1_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_barrack_lvl2'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_barrack_lvl3'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl3_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_barrack_lvl4_barbarians'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl4_barbarians_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.factory_barrack_lvl4_paladins'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "barrack_lvl4_paladins_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	__loadAnimation(
			'towers.elfTower'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "elfTower_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			/*, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}*/);
	
	__loadAnimation(
			'towers.mage_lvl1'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "mage_lvl1_00%idx%.png"		// 帧名称模板
			, 1, 11								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.mage_lvl2'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "mage_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 11								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.mage_lvl3'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "mage_lvl3_00%idx%.png"		// 帧名称模板
			, 1, 11								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.sorcerer_tower'
			, "res/building/build.plist"
			, "res/building/build.png"
			, "sorcerer_tower_00%idx%.png"		// 帧名称模板
			, 1, 11								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	
	//病毒
	__loadAnimation(
			'role.demonFlying_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "demonFlying_00%idx%.png"		// 帧名称模板
			, 1, 14								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.demonFlying_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "demonFlying_00%idx%.png"		// 帧名称模板
			, 29, 42								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.demonWolf_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "demonWolf_00%idx%.png"		// 帧名称模板
			, 1, 10								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.demonWolf_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "demonWolf_00%idx%.png"		// 帧名称模板
			, 21, 29								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.gargoyle_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "gargoyle_00%idx%.png"		// 帧名称模板
			, 1, 13								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.gargoyle_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "gargoyle_00%idx%.png"		// 帧名称模板
			, 29, 41 								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.rotten_spider_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "rotten_spider_00%idx%.png"		// 帧名称模板
			, 1, 13								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.rotten_spider_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "rotten_spider_00%idx%.png"		// 帧名称模板
			, 27, 39								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.rotten_thing_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "rotten_thing_00%idx%.png"		// 帧名称模板
			, 1, 24								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.rotten_thing_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "rotten_thing_00%idx%.png"		// 帧名称模板
			, 49, 71 								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.sheep_flying_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "sheep_flying_00%idx%.png"		// 帧名称模板
			, 1, 10								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.spider_small_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "spider_small_00%idx%.png"		// 帧名称模板
			, 1, 9								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.spider_small_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "spider_small_00%idx%.png"		// 帧名称模板
			, 19, 27								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.winterwolf_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "winterwolf_00%idx%.png"		// 帧名称模板
			, 1, 10								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.winterwolf_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "winterwolf_00%idx%.png"		// 帧名称模板
			, 21, 29								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.worg_right'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "worg_00%idx%.png"		// 帧名称模板
			, 1, 10								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.worg_front'
			, "res/role/role.plist"
			, "res/role/role.png"
			, "worg_00%idx%.png"		// 帧名称模板
			, 21, 29								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	//Boss
	__loadAnimation(
			'role.boss_veznan_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "boss_veznan_0%idx%.png"		// 帧名称模板
			, 244, 269								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.boss_veznan_front'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "boss_veznan_0%idx%.png"		// 帧名称模板
			, 271, 293								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossJuggernaut_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "bossJuggernaut_00%idx%.png"		// 帧名称模板
			, 1, 23								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossRotten_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "BossRotten_00%idx%.png"		// 帧名称模板
			, 5, 15								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossRotten_front'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "BossRotten_00%idx%.png"		// 帧名称模板
			, 17, 31								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossforest_troll_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "forest_troll_00%idx%.png"		// 帧名称模板
			, 1, 25								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossforest_troll_front'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "forest_troll_00%idx%.png"		// 帧名称模板
			, 50, 72								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	
	__loadAnimation(
			'role.bosssasquash_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "sasquash_00%idx%.png"		// 帧名称模板
			, 1, 27								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	__loadAnimation(
			'role.bossyeti_right'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "yeti_00%idx%.png"		// 帧名称模板
			, 1, 25								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);
	
	
	__loadAnimation(
			'role.bossyeti_front'
			, "res/role/boss.plist"
			, "res/role/boss.png"
			, "yeti_00%idx%.png"		// 帧名称模板
			, 50, 72								// 帧名称中的下标的数值范围
			/*
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			  }*/);

	// 烟雾
	__loadAnimation(
			'tower.smoke_a'
			, "res/smoke.plist"
			, "res/smoke.png"
			, "decal_smoke_hitground_00%idx%.png"
			, 1, 11) ;
	__loadAnimation(
			'tower.smoke_b'
			, "res/smoke.plist"
			, "res/smoke.png"
			, "explosion_shrapnel_00%idx%.png"
			, 1, 20) ;
	__loadAnimation(
			'tower.smoke_c'
			, "res/smoke.plist"
			, "res/smoke.png"
			, "fx_rifle_smoke_00%idx%.png"
			, 1, 10) ;
	__loadAnimation(
			'tower.smoke_d'
			, "res/smoke.plist"
			, "res/smoke.png"
			, "fx_smoke_hitground_00%idx%.png"
			, 1, 13 ) ;
	
	//新添加动画
	__loadAnimation(
			'towers.factory_jiasu'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "jiasu_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.factory_gong'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "gong_00%idx%.png"		// 帧名称模板
			, 1, 3								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.factory_pao'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "pao_00%idx%.png"		// 帧名称模板
			, 1, 4								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.factory_huishou'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "huishou_00%idx%.png"		// 帧名称模板
			, 1, 2								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.daodan'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "daodan_00%idx%.png"		// 帧名称模板
			, 1, 2								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.tuijinqi'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "tuijinqi_00%idx%.png"		// 帧名称模板
			, 1, 3								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.ping'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "ping_00%idx%.png"		// 帧名称模板
			, 1, 3								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.reinforce_C0_right'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "reinforce_C0_00%idx%.png"		// 帧名称模板
			, 1, 7								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
	__loadAnimation(
			'towers.yan'
			, "res/building/addbuild.plist"
			, "res/building/addbuild.png"
			, "y_00%idx%.png"		// 帧名称模板
			, 1, 21								// 帧名称中的下标的数值范围
			, yc.animations.adjustFrameBtn);
}

yc.animations.adjustFrameBtn = function(frame){
    // 矫正一下 图片位置，统一下边界对齐
    var offset = frame.getOffset() ;
    offset.y = - (frame.getOriginalSize().height - frame.getRect().height)/2 ;
    offset.x = 0 ;
    frame.setOffset(offset) ;
}
