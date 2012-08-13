/**
 * 计算点 p1 到 p2 的射线的弧度 
 */
yc.util.radianBetweenPoints = function(p1X,p1Y,p2X,p2Y)
{
    var radian = Math.atan( Math.abs(p1Y-p2Y)/  Math.abs(p1X-p2X) ) ;
    if(p1Y<p2Y)
    {
        if(p1X<p2X)
        {
            // nothing
        }
        else
        {
            radian = Math.PI - radian ;
        }
    }
    else
    {
        if(p1X<p2X)
        {
            radian = 2*Math.PI - radian ;
        }
        else
        {
            radian+= Math.PI ;
        }
    }
    return radian ;
}

yc.util.pointsDis = function(p1X,p1Y,p2X,p2Y)
{
    return Math.sqrt(Math.pow(Math.abs(p1X-p2X),2) + Math.pow(Math.abs(p1Y-p2Y),2)) ;
}
