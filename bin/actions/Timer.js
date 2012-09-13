
yc.actions.Timer = cc.DelayTime.extend(/** @lends cc.MoveTo# */{
    /**
     * @param {Number} duration duration in seconds
     * @param {cc.Poin} position
     * @return {Boolean}
     */
    initWithCallback:function (sec, times, cbOb, cbFunc, cbArgvs) {
	
		this.initWithDuration(sec) ;
		
		this.times = times ;
		this.got = 0 ;
		
		this.cbOb = cbOb ;
		this.cbFunc = cbFunc ;
		this.cbArgvs = cbArgvs ;
        
        return true ;
    },

    /**
     * @param {Number} time time in seconds
     */
    update:function (t) {
    	if(t>=1)
    	{
	    	this.got ++ ;
	    	this.cbFunc.apply(this.cbOb,this.cbArgvs) ;
	    	this._firstTick = true ;
    	}
    	return true ;
    },
    
    isDone: function(){
    	return this.times == this.got ;
    },

    /**
     * MoveTo reverse is not implemented
     */
    reverse:function () {
        cc.Assert(0, "moveto reverse is not implemented");
    }
});

yc.actions.Timer.create = function (sec, times, cbOb, cbFunc, cbArgvs) {
    var timer = new yc.actions.Timer();
    timer.initWithCallback(sec, times, cbOb, cbFunc, cbArgvs);
    return timer ;
};
