yc.inner.CellShell = cc.Sprite.extend({

	ctor: function(cell){
		this._super() ;
		
		this.skin = new yc.inner.CellShell.Skin() ;
		this.skin.init() ;
		this.skin.setOpacity( 0 ) ;

		this.buildings = new cc.Sprite() ;
		this.buildings.init() ;
		this.buildings.setOpacity( 0 ) ;
	}

	, onEnter: function(){
		this._super() ;
		this.addChild(this.skin) ;
		this.addChild(this.buildings) ;
	}

	, onExit: function(){
		this._super() ;
		this.removeChild(this.skin) ;
		this.removeChild(this.buildings) ;
	}

}) ;

yc.inner.CellShell.Skin = cc.Sprite.extend({
	draw: function(ctx){

		this._super(ctx) ;

		ctx.lineCap = "round" ;
		var cell = ins(yc.outer.Cell) ;
		yc.util.drawPolygon(cell._points,ctx,'white',"rgba(255,255,255,0.5)",true) ;
	}
})