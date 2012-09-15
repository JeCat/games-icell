yc.outer.PlayerLayer = cc.Layer.extend({  
      
    ctor: function  () {  
        
        this._super() ;
        
        this.setKeyboardEnabled(true);  
        this.setTouchEnabled(true);
        
        this.setAnchorPoint(cc.p(0,0)) ;
	    
        // 细胞
        outerCell = this.cell = ins(yc.outer.Cell) ;
        this.cell.init() ;
        this.addChild(this.cell) ;
        cellOuter = this.cell ;
        
        
        
        this.followPoint = false ;
    }

    , onTouchesBegan: function(touches, event){
        this.followPoint = true ;
        this.cell.run(4) ;
        this.onTouchesMoved(touches, event) ;
    }
    
    , onTouchesMoved: function(touches, event){
        
        var wsize = cc.Director.getInstance().getWinSize() ;
        this.cell.rotationTarget = yc.util.radianBetweenPoints(wsize.width/2,wsize.height/2,touches[0]._point.x,touches[0]._point.y) ;

        if(this.followPoint)
        {
            this.cell.angle = this.cell.rotationTarget ;
            this.cell.updateVelocity() ;
        }
        
    }
    , onTouchesEnded:function (touches, event) {
        this.followPoint = false ;
        //this.cell.stopDriving() ;
        this.cell.stopRun() ;
    }
    
    , onKeyUp:function (key) {
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
    
    , onKeyDown:function (key) { 
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