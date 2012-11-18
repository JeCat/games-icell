
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


function extend(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h}