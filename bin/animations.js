yc.animations = {}

yc.animations.createAction = function(name){
	return cc.Animate.create( yc.animations[name] ) ;
}

yc.animations.initBuildinAnimations = function (){

	/**
	 * 加载帧序列
	 */
	function __loadAnimation(plist,png,frameNameTemp,idxStart,idxEnd,callback){
		
		var spriteFrameCache = cc.SpriteFrameCache.getInstance();
		spriteFrameCache.addSpriteFrames(plist,png) ;

		var animFrames = [];
		for (var i = idxStart; i <= idxEnd; i++) {

			// str = "artillery_lvl4_tesla_00" + (i<10?'0':'') + i + ".png";
			var name = frameNameTemp.replace("%idx%",(i<10?'0':'') + i) ;

			var frame=spriteFrameCache.getSpriteFrame(name);
			if( !frame ){
				continue ;
			}

			if(callback!==undefined){
				callback(frame) ;
			}

			animFrames.push(frame);
		}

		return cc.Animation.create( animFrames, 0.1 ) ;
	}

	// 防御塔：射击 ----------------------------------
	yc.animations['towers.shooter'] = __loadAnimation(
			"res/building/tower.plist"
			, "res/building/tower.png"
			, "artillery_lvl4_tesla_00%idx%.png"	// 帧名称模板
			, 49, 65								// 帧名称中的下标的数值范围
			, function(frame){						// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}) ;
	// 子弹火焰 (防御塔：射击) ----------------------------------
	yc.animations['towers.shooter.bulletflame'] = __loadAnimation(
			"res/building/tower.plist"
			, "res/building/tower.png"
			, "explosion_air_00%idx%.png"
			, 1, 17
	) ;

	// 蛋白质工厂 ----------------------------------
	yc.animations['towers.factory'] = __loadAnimation(
			"res/building/factory.plist"
			, "res/building/factory.png"
			, "artillery_lvl2_00%idx%.png"		// 帧名称模板
			, 1, 22								// 帧名称中的下标的数值范围
			, function(frame){					// 处理每帧的回调函数（可选）
			    // 矫正一下 图片位置，统一下边界对齐
			    frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
			    frame._offset.x = 0 ;
			}) ;

	// 病毒动画 ----------------------------------
	yc.animations['role.virus_a'] = __loadAnimation(
			"res/role/virus.plist"
			, "res/role/virus.png"
			, "golemHead_00%idx%.png"
			, 1, 88) ;
}
