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

yc.util.pointsDis = function(p1X,p1Y,p2X,p2Y)
{
    return Math.sqrt(Math.pow(Math.abs(p1X-p2X),2) + Math.pow(Math.abs(p1Y-p2Y),2)) ;
}
