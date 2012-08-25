(function(){
    var func = function (pkg,prefix){
    
        for(var n in pkg)
        {
            // 递归包
            if( typeof(pkg[n])=='object' )
            {
                func(pkg[n],prefix+n+'.') ;
            }
            // 遇到类
            else if( typeof(pkg[n])=='function' )
            {
                pkg[n].className = prefix + n ;
                log('declare className: '+pkg[n].className) ;
            }
        }
        
    } ;
    
    func(yc,'yc.') ;
}) () ;
