yc.GameLayer = cc.Layer.extend({
	
	onEnter: function(){

		this._super() ;
		
		this.actFadeCellOuter = null ;
		this.actFadeCellInner = null ;
		
		var layer = this ;
		
		this.onScrollFunc = function(e){
		    e=e || window.event; 
		     
		    if(e.wheelDelta){//IE/Opera/Chrome 
		        var value=e.wheelDelta; 
		    }else if(e.detail){//Firefox 
		        var value=e.detail; 
		    }
		    
		    if(layer.actScale)
		    {
		    	layer.stopAction(layer.actScale)
		    }
		    var scale = 1-value/120*0.3 ;
		    
		    // 一次缩放的速度，不超过3倍
		    if(scale<0.33)
		    {
		    	scale = 0.33 ;
		    }
		    else if(scale>3)
		    {
		    	scale = 3 ;
		    }
		    layer.actScale = cc.ScaleBy.create(0.3,scale) ;
		    layer.runAction(layer.actScale) ;
		}

	    /*注册事件*/ 
	    if( document && document.addEventListener )
	    { 
	        document.addEventListener('DOMMouseScroll',this.onScrollFunc,false); 
	    }//W3C 
	    window.onmousewheel=document.onmousewheel = this.onScrollFunc;//IE/Opera/Chrome 
	    
	}

	, onExit: function(){
	    if( document && document.removeEventListener )
	    { 
	        document.removeEventListener('DOMMouseScroll',this.onScrollFunc); 
	    }//W3C 
	    window.onmousewheel=document.onmousewheel = null ;//IE/Opera/Chrome
	}
	
	, setScale: function(scalex,scaley){

		// 高于 显示内部视图的缩放比例
		if( yc.settings.inner.displayZoom<scalex && yc.settings.inner.displayZoom>this.getScale() )
		{
			log('显示') ;
			// 显示内部视图
			if(this.actFadeCellInner)
			{
				this._parent.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeIn.create(0.5) ;
			this._parent.layerInner.runAction(this.actFadeCellInner) ;

			// 细胞外壳消失
//			if(this.actFadeCellOuter)
//			{
//				this._parent.layerPlayer.cell.stopAction(this.actFadeCellOuter) ;
//			}
//			this.actFadeCellOuter = cc.FadeOut.create(0.5) ;
//			this._parent.layerPlayer.cell.runAction(this.actFadeCellOuter) ;
		}

		// 低于 显示内部视图的缩放比例
		else if( yc.settings.inner.displayZoom>scalex && yc.settings.inner.displayZoom<this.getScale() )
		{
			log('消失') ;
			// 内部视图消失
			if(this.actFadeCellInner)
			{
				this._parent.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeOut.create(0.5) ;
			this._parent.layerInner.runAction(this.actFadeCellInner) ;

			// 显示细胞外壳
//			if(this.actFadeCellOuter)
//			{
//				this._parent.layerPlayer.cell.stopAction(this.actFadeCellOuter) ;
//			}
//			this.actFadeCellOuter = cc.FadeIn.create(0.5) ;
//			this._parent.layerPlayer.cell.runAction(this.actFadeCellOuter) ;
		}
		
			
		this._super(scalex,scaley) ;
		
	}
	
}) ;