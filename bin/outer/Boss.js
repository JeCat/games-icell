yc.outer.Boss = yc.outer.VirusCluster.extend({
	
	lv: 30

	, draw: function(ctx){
        ctx.fillStyle = 'red' ;
        ctx.fillText('ˋ﹏ˊ',0,0) ;
    }
    
    , createInnerSprite: function(hexgon){
    	
        var innerCluster = yc.inner.monster.VirusCluster.create(hexgon,1) ;
        
        innerCluster.virusPrototype = {
    		// 根据等级设置能力
        	lv: this.lv
        	, speed: 10
        	, hpFull: this.lv*200
        	
        	// 直接杀死玩家
        	, attack: function(){
        		yc.inner.Cell.ins().die() ;
        	}
        }
        
		innerCluster.enterCell(hexgon) ;
    }
    
    , _touchingCell: yc.outer.VirusCluster.prototype.touchingCell 
    , touchingCell: function(cell){
    	
    	this._touchingCell(cell) ;
    	
    	// 从 boss 指南针中回收
        var compass = yc.outer.BossCompass.ins() ;
    	yc.util.arr.remove(compass.arrBosses,this) ;
    }
}) ;