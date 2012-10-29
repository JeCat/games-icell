yc.outer.Bottles = yc.outer.PhysicalEntity.extend({  
	ctor : function(){
		this._super();
	},
	
	create: function()
	{
		this.initWithFile("res/organ/Bullet.png");
		this.initWithCircle(5,this.x,this.y,yc.settings.outer.aminoacid.density) ;
	},
	draw: function( ctx){
		this._super( ctx, true);
	}
	
}) ;

