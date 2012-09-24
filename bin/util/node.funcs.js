
/**
 * 将窗口坐标x,y转换成node内部的坐标
 * 计算node各级父窗口的锚点、缩放 和 旋转
 */
yc.util.windowToClient = function(node,x,y){
    var iptX = x ;
    var iptY = y ;
    if(yc.util.windowToClient.debug)
    {
        log(['input ',x,y]) ;
    }

    var path = [] ;
    do{
        path.push(node) ;
    } while( node=node._parent )
        
    for(var i=path.length-1;i>=0;i--)
    {
        node = path[i] ;
        
        if( node.transform===yc.outer.Camera.transformSprite )
        {
            if(yc.util.windowToClient.debug)
            {
                log('a physical entity') ;
            }
            var p = yc.outer.Camera.transformPosition(node) ;
        }
        else
        {
            var p = node.getPosition() ;
        }
        x-= p.x ;
        y-= p.y ;

        // zoom
        x/= node._scaleX ;
        y/= node._scaleY ;
        
        // 
        if(yc.util.windowToClient.debug)
        {
            log(['trans to ',x,y, ' by ',node.constructor.className, p.x, p.y, node._scaleX, node._scaleY]) ;
        }

        // 计算角度
        var r = node.getRotation() ;
        if(r)
        {
            var l = Math.sqrt(x*x+y*y) ;
            r = yc.util.radianBetweenPoints(0,0,x,y) - r ;
            x = l * Math.sin(r) ;
            y = l * Math.cos(r) ;

            if(yc.util.windowToClient.debug)
            {
                log(['rotation to ',x,y, ' by ',node.constructor.className]) ;
            }
        }
    }

    yc.util.windowToClient.debug = false ;

    return [x,y] ;
}
yc.util.windowToClient.debug = false ;

yc.util.traceNode = function(node){
    do{
        log(node) ;
    } while( node=node._parent )
}

/**
 * 将 node 相对于窗口摆正
 */
yc.util.correctRotation = function(node){

	var ajustR = 0 ;

	// 从自己的父窗口开始
    while( node=node._parent )
    {
    	ajustR-= node.getRotation() ;
    }

    return ajustR ;
}