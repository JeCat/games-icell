yc.inner.organ.OrganLayer = cc.Sprite.extend({
	ctor: function(){
		this._super() ;
		this.setScale(1/yc.settings.camera.cellInnerZoom) ;
	}
	, assigned: 0
	, draw: function(ctx){
		ctx.rotate(this.getRotation()) ;
		ctx.globalAlpha = this.getOpacity()/255 ;
	}
});
