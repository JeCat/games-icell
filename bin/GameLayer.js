yc.GameLayer = cc.Layer.extend({
	
	ctor: function(){

		this._super() ;
		
		this.actFadeCellOuter = null ;
		this.actFadeCellInner = null ;
		this.actFadeCellOrgan = null ;
		
	}

	, onEnter: function(){
		this._super() ;

		// resize 事件
		yc.event.register(ins(yc.outer.Camera),"resize",this.onResize,this) ;

		// 初始动画：缩放
		this.actScale = cc.ScaleBy.create(1,yc.settings.camera.firstZoom) ;
		this.runAction(this.actScale) ;
	}

	, onExit: function(){
		this._super() ;

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
			// log('显示') ;
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
			
			// 外部器官半透明
			if( this.actFadeCellOrgan ){
				this._parent.layerPlayer.cell.shell.stopAction( this.actFadeCellOrgan );
			}
			this.actFadeCellOrgan = cc.FadeTo.create(0.5,yc.settings.camera.organOpacityLow);
			this._parent.layerPlayer.cell.shell.runAction( this.actFadeCellOrgan );
		}

		// 低于 显示内部视图的缩放比例
		else if( yc.settings.camera.switchZoom>scalex && yc.settings.camera.switchZoom<this.getScale() )
		{
			// log('消失') ;
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
			
			// 显示外部器官
			if( this.actFadeCellOrgan ){
				this._parent.layerPlayer.cell.shell.stopAction( this.actFadeCellOrgan );
			}
			this.actFadeCellOrgan = cc.FadeIn.create(0.5);
			this._parent.layerPlayer.cell.shell.runAction( this.actFadeCellOrgan );
		}
		
			
		this._super(scalex,scaley) ;
	}

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