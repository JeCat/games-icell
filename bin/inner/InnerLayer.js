yc.inner.InnerLayer = cc.Sprite.extend({
	
	ctor: function(){
		
		this._super() ;

		this.setAnchorPoint(cc.p(0.5,0.5)) ;

		this.setScale(1/yc.settings.camera.cellInnerZoom) ;

		// 细胞
		this.cell = ins(yc.inner.Cell) ;
		
		// 层：细胞地图
		this.map = ins(yc.inner.CellInnerMap) ;
		this.addChild(this.map) ;
		
		// 层：建筑
		this.buildings = new yc.inner.building.BuildingLayer() ;
		this.addChild(this.buildings) ;
		
		// 层：病毒
		this.layerVirus = ins(yc.inner.monster.VirusLayer) ;
		this.addChild(this.layerVirus) ;
	}
	
	
	, touchVirusCluster: function(radian,strength){
		// 计算病毒群接触到的六边形格子
		// 比较出最接近 接触点弧度的 细胞膜
		var minRd = 10 ;
		var touchingHexgon = null ;
		for(var i=0;i<this.cell.membranes.length;i++)
		{
			var r = Math.abs(this.cell.membranes[i].radianToNucleus() - radian) ;
			
			if(r<minRd)
			{
				minRd = r ;
				touchingHexgon = this.cell.membranes[i] ;
			}
		}
		
		return touchingHexgon ;
	}
//	
//	, _setScale: cc.Layer.prototype.setScale
//	, setScale: function(scale,scaleY)
//	{
//		this._setScale(scale,scaleY) ;
//		this.locate() ;		
//	}
//	
//	, locate: function(){
//
//		
//		return  ;
//		
//		var dplW = 0|(size.width * this._scaleX) ;
//		var dplH = 0|(size.height * this._scaleY) ;
//		
//		var wSize = cc.Director.getInstance().getWinSize() ;
//		
//		this.setPosition(cc.p(wSize.width-dplW-10,wSize.height-dplH-10));
//		//this.setPosition(cc.p(0,0)) ;   
//		 
//		// 横向屏幕
////		if(wSize.height<wSize.width)
////		{
////			//ins(yc.outer.Camera).setFocus( 0|((wSize.width-dplW-10)/2), 0|(wSize.height/2) ) ;
////		}
////		// 纵向屏幕
////		else
////		{
////		   // ins(yc.outer.Camera).setFocus( 0|(wSize.width/2), 0|((wSize.height-dplH-10)/2) ) ;
////		}
//		
//	}
	
	//, transform: yc.cocos2d.patchs.Node.transform
	

	, draw: function(ctx){
		ctx.rotate(this.getRotation()) ;
		ctx.globalAlpha = this.getOpacity()/255 ;
	}
	
}) ;

