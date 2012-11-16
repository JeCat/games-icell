
var ins = yc.util.ins = function(className)
{
	
	var name = typeof(className.className)=='undefined'? className.name: className.className ;

	if( !name || typeof(name)=='undefined' )
	{
		return null ;
	}

	// 单件对象
	if( 'singleton' in className && className.singleton!==undefined && className.singleton )
	{
		if( !('_singletonInstance' in className) || !className._singletonInstance )
		{
			if(className === yc.user.Character){
				console.log(1);
			}
	
			className._singletonInstance = new className ;
		}
		return className._singletonInstance ;
	}

	// 当前场景中唯一
	else
	{
		var scene = cc.Director.getInstance().getRunningScene() ;
		if(!scene)
		{
			return ;
		}

		if( typeof(scene._instances)=='undefined' )
		{
			scene._instances = {} ;
		}
		if( typeof(scene._instances[name])=='undefined' )
		{
			scene._instances[name] = new className ;
		}
		return scene._instances[name] ;
	}
}
