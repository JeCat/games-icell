
yc.util.Instance = {} ;
yc.util.Instance._instances = {} ;

var ins = yc.util.Instance.ins = function(className)
{   
    var name = typeof(className.className)=='undefined'? className.name: className.className ;
    
    if( !name || typeof(name)=='undefined' )
    {
        return null ;
    }
    
	if( typeof(yc.util.Instance._instances[name])=='undefined' )
	{
		yc.util.Instance._instances[name] = new className ;
	}
	return yc.util.Instance._instances[name] ;
}
