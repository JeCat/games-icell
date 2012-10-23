yc.event = {} ;
yc.event.register = function (object,name,fn,self,args){

	if( !('__mapEventHandlesByName' in object) )
	{
		object.__mapEventHandlesByName = {} ;
	}

	if( !(name in object.__mapEventHandlesByName) )
	{
		object.__mapEventHandlesByName[name] = [] ;
	}

	object.__mapEventHandlesByName[ name ].push({
		fn: fn
		, args: args || []
		, self: self || object
	}) ;
}


yc.event.unregister = function (object,name,fn){

	if( !('__mapEventHandlesByName' in object) )
	{
		return ;
	}

	if( !(name in object.__mapEventHandlesByName) )
	{
		return ;
	}

	for( var i=object.__mapEventHandlesByName[name].length-1; i>=0; i-- ){
		if( object.__mapEventHandlesByName[name][i].fn === fn )
		{
			// 移除事件响应函数
			object.__mapEventHandlesByName[name].splice(i,1) ;
		}
	}
}

/**
 * handle = function(){}
 * handle = { fn: function(){}, args:[1,2,3] }
 */
yc.event.trigger = function(object,name,inArgs){

	if( !('__mapEventHandlesByName' in object) )
	{
		return ;
	}

	if( !(name in object.__mapEventHandlesByName) )
	{
		return ;
	}

	for( var i=0; i<object.__mapEventHandlesByName[name].length; i++ ){

		var argvs = inArgs===undefined? []: inArgs ;
		yc.util.arr.merge(argvs,object.__mapEventHandlesByName[name][i].args) ;

		object.__mapEventHandlesByName[name][i].fn.apply( 
			object.__mapEventHandlesByName[name][i].self
			, argvs
		) ;
	}
}

