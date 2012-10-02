/**
 * 计算点 p2 到 p1 的射线的弧度 
 * 使用 canvas 的旋转弧度（12点方向为0度，顺时针）
 */
yc.util.radianBetweenPoints = function(p1X,p1Y,p2X,p2Y)
{
	var radian = Math.atan( Math.abs(p1Y-p2Y)/  Math.abs(p1X-p2X) ) ;
	if(p1Y<p2Y)
	{
		// 第一象限
		if(p1X<p2X)
		{
			radian = Math.PI/2 - radian ;
		}
		// 第二象限
		else
		{
			radian = Math.PI*3/2 + radian ;
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
			radian = Math.PI/2 - radian + Math.PI ;
		}
	}
	
	if(isNaN(radian))
	{
		radian = 0 ;
	}
	
	return radian ;
}

/**
 * 计算两点之间的距离
 */
yc.util.pointsDis = function(p1X,p1Y,p2X,p2Y)
{
	return Math.sqrt(Math.pow(Math.abs(p1X-p2X),2) + Math.pow(Math.abs(p1Y-p2Y),2)) ;
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



/**
	Helper function which tests whether two lines intersect.
	@param l1 is a line of the form [[x1, y1], [x2, y2]]
	@param l2 is a line of the form [[x1, y1], [x2, y2]]	
*/
yc.util.lineOnLine = function(l1, l2) {
	// Detects the intersection of two lines
	//   http://www.kevlindev.com/gui/math/intersection/Intersection.js
	var a1 = l1[0];
	var a2 = l1[1];
	var b1 = l2[0];
	var b2 = l2[1];
	var a1x = a1[0];
	var a1y = a1[1];
	var a2x = a2[0];
	var a2y = a2[1];
	var b1x = b1[0];
	var b1y = b1[1];
	var b2x = b2[0];
	var b2y = b2[1];
	
	var ua_t = (b2x - b1x) * (a1y - b1y) - (b2y - b1y) * (a1x - b1x);
	var ub_t = (a2x - a1x) * (a1y - b1y) - (a2y - a1y) * (a1x - b1x);
	var u_b  = (b2y - b1y) * (a2x - a1x) - (b2x - b1x) * (a2y - a1y);
	
	if (u_b) {
		var ua = ua_t / u_b;
		var ub = ub_t / u_b;
		
		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
			// intersection
			return [a1x + ua * (a2x - a1x), a1y + ua * (a2y - a1y)];
		} else {
			return [];
		}
	} else {
		if (ua_t == 0 || ub_t == 0) {
			// coincident
			//return [line2]
			//this will be caught elsewhere anyway
			return [(a2x + a1x) / 2, (a2y + a1y) / 2];
		} else {
			// parallel
			return [];
		}
	}
}


yc.util.formatPoint = function(pt){
	// array to object
	if( !(0 in pt) && ('x' in pt) )
	{
		pt[0] = pt.x ;
	}
	if( !(1 in pt) && ('y' in pt) )
	{
		pt[1] = pt.y ;
	}
	// object to array
	if( (0 in pt) && !('x' in pt) )
	{
		pt.x = pt[0] ;
	}
	if( (1 in pt) && !('y' in pt) )
	{
		pt.y = pt[1] ;
	}
}

yc.util.ccShareTexture = function (url,rect){
	var texture = cc.TextureCache.getInstance().textureForKey(url);
	if (!texture)
	{
		texture = new Image();
		texture.addEventListener("load", function () {
			if (!rect) {
				rect = cc.rect(0, 0, texture.width, texture.height);
			}
			cc.TextureCache.getInstance().cacheImage(url,texture);
		});
		texture.addEventListener("error", function () {
			cc.log("load failure:" + url);
		});
		texture.src = url ;
	}

	return texture ;
}