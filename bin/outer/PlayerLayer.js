yc.outer.PlayerLayer = cc.Layer.extend({  
      
    ctor: function  () {  
        
        this._super() ;
        
        this.setKeypadEnabled(true);  
        this.setTouchEnabled(true);
        
        //var winSize = cc.Director.getInstance().getWinSize();
        //this.initWithColor(new cc.Color4B(255,255,255,150),winSize.width,winSize.height) ;
        this.setAnchorPoint(cc.p(0,0)) ;
        
        // 细胞
        this.cell = yc.outer.Cell.ins() ;
        this.addChild(this.cell) ;
        
        
        this.followPoint = false ;
    }  
    
    , onTouchesBegan: function(touches, event){
        this.followPoint = true ;
        this.onTouchesMoved(touches, event) ;
        this.cell.run() ;
        log('Began') ;
    }
    , onTouchesMoved: function(touches, event){
        if(this.followPoint)
        {
            var cellPos = yc.outer.Camera.ins().focusOffset() ;
            this.cell.angle = yc.util.radianBetweenPoints(cellPos[0],cellPos[1],touches[0]._point.x,touches[0]._point.y) ;
        }
    }
    , onTouchesEnded:function (touches, event) {
        this.followPoint = false ;
        this.cell.stopRun() ;
    }
    
    , keyUp:function (key) {
        switch(key)
        {
        	// left
        	case 37 :
        		this.cell.stopTurn('left') ;
        		break;
        	
        	// up
        	case 38 :
        		this.cell.stopRun() ;
        		break;
        		
        	// right
        	case 39 :
        		this.cell.stopTurn('right') ;
        		break;
        }
    }
    
    , keyDown:function (key) { 
    	//log(key) ;
        switch(key)
        {
        	// left
        	case 37 :
        		this.cell.turn('left') ;
        		break;
        	
        	// up
        	case 38 :
        		this.cell.run() ;
        		break;
        		
        	// right
        	case 39 :
        		this.cell.turn('right') ;
        		break;
        }
    }
    
    , transform: yc.cocos2d.patchs.Node.transform
});