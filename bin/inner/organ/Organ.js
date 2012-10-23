yc.inner.organ.Organ = cc.Sprite.extend({
	ctor: function(){
		this.hexgon = null;
		this._isBlocking = false;
	}
	, isBlocking: function(){
		return this._isBlocking ;
	}
});
