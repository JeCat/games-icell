
var ins = yc.util.ins = function(className)
{   
    var name = typeof(className.className)=='undefined'? className.name: className.className ;
    
    if( !name || typeof(name)=='undefined' )
    {
        return null ;
    }
    
    var scene = cc.Director.getInstance()._runningScene ;
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
