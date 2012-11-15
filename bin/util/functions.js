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

/**
 * 计算两条线段的焦点
 */
yc.util.segmentsIntr = function(a, b, c, d){  
  
/** 1 解线性方程组, 求线段交点. **/  
// 如果分母为0 则平行或共线, 不相交  
    var denominator = (b[1] - a[1])*(d[0] - c[0]) - (a[0] - b[0])*(c[1] - d[1]);  
    if (denominator==0) {  
        return false;  
    }  
   
// 线段所在直线的交点坐标 (x , y)      
    var x = ( (b[0] - a[0]) * (d[0] - c[0]) * (c[1] - a[1])   
                + (b[1] - a[1]) * (d[0] - c[0]) * a[0]   
                - (d[1] - c[1]) * (b[0] - a[0]) * c[0] ) / denominator ;  
    var y = -( (b[1] - a[1]) * (d[1] - c[1]) * (c[0] - a[0])   
                + (b[0] - a[0]) * (d[1] - c[1]) * a[1]   
                - (d[0] - c[0]) * (b[1] - a[1]) * c[1] ) / denominator;  
  
/** 2 判断交点是否在两条线段上 **/  
    if (  
        // 交点在线段1上  
        (x - a[0]) * (x - b[0]) <= 0 && (y - a[1]) * (y - b[1]) <= 0  
        // 且交点也在线段2上  
         && (x - c[0]) * (x - d[0]) <= 0 && (y - c[1]) * (y - d[1]) <= 0  
        ){  
  
        // 返回交点p  
        return [x,y] ;
    }  
    //否则不相交  
    return false  ;
  
}

yc.util.ratateVector = function(vector,rotation){
	rotation = ( yc.util.radianBetweenPoints(0,0,vector.x,vector.y) + rotation ) ;
	var dis = Math.sqrt(vector.x*vector.x+vector.y*vector.y) ;
	return {
		x: Math.sin(rotation)*dis
		, y: Math.cos(rotation)*dis
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

yc.util.arr.merge = function(arr1,arr2){
	for(var i=0;i<arr2.length;i++)
	{
		arr1.push(arr2[i]) ;
	}
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


yc.util.cloneObject = function (newObj,srcObj){

	var cloneProps = function(newObj,srcObj,propName){

			if( typeof(srcObj[propName])=='object' )
			{
				newObj[propName] = srcObj[propName].constructor===Array? []: {} ;
				yc.util.cloneObject( newObj[propName], srcObj[propName] ) ;
			}
			else
			{
				newObj[propName] = srcObj[propName] ;
			}
	}

	if( srcObj.constructor === Array )
	{
		for(var i=0; i<srcObj.length; i++)
		{
			cloneProps(newObj,srcObj,i) ;
		}
	}
	else
	{
		for(var k in srcObj)
		{
			cloneProps(newObj,srcObj,k) ;
		}
	}
}

yc.util.saveData = function(name,data){
	if( typeof localStorage!="undefined" )
	{
		localStorage.setItem( name, $.toJSON(data) ) ;
	}
}
yc.util.loadData = function(name,data){
	if( typeof localStorage!="undefined" )
	{
		var data = localStorage.getItem(name) ;
		if(data===null)
		{
			return null ;
		}
		return $.evalJSON( data ) ;
	}

	else
	{
		return null ;
	}
}