yc.GameLayer = cc.Layer.extend({
	
	onEnter: function(){

		this._super() ;
		
		this.actFadeCellOuter = null ;
		this.actFadeCellInner = null ;
		
		// resize 事件
		yc.event.register(ins(yc.outer.Camera),"resize",this.onResize,this) ;

		// 初始动画：缩放
		this.actScale = cc.ScaleBy.create(1,yc.settings.camera.firstZoom) ;
		this.runAction(this.actScale) ;
	}

	, onExit: function(){
		if( document && document.removeEventListener )
		{ 
			document.removeEventListener('DOMMouseScroll',this.onScrollFunc); 
		}//W3C 
		window.onmousewheel=document.onmousewheel = null ;//IE/Opera/Chrome

		// 移除resize事件
		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;
	}

	, onResize: function(w,h){
		this.setPosition(cc.p(w/2,h/2)) ;
	}
	
	, setScale: function(scalex,scaley){

		// 高于 显示内部视图的缩放比例
		if( yc.settings.camera.switchZoom<scalex && yc.settings.camera.switchZoom>this.getScale() )
		{
			log('显示') ;
			// 显示内部视图
			if(this.actFadeCellInner)
			{
				this._parent.layerPlayer.cell.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeIn.create(0.5) ;
			this._parent.layerPlayer.cell.layerInner.runAction(this.actFadeCellInner) ;

			// 细胞外壳消失
			if(this.actFadeCellOuter)
			{
				this._parent.layerPlayer.cell.shell.stopAction(this.actFadeCellOuter) ;
			}
			this.actFadeCellOuter = cc.FadeTo.create(0.5,yc.settings.camera.shellOpacityLow) ;
			this._parent.layerPlayer.cell.shell.runAction(this.actFadeCellOuter) ;
		}

		// 低于 显示内部视图的缩放比例
		else if( yc.settings.camera.switchZoom>scalex && yc.settings.camera.switchZoom<this.getScale() )
		{
			log('消失') ;
			// 内部视图消失
			if(this.actFadeCellInner)
			{
				this._parent.layerPlayer.cell.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeOut.create(1) ;
			this._parent.layerPlayer.cell.layerInner.runAction(this.actFadeCellInner) ;

			// 显示细胞外壳
			if(this.actFadeCellOuter)
			{
				this._parent.layerPlayer.cell.shell.stopAction(this.actFadeCellOuter) ;
			}
			this.actFadeCellOuter = cc.FadeIn.create(0.5) ;
			this._parent.layerPlayer.cell.shell.runAction(this.actFadeCellOuter) ;
		}
		
			
		this._super(scalex,scaley) ;
	}
}) ;