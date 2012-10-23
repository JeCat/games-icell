yc.outer.PlayerLayer = cc.Layer.extend({  
	  
	ctor: function  () {  
		
		this._super() ;
		
		this.setKeyboardEnabled(true);  
		this.setTouchEnabled(true);
		
		this.setAnchorPoint(cc.p(0,0)) ;
		
		outerCell = this.cell = ins(yc.outer.Cell) ;

		// 初始化细胞内部
		this.cell.layerInner.cell.newborn() ;

		// 初始化细胞外壳
		this.cell.init() ;
		this.cell._followingCamera = ins(yc.outer.Camera) ; // 摄像机跟随
		this.addChild(this.cell) ;
		cellOuter = this.cell ;
		
		this.hMoving = 0 ;
		this.vMoving = 0 ;
		
		this.followPoint = false ;
		this.dontMoving = false ;

		//细胞头部是否面向光标
		this.setNeedFaceToPoint(true) ;
	}

	, onTouchesBegan: function(touches, event){
		if(!this.dontMoving)
		{
			this.followPoint = true ;
			this.cell.run(4) ;
			this.onTouchesMoved(touches, event) ;
		}
	}
	
	, onTouchesMoved: function(touches, event){
		
		var wsize = cc.Director.getInstance().getWinSize() ;
		var radianBetweenPoints = yc.util.radianBetweenPoints(wsize.width/2,wsize.height/2,touches[0]._point.x,touches[0]._point.y) ;

		if(this.getNeedFaceToPoint()){
			this.cell.rotationTarget = radianBetweenPoints;
		}

		if(!this.dontMoving)
		{
			if(this.followPoint)
			{
				this.cell.angle = radianBetweenPoints;
				this.cell.updateVelocity() ;
			}
		}
		
	}
	, onTouchesEnded:function (touches, event) {
		if(!this.dontMoving)
		{
			this.followPoint = false ;
			this.cell.stopRun() ;
		}
	}
	
	, onKeyUp:function (key) {
		switch(key)
		{
			// left
			case 65 : // s
			case 37 :
				var prop = 'hMoving' ;
				var v = -1 ;
				break;
			
			// up
			case 87 : // w
			case 38 :
				var prop = 'vMoving' ;
				var v = 1 ;
				break;
				
			// right
			case 68 : // d
			case 39 :
				var prop = 'hMoving' ;
				var v = 1 ;
				break;

			// down
			case 83 : // s 
			case 40 :
				var prop = 'vMoving' ;
				var v = -1 ;
				break;
		}

		if( this[prop]==v )
		{
			this[prop] = 0 ;
		}

		this.updateCellMoving() ;
	}
	
	, onKeyDown:function (key) {
		switch(key)
		{
			// left
			case 65 : // s
			case 37 :
				this.hMoving = -1 ;
				break;
			
			// up
			case 87 : // w
			case 38 :
				this.vMoving = 1 ;
				break;
				
			// right
			case 68 : // d
			case 39 :
				this.hMoving = 1 ;
				break;

			// down
			case 83 : // s 
			case 40 :
				this.vMoving = -1 ;
				break;
		}

		this.updateCellMoving() ;
	}

	, updateCellMoving: function(){

		if(!this.hMoving&&!this.vMoving)
		{
			this.cell.stopRun() ;
		}
		else
		{
			this.cell.angle = yc.util.radianBetweenPoints(0,0,this.hMoving,this.vMoving) ;
			this.cell.run(4) ;
			this.cell.updateVelocity() ;
		}
	}
	, setNeedFaceToPoint : function(bNeed){
		this.bNeedFaceToPoint = Boolean(bNeed);
	}
	, getNeedFaceToPoint : function(){
		return Boolean( this.bNeedFaceToPoint );
	}
	
	//, transform: yc.cocos2d.patchs.Node.transform
});