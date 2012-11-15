
if(typeof("log")=="undefined")
{
	function log(message){
		console.log.apply(console,arguments) ;
	}
}


yc.dbg = {} ;
yc.dbg.canvasContextWapper = function (ctx){

	for(var k in ctx)
	{
		if( typeof(ctx[k])=='function' )
		{
			this[k] = function(){

				yc.event.trigger(this,"before_"+arguments.callee.originName,arguments) ;

				var ret = arguments.callee.origin.apply(ctx,arguments) ;

				yc.event.trigger(this,"after_"+arguments.callee.originName,arguments) ;

				return ret ;
			}
			this[k].origin = ctx[k] ;
			this[k].originName = k ;
		}
	}
}

yc.dbg.canvasContextWapper.create = function(){
	return cc.renderContext = new yc.dbg.canvasContextWapper(cc.renderContext) ;
}
