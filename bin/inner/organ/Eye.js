yc.inner.organ.Eye = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		this.range = 10 ;
	}
	, draw: function(ctx){
		if(g_architecture=='native')
		{
			this._super() ;
			return ;
		}
		
		ctx.fillStyle = "rgba(255,0,0,1)" ;
		ctx.beginPath() ;
		ctx.moveTo(this.range,0) ;
		ctx.arc(0,0, this.range, 0, Math.PI*2 , false) ;
		ctx.closePath()
		ctx.fill() ;
	}
});
