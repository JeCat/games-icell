yc.GameLayer = cc.Layer.extend({
	
	ctor: function(){

		this._super() ;
		
		this.actFadeCellInner = null ;
		this.actFadeCellOuterSkin = null ;
		this.actFadeCellOuterBuildings = null ;
		
	}

	, onEnter: function(){
		this._super() ;

		// resize 事件
		yc.event.register(ins(yc.outer.Camera),"resize",this.onResize,this) ;
		var wsize = cc.Director.getInstance().getWinSize() ;
		this.onResize(wsize.width,wsize.height) ;

		// 初始动画：缩放
		if(g_architecture=='native')
		{
			this.actScale = cc.ScaleBy.create(1,0.1) ;
		}
		else
		{
			this.actScale = cc.ScaleBy.create(1,yc.settings.camera.firstZoom) ;
		}

		this.runAction(this.actScale) ;
	}

	, onExit: function(){
		this._super() ;

		// 移除resize事件
		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;
	}

	, onResize: function(w,h){
		//this.setPosition(cc.p(0,0)) ;
		this.setPosition(cc.p(w/2,h/2)) ;
	}
	
	, setScale: function(scalex,scaley){

		var outerCell = ins(yc.outer.Cell) ;

		// 高于 显示内部视图的缩放比例
		if( yc.settings.camera.switchZoom<scalex && yc.settings.camera.switchZoom>this.getScale() )
		{
			// log('显示') ;
			// 显示内部视图
			if(this.actFadeCellInner)
			{
				outerCell.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeIn.create(0.5) ;
			outerCell.layerInner.runAction(this.actFadeCellInner) ;

			// 细胞外壳消失
			if(this.actFadeCellOuterSkin)
			{
				outerCell.shell.skin.stopAction(this.actFadeCellOuterSkin) ;
			}
			this.actFadeCellOuterSkin = cc.FadeTo.create(0.5,0) ;
			outerCell.shell.skin.runAction(this.actFadeCellOuterSkin) ;
			
			// 外部器官半透明
			if( this.actFadeCellOuterBuildings ){
				outerCell.shell.buildings.stopAction(this.actFadeCellOuterBuildings) ;
			}
			this.actFadeCellOuterBuildings = cc.FadeTo.create(0.5,yc.settings.camera.outerBuildingOpacityLow);
			outerCell.shell.buildings.runAction( this.actFadeCellOuterBuildings );
		}

		// 低于 显示内部视图的缩放比例
		else if( yc.settings.camera.switchZoom>scalex && yc.settings.camera.switchZoom<this.getScale() )
		{
			// log('消失') ;
			// 内部视图消失
			if(this.actFadeCellInner)
			{
				outerCell.layerInner.stopAction(this.actFadeCellInner) ;
			}
			this.actFadeCellInner = cc.FadeOut.create(1) ;
			outerCell.layerInner.runAction(this.actFadeCellInner) ;

			// 显示细胞外壳
			if(this.actFadeCellOuterSkin)
			{
				outerCell.shell.skin.stopAction(this.actFadeCellOuterSkin) ;
			}
			this.actFadeCellOuterSkin = cc.FadeIn.create(0.5) ;
			outerCell.shell.skin.runAction(this.actFadeCellOuterSkin) ;
			
			// 显示外部器官
			if( this.actFadeCellOuterBuildings ){
				outerCell.shell.buildings.stopAction( this.actFadeCellOuterBuildings );
			}
			this.actFadeCellOuterBuildings = cc.FadeIn.create(0.5);
			outerCell.shell.buildings.runAction( this.actFadeCellOuterBuildings );
		}
		
		this._super(scalex,scaley) ;


		var cam = ins(yc.outer.Camera) ;
		cam.moveByFocus(cam.x,cam.y) ;
	}

	// , draw: function(ctx) {
	// 	// c = "rgba(122,200,214,1)" ;
	// 	// var wsize = cc.Director.getInstance().getWinSize() ;
	// 	// yc.util.drawLine([-wsize.width,0],[wsize.width,0],ctx,c) ;
	// 	// yc.util.drawLine([0,-wsize.height],[0,wsize.height],ctx,c) ;
	// }
	
	// , draw: function(ctx){

	// 	var cell = ins(yc.outer.Cell) ;
	// 	var speed = cell.getSpeed() ;
	// 	var vector = {
	// 		x: -speed.x
	// 		, y: -speed.y
	// 	}
 
	// 	yc.util.drawLine([0,0],[vector.x*100,vector.y*100],ctx,"red",true) ;

	// 	// 
	// 	var innerVector = yc.util.ratateVector(vector,-cell.getRotation()) ;
	// 	var a = [0,0] ;
	// 	var b = [ innerVector.x*500, innerVector.y*500 ] ;


	// 	for( var i=0;i<cell._points.length;i++ )
	// 	{
	// 		var c = cell._points[i] ;
	// 		var d = (i<cell._points.length-1)? cell._points[i+1]: cell._points[0] ;

	// 		var point = yc.util.segmentsIntr(a,b,c,d) ;
	// 		if(!point)
	// 		{
	// 			continue ;
	// 		}

	// 		ctx.save() ;
	// 		ctx.rotate(cell.getRotation()) ;
	// 		yc.util.drawCircle(ctx,point[0],point[1],5,5,"red") ;
	// 		ctx.restore() ;
	// 	}

	// }
}) ;