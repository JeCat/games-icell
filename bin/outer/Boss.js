yc.outer.Boss = yc.outer.VirusCluster.extend({
	
	lv: 30

	, ctor: function(){
	    this._super() ;
	    this.initWithFile('res/boss-a-48.png') ;
	    
	    this.genes = [] ;
	}

	, _draw: cc.Sprite.prototype.draw
	, draw: function(ctx){
		this._draw(ctx) ;
	} 
    
    , createInnerSprite: function(hexgon){
    	
        var innerCluster = yc.inner.monster.VirusCluster.create(hexgon,1) ;
        var boss = this ;
        
        innerCluster.virusPrototype = {
    		// 根据等级设置能力
        	lv: this.lv
        	, speed: 10
        	, hpFull: this.lv*200
        	, file: 'res/boss-a-24.png'

        	// 直接杀死玩家
        	, attack: function(){
        		yc.inner.Cell.ins().increaseHp(-5) ;
        	}
        
        	// 击杀boss
        	, bekill: function(){
        		ins(yc.ui.DlgRewardGene).show(boss);
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