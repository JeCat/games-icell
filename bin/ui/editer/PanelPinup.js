yc.ui.editer.PanelPinup = function(editor){

	this.editor = editor ;
	this.ui = editor.ui.find("#panel-pinups") ;
	var panel = this ;

	var selectedPinup = null ;
	var props = {
		x: 'ipt-pinup-x'
		, y: 'ipt-pinup-y'
		, anchorX: 'ipt-pinup-anchor-x'
		, anchorY: 'ipt-pinup-anchor-y'
		, rotation: 'ipt-pinup-rotation'
		, opacity: 'ipt-pinup-opacity'
		, scaleX: 'ipt-pinup-scale-x'
		, scaleY: 'ipt-pinup-scale-y'
		, img: 'ipt-pinup-img-url'
		, text: 'ipt-pinup-text'
		, textStyle: "ipt-pinup-text-style"
		, textColor: "ipt-pinup-text-color"
		, tile: "ipt-pinup-tile"
		, tileWidth: "ipt-pinup-tile-width"
		, tileHeight: "ipt-pinup-tile-height"
		, mosey: "ipt-pinup-mosey"
		, moseySpeed: "ipt-pinup-mosey-speed"
		, parallax: "ipt-pinup-parallax"
	}

	// 定义事件
	var onChangeProps = function(){
		if(!selectedPinup)
		{
			return ;
		}
		for(var key in props)
		{
			var ipt = panel.ui.find('#'+props[key]) ;

			// checkbox 类型
			if( ipt.attr('type') == 'checkbox' )
			{
				selectedPinup._script[key] = ipt.attr('checked')=='checked'? true: false ;
			}
			// text 类型
			else
			{
				var val = ipt.val() ;
				if(ipt.attr('format')=='int')
				{
					val = parseInt(val) ;
				}
				else if(ipt.attr('format')=='float')
				{
					val = parseFloat(val) ;
				}
				selectedPinup._script[key] = val ;
			}
		}

		// 旋转：角度转换成弧度
		selectedPinup._script.rotation = (selectedPinup._script.rotation/180) * Math.PI ;

		// 重新初始化
		selectedPinup.initWithScript(selectedPinup._script) ;

		panel.refreshPinups() ;
	}
	// 绑定事件
	for(var key in props)
	{
		panel.ui.find('#'+props[key]).change(onChangeProps) ;
	}



	// 刷新贴图列表
	this.refreshPinups = function(){
		
		var eachfunc = function(pinup,pi){

			selectedPinup = pinup ;

			return {
				text: "[idx:"+pi+"] " + (pinup._script.img || pinup._script.text)
				, value: pi
				, click: function(pinup){

					selectedPinup = pinup ;

					for(var n in {foreground:null,background:null,perspective:null})
					{
						if( n!=pinup._script.layer )
						{
							panel.ui.find('#lst-pinup-'+n)[0].selectedIndex = -1 ;
						}
					}

					for(var key in props)
					{
						var ipt = panel.ui.find('#'+props[key]) ;

						// checkbox 类型
						if( ipt.attr('type') == 'checkbox' )
						{
							ipt.attr('checked', pinup._script[key]? 'checked': false ) ;
						}
						// text 类型
						else
						{
							ipt.val(pinup._script[key]) ;
						}
					}

					// 旋转：弧度转换成角度
					$('#ipt-pinup-rotation').val( (pinup._script['rotation']/Math.PI*180).toFixed(2) ) ;
				}
			}
		}
		yc.ui.editer.WorldEditer.loadOptions(this.ui.find('#lst-pinup-foreground'),scene.layerFg.getChildren(),eachfunc) ;
		yc.ui.editer.WorldEditer.loadOptions(this.ui.find('#lst-pinup-background'),scene.layerBg.getChildren(),eachfunc) ;
		yc.ui.editer.WorldEditer.loadOptions(this.ui.find('#lst-pinup-perspective'),scene.layerPg.getChildren(),eachfunc) ;
	}



	this.createPinup = function(type){
		var cam = ins(yc.outer.Camera) ;
		cc.Director.getInstance().getRunningScene().initWithScript({
			pinups: [{
				layer: type
				, x: cam.x
				, y: cam.y
				, anchorX: 0.5
				, anchorY: 0.5
				, rotation: 0
				, opacity: 255
				, scaleX: 1
				, scaleY: 1
				// , img: "http://png-4.findicons.com/files/icons/327/red_little_shoes/96/recyclebin_1_empty.png"
				, img: "res/null-pinup.png"
				, text: null
				, textStyle: "normal 16px san-serif"
				, textColor: "0,0,0,1"
				, moseySpeed: 5
				, parallax: yc.settings.outer.defaultParallax[type]
			}]
		}) ;

		// 刷新贴图列表
		this.refreshPinups() ;
	}

	this.removePinup = function(){
		if(!selectedPinup)
		{
			alert("请选择需要移除的贴图") ;
		}
		selectedPinup.removeFromParentAndCleanup() ;

		// 刷新贴图列表
		this.refreshPinups() ;
	}


	this.refreshPinups() ;
}