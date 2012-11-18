yc.inner.monster.VirusLayer = cc.Layer.extend({  

	ctor: function(){
		this._super() ;
		this.arrVirus = [] ;

		// 在 js binding 中，需要先 add 一个 child ，才能 getChildren
		var c = new cc.Sprite ;
		this.addChild(c) ;
		this.removeChild(c,true) ;

	}
	
	/**
	 * 创建一个病毒sprite
	 */
	, createVirusSprite: function(strength){
		var virus = yc.op.ins(yc.inner.monster.Virus).ob() ;
		
		this.addChild(virus) ;
		this.arrVirus.push(virus) ;
		
		return virus ;
	}
	/**
	 * 创建一个病毒sprite
	 */
	, removeVirusSprite: function(virus){
		
		yc.util.arr.remove(this.arrVirus,virus) ;
		
		this.removeChild(virus) ;
		yc.op.ins(yc.inner.monster.Virus).free(virus) ;
	}
 
	
}) ;

