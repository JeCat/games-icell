/**
 * 计算点 p1 到 p2 的射线的弧度 
 * 使用 canvas 的旋转弧度（从上面开始，顺时针）
 */
yc.util.radianBetweenPoints = function(p1X,p1Y,p2X,p2Y)
{
    var radian = Math.atan( Math.abs(p1Y-p2Y)/  Math.abs(p1X-p2X) ) ;
    if(p1Y<p2Y)
    {
        // 第一象限
        if(p1X<p2X)
        {
            return Math.PI/2 - radian ;
        }
        // 第二象限
        else
        {
            return Math.PI*3/2 + radian ;
        }
    }
    else
    { 
        // 第四象限
        if(p1X<p2X)
        {
            return Math.PI/2 + radian ;
        }
        // 第三象限
        else
        {
            return Math.PI/2 - radian + Math.PI ;
        }
    }
}

/**
 * 计算两点之间的距离
 */
yc.util.pointsDis = function(p1X,p1Y,p2X,p2Y)
{
    return Math.sqrt(Math.pow(Math.abs(p1X-p2X),2) + Math.pow(Math.abs(p1Y-p2Y),2)) ;
}



/**
 * 画一个正方形区域
 */
yc.util.drawRect = function(lftTop,rgtBtm,ctx,strokeStyle,fillStyle){
        
    
    if( typeof(strokeStyle)!='undefined' && strokeStyle )
    {
        ctx.strokeStyle = strokeStyle ;
    }
    else
    {
        strokeStyle = null ;
    }
    
    if( typeof(fillStyle)!='undefined' && fillStyle )
    {
        ctx.fillStyle = fillStyle ;
    }
    else
    {
        fillStyle = null ;
    }
    
    ctx.beginPath() ;
    ctx.moveTo(lftTop[0],-lftTop[1]) ;
    ctx.lineTo(rgtBtm[0],-lftTop[1]) ;
    ctx.lineTo(rgtBtm[0],-rgtBtm[1]) ;
    ctx.lineTo(lftTop[0],-rgtBtm[1]) ;
    ctx.lineTo(lftTop[0],-lftTop[1]) ;
    ctx.closePath() ;
    
    if(fillStyle)
    {
        ctx.fill() ;
    }
    if(strokeStyle)
    {
        ctx.stroke() ;
    }
}


yc.util.arr = {} ;
yc.util.arr.search = function(arr,ele){
    for(var i=0;i<arr.length;i++)
    {
        if(ele===arr[i])
        {
            return i ;
        }
    }
    return false ;
}

yc.util.arr.remove = function(arr,ele){
    var idx = yc.util.arr.search(arr,ele) ;
    if(idx!==false)
    {
        arr.splice(idx,1) ;
        return true ;
    }
    return false ;
}