yc.ui.editer.PanelPinup = function(editor){

	this.editor = editor ;
	this.ui = editor.ui.find("#panel-pinups") ;
	var panel = this ;

	$('#ipt-pinup-rotation')
		.data({
			transfer:function(val){
				// 旋转：角度转换成弧度
				return (val/180) * Math.PI ;
			}
			, formater: function(val){
				// 旋转：弧度转换成角度
				return (val/Math.PI*180).toFixed(1) ;
			}
		})

	var options = {
		exchanges: {
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
		, onModelChnage: function(pinupScript){
			// 将用户修改的数值，应用到场景里的对象中
			var eleOption = $(this).propslst('selectedOption') ;
			$(eleOption).data('object').initWithScript(pinupScript) ;
		}
	}

	$('#lst-pinup-foreground').propslst(options) ;
	$('#lst-pinup-background').propslst(options) ;
	$('#lst-pinup-perspective').propslst(options) ;



	// 刷新贴图列表
	this.refreshPinups = function(){
		
		var eachfunc = function(pinup,pi){

			return {
				text: "[idx:"+pi+"] " + (pinup._script.img || pinup._script.text)
				, value: pi
				, model: pinup._script
			}
		}

		var scene = cc.Director.getInstance().getRunningScene() ;

		$('#lst-pinup-foreground').html('').propslst('load',[scene.layerFg.getChildren(),eachfunc]) ;
		$('#lst-pinup-background').html('').propslst('load',[scene.layerBg.getChildren(),eachfunc]) ;
		$('#lst-pinup-perspective').html('').propslst('load',[scene.layerPg.getChildren(),eachfunc]) ;
		
		return ;
	}



	this.createPinup = function(type){
		var cam = ins(yc.outer.Camera) ;
		var script = {
			pinups: {}
		} ;
		script.pinups[type] = [{
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
		}] ;

		cc.Director.getInstance().getRunningScene().initWithScript(script) ;

		// 刷新贴图列表
		this.refreshPinups() ;
	}

	this.removePinup = function(layerName){

		var eleOpt = $('#lst-pinup-'+layerName).propslst('selectedOption') ;
		var pinup = $(eleOpt).data('object') ;

		if(!eleOpt || !pinup)
		{
			alert("请选择需要移除的贴图") ;
			return ;
		}
		pinup.removeFromParentAndCleanup() ;

		// 刷新贴图列表
		this.refreshPinups() ;
	}

}