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
        
        // 测试坐标
        var cell2 = new yc.outer.Cell() ;
        this.addChild(cell2) ;
        cell2.setPosition(cc.p(100,100)) ;
        cell2.x = 100 ;
        cell2.y = 100 ;
        
        var cell2 = new yc.outer.Cell() ;
        this.addChild(cell2) ;
        cell2.x = -100 ;
        cell2.y = 80 ;
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