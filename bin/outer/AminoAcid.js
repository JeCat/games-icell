/*** 氨基酸 ***/
yc.outer.AminoAcid = yc.outer.PhysicalEntity.extend({

	ctor: function(){
		this._super() ;
		
		this.turnRate = yc.settings.outer.aminoacid.turnRate ;
		this.normalSpeed = yc.settings.outer.aminoacid.normalSpeed ;
		this.id = this.constructor.assigned ++ ;
	}
	
	, initRandom: function(range){
		this.initWithScript({
			x: range.left+(0|(Math.random()*range.width))
			, y: range.bottom+(0|(Math.random()*range.height))

			, num: Math.round(Math.random()*20)
			 // red, blue, yellow
			, type: yc.user.AminoAcidPool.types[ 0|(Math.random()*(yc.user.AminoAcidPool.types.length)) ]
		}) ;
	}
	
	, init: function(){
		this.size = 18 + Math.round(this.num/4) ;
		var colors = {red:'255,0,0',blue:'0,0,255',yellow:'255,255,0'}
		this.color = 'rgb(' + colors[this.type] + ')' ;

		// if( this.type == "red"){
		// 	this.initWithFile("res/dashboard/aminoAcid_red.png");
		// }else if( this.type == "blue"){
		// 	this.initWithFile("res/dashboard/aminoAcid_blue.png");
		// }else if( this.type == "yellow"){
		// 	this.initWithFile("res/dashboard/aminoAcid_yellow.png");
		// }
		
		this.initWithCircle(this.size,this.x,this.y,yc.settings.outer.aminoacid.density) ;
	}
		
	, transform: yc.outer.Camera.transformSprite
	, draw: function(ctx){

		this._super(ctx ,true) ;

		if(g_architecture=='native')
		{
			return ;
		}

		
		ctx.fillStyle = this.color ;
		ctx.beginPath();
		ctx.arc(0, 0, this.size, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();

		if(yc.settings.outer.aminoacid.dbgInfo)
		{
			this.drawDbgInfo(ctx) ;
		}
	}
	
	, update: function(dt){

		var cell = ins(yc.outer.Cell) ;
		var dis = yc.util.pointsDis(this.x,this.y,cell.x,cell.y) ;
		if(!this.autoWakeup(dis))
		{
			return ;
		}
		
		// 随机改变方向
		this.mosey(this.normalSpeed) ;
		

		this._super(dt) ;
	}
	
	, catchMe: function(){
		ins(yc.user.Character).aminoacids.increase(this.type,this.num) ;
		
		this.destroy() ;
	}
	
}) ;


yc.outer.AminoAcid.assigned = 0 ;
yc.outer.AminoAcid.className = 'yc.outer.AminoAcid' ;