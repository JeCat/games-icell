
/**
 * 画一个正方形区域
 */
yc.util.drawRect = function(lftTop,rgtBtm,ctx,strokeStyle,fillStyle){
		
	ctx.save() ;
	ctx.beginPath() ;
	
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
	
	ctx.moveTo(lftTop[0],-lftTop[1]) ;
	ctx.lineTo(rgtBtm[0],-lftTop[1]) ;
	ctx.lineTo(rgtBtm[0],-rgtBtm[1]) ;
	ctx.lineTo(lftTop[0],-rgtBtm[1]) ;
	ctx.lineTo(lftTop[0],-lftTop[1]) ;
	
	if(fillStyle)
	{
		ctx.fill() ;
	}
	if(strokeStyle)
	{
		ctx.stroke() ;
	}

	ctx.closePath() ;
	ctx.restore() ;
}

/**
 * 画一个多边形
 */
yc.util.drawPolygon = function(points,ctx,strokeStyle,fillStyle,convert){
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
	
	if( typeof(convert)=='undefined' )
	{
		convert = 1 ;
	}
	else
	{
		convert = convert? -1: 1 ;
	}
	
	ctx.beginPath() ;
	
	var transPoint = function(p)
	{
		return typeof(p.x)!=='undefined'? [p.x,p.y]: p ;
	}
	var last = transPoint(points[points.length-1]) ;
	
	ctx.moveTo(last[0],last[1]*convert) ;
	for(var p=0;p<points.length;p++)
	{
		point = transPoint(points[p]) ;
		ctx.lineTo(point[0],point[1]*convert) ;
	}
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


/**
 * 画一根线
 */
yc.util.drawLine = function(pointA,pointB,ctx,strokeStyle,convert){
	if( typeof(strokeStyle)!='undefined' && strokeStyle )
	{
		ctx.strokeStyle = strokeStyle ;
	}
	if( typeof(convert)=='undefined' )
	{
		convert = 1 ;
	}
	else
	{
		convert = convert? -1: 1 ;
	}
	
	var transPoint = function(p)
	{
		return typeof(p.x)!=='undefined'? [p.x,p.y]: p ;
	}
	pointA = transPoint(pointA) ;
	pointB = transPoint(pointB) ;
	
	ctx.beginPath() ;
	ctx.moveTo(pointA[0],pointA[1]*convert) ;
	ctx.lineTo(pointB[0],pointB[1]*convert) ;
	ctx.closePath() ;
	
	ctx.stroke() ;
}


yc.util.drawCircle = function(ctx,x,y,w,h,strokeStyle,fillStyle){

	y = -y ;

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
	ctx.moveTo(x+w,y);
	ctx.arc(x,y, w, 0, 2*Math.PI, false);
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

/**
 * 画一个图像 
 */
yc.util.drawImage = function(ctx,imgurl,x,y,anchorX,anchorY){
	var texture = yc.util.ccShareTexture(imgurl) ;
	if (texture instanceof HTMLImageElement)
	{
		y = -y ;
		x-= texture.width * (anchorX || 0) ;
		y-= texture.height * (anchorY || 0) ;
		ctx.drawImage(texture,x,y) ;
	}
}

/**
 * 用图像平铺一个矩形区域
 */
yc.util.tileImage = function(ctx,imgurl,x,y,w,h){
	var texture = yc.util.ccShareTexture(imgurl) ;
	if (texture instanceof HTMLImageElement)
	{
		var pp = ctx.createPattern(texture, 'repeat');
		ctx.fillStyle = pp ;
		ctx.fillRect(x,-y,w,h) ;
	}
}

/**
 * 描绘文本
 */
yc.util.text = function(ctx,text,x,y,style,font){

	if( typeof(style)!='undefined' && style )
	{
		ctx.fillStyle = style ;
	}

	if(font)
	if( typeof(font)=='undefined' || !font )
	{
		ctx.font = "normal 12px san-serif" ;
	}
	else
	{
		ctx.font = font ;
	}

	ctx.fillText(text,x,y) ;

}

