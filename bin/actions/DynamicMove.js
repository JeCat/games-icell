/**
 * 可变速的移动 action
 * @class
 * @extends cc.ActionInterval
 */
yc.actions.DynamicMove = cc.Action.extend(/** @lends cc.MoveTo# */{
	/**
	 * @param {Number} duration duration in seconds
	 * @param {cc.Poin} position
	 * @return {Boolean}
	 */
	initWithDestination:function (speed, start, destination, stopCallback) {
		this.start = start ;
		this.destination = destination ;
		
		this.moveX = this.destination[0] - this.start[0] ;
		this.moveY = this.destination[1] - this.start[1] ;
		this.absMoveX = Math.abs(this.moveX) ;
		this.absMoveY = Math.abs(this.moveY) ;
		
		this.initWithSpeed(speed) ;
		
		this.hasMovedX = 0 ;
		this.hasMovedY = 0 ;
		
		this.arrivedX = false ;
		this.arrivedY = false ;
		
		this.stopCallback = stopCallback ;
		
		return true ;
	},
	
	/**
	 * 可重复调用，来改变移动中的物体的移动速度
	 */
	initWithSpeed: function(speed){
		this.speed = speed ;
		this.direction = Math.atan(this.absMoveY/this.absMoveX) ;
		this.speedX = (this.moveX<0? -1: 1) * Math.cos(this.direction) * this.speed ;
		this.speedY = (this.moveY<0? -1: 1) * Math.sin(this.direction) * this.speed ;
	} ,

	/**
	 * @param {Number} time time in seconds
	 */
	step:function (dt) {
		
		this.hasMovedX+= this.speedX*dt ;
		this.hasMovedY+= this.speedY*dt ;
		
		if( this.absMoveX<=Math.abs(this.hasMovedX) )
		{
			this.hasMovedX = this.moveX ;
			this.arrivedX = true ;
		}
		if( this.absMoveY<=Math.abs(this.hasMovedY) )
		{
			this.hasMovedY = this.moveY ;
			this.arrivedY = true ;
		}

		this._target.setPosition( cc.p(this.start[0]+this.hasMovedX, this.start[1]+this.hasMovedY) ) ;

	},
	
	stop: function(){
		this._super() ;
		
		if( typeof(this.stopCallback)!=='undefined' )
		{
			this.stopCallback.func.apply(this.stopCallback.object,this.stopCallback.argvs) ;
		}
	},

	/**
	 * MoveTo reverse is not implemented
	 */
	reverse:function () {
		cc.Assert(0, "moveto reverse is not implemented");
	},

	isDone:function () {
		return this.arrivedX && this.arrivedY ;
	},
});

yc.actions.DynamicMove.create = function (speed,start,destination,stopCallback) {
	var move = new yc.actions.DynamicMove();
	move.initWithDestination(speed, start, destination,stopCallback);
	return move ;
};
