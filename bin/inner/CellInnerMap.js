yc.inner.CellInnerMap = cc.Layer.extend({  

	__w: 300
	, __h: -200
	
	, x:0
	, y:0
	
	, ctor: function(){
		
		this._super() ;
		
		this.init() ;
		
		this.setAnchorPoint(cc.p(0,0)) ;
		//this.setContentSize(yc.settings.inner.width,yc.settings.inner.height) ;
		//this.initWithColor(new cc.Color4B(255,255,255,50),yc.settings.inner.width,yc.settings.inner.height) ;

		this.setTouchEnabled(true);
		this.touching = false ;
		this.selcted_hexgon = null ;
	}

	, onEnter: function(){
		this._super() ;

		// 细胞质
		for(var i=0;i<cell.cytoplasms.length;i++)
		{
			var cytoplasm = cc.Sprite.create();

			// 创建动画
	        cytoplasm.initWithSpriteFrame(yc.animations.firstFrame('towers.xibaozhi') ); //第一帧
			cytoplasm.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.xibaozhi') ));
			
			this.addChild(cytoplasm);

			cytoplasm.setPosition(cell.cytoplasms[i].center[0]  ,-cell.cytoplasms[i].center[1]);
			cytoplasm.isHexgonBG = true;
		}
		
		// 细胞核
		var xibaohe = cc.Sprite.create();
		// 创建动画
        xibaohe.initWithSpriteFrame(yc.animations.firstFrame('towers.xibaohe') ); //第一帧
		xibaohe.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.xibaohe') ));
		this.addChild(xibaohe);
		xibaohe.isHexgonBG = true;

		// 细胞膜
		for(var i=0;i<cell.membranes.length;i++)
		{
			var membrane = cc.Sprite.create('res/CellMembran.png');
			
			this.addChild(membrane);
			membrane.isHexgonBG = true;
			membrane.setPosition(cell.membranes[i].center[0],-cell.membranes[i].center[1]);
		}

	}
	, onExit:function(){
		this._super() ;

		this.removeAllChildren(true);
	}
	
// 	, draw: function(ctx){//return;
// 		if(g_architecture=='native')
// 		{
// 			this._super() ;
// 			return ;
// 		}
		
// 		var cell = ins(yc.inner.Cell) ;
		
// 		// 画细胞质
// 		for(var i=0;i<cell.cytoplasms.length;i++)
// 		{
// 			this.drawHexgon(cell.cytoplasms[i],ctx, "rgb(200,200,200)",cell.cytoplasms[i].selected? "rgb(180,180,180)":"rgb(150,150,150)") ;
// 		}
		
// 		// 画细胞核
// 		this.drawHexgon(cell.nucleus,ctx,"rgb(50,50,50)","rgb(120,120,120)") ;
		
		
// 		// 画细胞膜
// 		for(var i=0;i<cell.membranes.length;i++)
// 		{
// 			this.drawHexgon(cell.membranes[i],ctx,"rgb(140,140,140)","rgb(170,170,170)") ;
// 		}
		
// //		if(this.touchPoint)
// //		{
// //			ctx.moveTo(0,0) ;
// //			ctx.lineTo(this.touchPoint[0],-this.touchPoint[1]) ;
// //			ctx.stroke() ;
// //		}
// //		if(this.selcted_hexgon)
// //		{
// //			ctx.fillText(this.selcted_hexgon.x+','+this.selcted_hexgon.y,this.touchPoint[0],-this.touchPoint[1]) ;
// //			ctx.fill() ;
// //		}
// 	}
	
// 	, drawHexgon: function(hexgon,ctx,strokeStyle,fillStyle){
		
// 		ctx.beginPath() ;
		
// 		if( typeof(strokeStyle)!='undefined' && strokeStyle )
// 		{
// 			ctx.strokeStyle = strokeStyle ;
// 		}
// 		else
// 		{
// 			strokeStyle = null ;
// 		}
// 		if( typeof(fillStyle)!='undefined' && fillStyle )
// 		{
// 			ctx.fillStyle = fillStyle ;
// 		}
// 		else
// 		{
// 			fillStyle = null ;
// 		}
		
// 		if( !('points' in hexgon) )
// 		{
// 			log(1) ;
// 			return ;
// 		}
// 		ctx.moveTo(hexgon.points.F[0],-hexgon.points.F[1]) ;
		
// 		for(var pName in hexgon.points)
// 		{
// 			ctx.lineTo(hexgon.points[pName][0],-hexgon.points[pName][1]) ;
// 		}
// 		ctx.closePath() ;
		
// 		if(fillStyle)
// 		{
// 			ctx.fill() ;
// 		}
// 		if(strokeStyle)
// 		{
// 			ctx.stroke() ;
// 		}
		
// 		if(yc.settings.dbg)
// 		{
// 			// 坐标
// 			ctx.font="normal 10px san-serif";
// 			ctx.fillStyle = "rgb(100,100,150)" ;
// 			ctx.fillText(hexgon.x+','+hexgon.y,hexgon.center[0]-8,-(hexgon.center[1]-4));
// 		}
		
// 		// 画外边界
		
// 	}
	
// 	, drawHexgonPoint: function(hexgon,ctx,fillStyle){
		
// 		ctx.save() ;
// 		if( typeof(fillStyle)!='undefined' && fillStyle )
// 		{
// 			ctx.fillStyle = fillStyle ;
// 		}
// 		ctx.font="normal 3px san-serif red";
		
// 		for(var pName in hexgon.points)
// 		{
// 			var p = hexgon.points[pName]
// 			ctx.fillText(pName,p[0]-8,p[1]+4);
// 		}
		
// 		ctx.restore() ;
// 	}
	
	, _touchHexgon: function(touches , bTouchMove){

		if(touches.length<1){ return null ; }
		
		var p = yc.util.windowToClient(ins(yc.inner.InnerLayer),touches[0]._point.x,touches[0]._point.y) ;
		
		if(!p){ return null ; }

		//log([touches[0]._point.x,touches[0]._point.y,p[0],p[1]]) ;
		this.touchPoint = p ;
		
		if(this.selcted_hexgon)
		{
			this.selcted_hexgon.selected = false ;
			this.selcted_hexgon = null ;
		}
		
		var hexgon = ins(yc.inner.InnerLayer).cell.aAxes.hexgonByPoint(p[0],p[1],false) ;
		if( hexgon && hexgon.type!==null )
		{
			this.selcted_hexgon = hexgon ;
			if(!bTouchMove){
				this.selcted_hexgon.selected = true ;
			}
		}
		
		return this.selcted_hexgon ;
	}
	
	, onTouchesBegan: function(touches, event){
		
		if( !this._touchHexgon(touches) )
		{
			return undefined ;
		}
		
		this.touching = true ;
		
		return false ;
	}
	
	, onTouchesMoved: function(touches, event){
		return (!this.touching && this._touchHexgon(touches , true))? false: undefined ;
	}
	
	, onTouchesEnded:function (touches, event) {

		this.touching = false ;
		
		if( this._touchHexgon(touches) )
		{
			// 升级
			if(this.selcted_hexgon.building)
			{
				ins(yc.ui.BuildingUpgradeMenu).show(this.selcted_hexgon) ;
			}
			// 新建
			else
			{
				ins(yc.ui.BuildingCreateMenu).show(this.selcted_hexgon) ;
			}
			
			return false ;
		}
		else
		{
			return undefined ;
		}
	}
	
	, transform: cc.Sprite.prototype.transform
});


