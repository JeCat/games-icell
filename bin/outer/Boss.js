yc.outer.Boss = yc.outer.VirusCluster.extend({
	
	lv: 30

	, ctor: function(x,y){
	    this._super() ;
	    
        this.initWithPosition(x,y) ;
        this.initWithCircle(15,x,y,yc.settings.outer.virus.density) ;
        this.initWithFile('res/boss-a-48.png') ;

        this.draw = cc.Sprite.prototype.draw ;

	    this.genes = [] ;
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
        		ins(yc.inner.Cell).die() ;
        	}
        
        	// 击杀boss
        	, bekill: function(){
        		ins(yc.ui.DlgRewardGene).show(boss);
        	}
        }
        
		innerCluster.enterCell(hexgon) ;
    }
    
    , touchingCell: function(cell,fixture){
    	
    	this._super(cell,fixture) ;
    	
    	// 从 boss 指南针中回收
        var compass = ins(yc.outer.BossCompass) ;
    	yc.util.arr.remove(compass.arrBosses,this) ;
    }
}) ;