yc.outer.Camera = function(aSenceOuter)
{
	this.aSenceOuter = aSenceOuter ;
	
	this.$ = $('#gameCanvas') ;
	this.ele = this.$[0] ;
	
	
	var aCamera = this ;
	this.onresize = function()
	{
		aCamera.$
			.css({left:0,top:0})
			.width($(window).width())
			.height($(window).height())
			.attr({
				width: $(window).width()
				, height: $(window).height()
			}) ;
			
		$('#Cocos2dGameContainer')
			.css({left:0,top:0})
			.width($(window).width())
			.height($(window).height()) ;
			
			
		// log(this.aSenceOuter._scaleX) ;
		
		//cc.Director.getInstance().reshapeProjection( cc.size( $(window).width(),$(window).height() ) ) ;
		var screenSize = cc.Director.getInstance().getWinSizeInPixels () ;
		screenSize.width = $(window).width() ;
		screenSize.height = $(window).height() ;
		
			cc.renderContext = $('#gameCanvas')[0].getContext('2d') ;
		log('resize') ;
		//log(this.aSenceOuter.getContentSize()) ;
		
	}
	$(window).resize(this.onresize) ;
	this.onresize() ;
}


