/*** 污渍 ***/
yc.outer.Stain = yc.outer.LifeEntity.extend({

    size: 0
    
    , points: []
    
    , damping: 0.3
    
    , init: function(){
        
        var stain = this ;
        
        // 顶点数量( 3-6 个顶点)
        var pointNum = 3 + Math.floor(Math.random()*4) ;
        var maxRadius = 400 * Math.random() ;
        this.points = [] ;
        this.size = 0 ;
        this.damping = Math.random() ;
        
        var createPoint = function(radian){
            
            var point = {
                radian: radian%(2*Math.PI)
                , radius: Math.random() * maxRadius
            } ;
            point.x = (Math.cos(point.radian) * point.radius) ;
            point.y = (Math.sin(point.radian) * point.radius) ;
            point.idx = stain.points.length ;
            
            stain.points.push(point) ;
            
            if(stain.size<point.radius)
            {
                stain.size=point.radius
            }
            
            return point ;
        }   
        
        var angle = 2*Math.PI / pointNum ;
        
        // 第一个顶点
        var point = createPoint( 2*Math.PI*Math.random() ) ;
        
        // 处理第二个到倒数第二个
        for(var p=1;p<pointNum;p++)
        {
            point = createPoint( point.radian + angle ) ;
        }
            
        return ;
    }
	
    , transform: yc.outer.Camera.transformSprite
	, draw: function(ctx){
	    ctx.lineJoin = 'round' ;
	    yc.util.drawPolygon(this.points,ctx,'rgba(50,50,50,'+this.damping+')','rgba(100,100,100,'+this.damping+')',true) ;
	    
	    // 绘制调试辅助线
	    // this.testCollision( ins(yc.outer.Cell), ctx ) ; 

	}
	
	, testCollision: function(entity,ctx){
	    
	    if( (entity.size+this.size) < yc.util.pointsDis(this.x,this.y,entity.x,entity.y) )
	    {
	        return false ;
	    }
	    
        var target = {
            x: entity.x - this.x
            , y: entity.y - this.y
        }
        
        // 到变形中心点的角度
        var crossBoards = 0 ;
        var rayRadian = yc.util.radianBetweenPoints(target.x,target.y,0,0) ;
        var rayRadianRevert = rayRadian - 2*Math.PI ;
        
        if(ctx)
        {
            ctx.fillStyle='rgb(255,0,0)'
            yc.util.drawLine(target,[0,0],ctx,null,true) ;
            ctx.fillText(rayRadian.toFixed(2),0,0) ;
            ctx.fillText(rayRadianRevert.toFixed(2),0,10) ;
        }
        
        var pointA = this.points[this.points.length-1] ;
        pointA._r = pointA.__r = yc.util.radianBetweenPoints(target.x,target.y,pointA.x,pointA.y) ;
        
        for(var p=0;p<this.points.length;p++)
        {
            var pointB = this.points[p] ;
            pointB.__r = pointB._r = yc.util.radianBetweenPoints(target.x,target.y,pointB.x,pointB.y) ;
            pointA.__r = pointA._r
            
            if(pointA._r>pointB._r)
            {
                pA = pointA ;
                pB = pointB ;
            }
            else
            {
                pA = pointB ;
                pB = pointA ;
            }
            
            var targetRadian = rayRadian ;
            
            // 两个角的差值超过 180
            if( pA._r-pB._r>Math.PI )
            {
                // 较大的角取反值
                pA.__r = pA._r - 2*Math.PI ;
                
                // 交换大小关系
                var m = pA ;
                pA = pB ;
                pB = m ;
                
                // 如果射线的角度大于 180， 也取反值
                if(rayRadian>Math.PI)
                {
                    targetRadian = rayRadianRevert ;
                }
            }
            
            var crossed = pA.__r>targetRadian && pB.__r<targetRadian ;
            if( crossed )
            {
                crossBoards ++ ;
            }
            
            if(ctx)
            {
                yc.util.drawLine(pointA,pointB,ctx,crossed?'rgb(0,255,0)':'rgb(255,0,0)',true) ;
                yc.util.drawLine(target,pointB,ctx,"rgb(200,200,200)",true) ;
                
                ctx.fillText(p+': '+pointA.__r.toFixed(3),pointA.x,-pointA.y) ;
                ctx.fillText(p+': '+pointB.__r.toFixed(3),pointB.x,-pointB.y-12) ;
            }
            
            pointA = pointB ;
        }
        
        if(ctx)
        {
            ctx.fillText('cross boards:'+crossBoards,0,20) ;
        }
        if( crossBoards%2 )
        {
            return true ;
        }
        else
        {
            return false ;
        }
	}
	
}) ;


yc.outer.Stain.downSpeed = function(entity){
    
    var downSpeed = 0 ;
    
    var stains = yc.util.ObjectPool.ins(yc.outer.Stain).usingObjects ;
    for(var id in stains)
    {
        if( stains[id].testCollision(entity) )
        {
            if( downSpeed < stains[id].damping )
            {
                downSpeed = stains[id].damping ;
            }
        }
    }
    
    entity.runDamping = 1 - downSpeed ;
}

