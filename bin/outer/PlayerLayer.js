yc.outer.PlayerLayer = cc.Layer.extend({  
      
    ctor: function  () {  
        
        this._super() ;
        
        this.setKeyboardEnabled(true);  
        this.setTouchEnabled(true);
        
        //var winSize = cc.Director.getInstance().getWinSize();
        //this.initWithColor(new cc.Color4B(255,255,255,150),winSize.width,winSize.height) ;
        this.setAnchorPoint(cc.p(0,0)) ;
        
        // 细胞
        outerCell = this.cell = ins(yc.outer.Cell) ;
        this.cell.initWithCircle(10,0,0) ;
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
        if(this.followPoint)
        {
            var cellPos = ins(yc.outer.Camera).offsetFocus() ;
            
            //var radian = yc.util.radianBetweenPoints(cellPos[0],cellPos[1],touches[0]._point.x,touches[0]._point.y) ;
            //this.cell.drive(radian) ;
            
            this.cell.angle = yc.util.radianBetweenPoints(cellPos[0],cellPos[1],touches[0]._point.x,touches[0]._point.y) ;
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