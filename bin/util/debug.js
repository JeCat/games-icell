
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

function here(){
	try{
		throw new Error() ;
	}
	catch(e){

		if( g_architecture=='html5' )
		{
			var res = e.stack.split("\n")[2].match(/^\s+at( (.+) \()?.+:(\d+):(\d+)\)?\s*$/) ;
			if(res)
			{
				//log( (res[2]===undefined? "global": (res[2]+"()")) + ":" + res[3] ) ;
			}
		}
		else if(g_architecture=='native')
		{
			// here@/Users/alee/Library/Application Support/iPhone Simulator/6.0/Applications/82A6D96C-8751-48CC-8AF5-8BDAB63FF827/icell.app/bin/util/debug.js:39
			var res = e.stack.split("\n")[1].match(/^\s*(.+)@.+:(\d+)\s*$/) ;
			if(res)
			{
				log( (res[1]===undefined? "global": (res[1]+"()")) + ":" + res[2] ) ;
			}
		}
	}
}