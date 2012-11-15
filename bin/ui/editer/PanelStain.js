yc.ui.editer.PanelStain = function(editer){
	this.editer = editer ;
	this.ui = editer.ui ;
	var panel = this ;


	// 污渍---------------------------
	this.selectedStain = null ;
	this.selectedStainShape = null ;
	this.selectedStainPoint = null ;

	// 修改污渍的属性：位置、角度
	var onChangeStainPosition = function(){
		var y = parseInt($('#ipt-stain-y').val())/PTM_RATIO ;
		var x = parseInt($('#ipt-stain-x').val())/PTM_RATIO ;
		var r = parseFloat($('#ipt-stain-rotation').val()) ;
		var mat22 = new b2Mat22();
		mat22.Set(Math.PI*2-r) ;
		panel.selectedStain.b2Body.SetTransform( new b2Transform(new b2Vec2(x,y),mat22) ) ;
	}
	this.ui.find('#ipt-stain-x').change(onChangeStainPosition) ;
	this.ui.find('#ipt-stain-y').change(onChangeStainPosition) ;
	this.ui.find('#ipt-stain-rotation').change(onChangeStainPosition) ;

	// 修改污渍的类型
	this.ui.find('#sel-stain-bodyType').change(function(){
		
		panel.selectedStain._script.bodyType = this.options[this.selectedIndex].value ;
		
		// 重新构建多边形
		panel.selectedStain.initWithScript(panel.selectedStain._script) ;
	}) ;


	// 修改多形状属性
	var onChangeShape = function(){
		panel.selectedStainShape.density = parseFloat($('#ipt-stain-shape-density').val());
		panel.selectedStainShape.restitution = parseFloat($('#ipt-stain-shape-restitution').val());
		panel.selectedStainShape.friction = parseFloat($('#ipt-stain-shape-friction').val());
		// 重新构建多边形
		panel.selectedStain.initWithScriptShapes(panel.selectedStain.shapes) ;
	}
	this.ui.find('#ipt-stain-shape-density').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-restitution').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-friction').change(onChangeShape) ;

	// 修改多形状染色
	var onChangeShape = function(){
		panel.selectedStainShape.color = $('#ipt-stain-shape-color').val();
		panel.selectedStainShape.borderColor = $('#ipt-stain-shape-border-color').val();
		panel.selectedStainShape.textStyle = $('#ipt-stain-shape-text-style').val();
		panel.selectedStainShape.textColor = $('#ipt-stain-shape-text-color').val();
		panel.selectedStainShape.text = $('#ipt-stain-shape-text').val();
		panel.selectedStainShape.img = $('#ipt-stain-shape-img').val();
		panel.selectedStainShape.tile = $('#ipt-stain-shape-img-tile').attr("checked")? true: false ;

	}
	this.ui.find('#ipt-stain-shape-color').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-border-color').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-text-style').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-text-color').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-text').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-img').change(onChangeShape) ;
	this.ui.find('#ipt-stain-shape-img-tile').change(onChangeShape) ;

	// 修改多边形顶点位置
	var onChangePointPosition = function(){
		panel.selectedStainPoint[0] = parseInt($('#ipt-stain-point-x').val()) ;
		panel.selectedStainPoint[1] = parseInt($('#ipt-stain-point-y').val()) ;
		// 重新构建多边形
		panel.selectedStain.initWithScriptShapes(panel.selectedStain.shapes) ;
	}
	this.ui.find('#ipt-stain-point-x').change(onChangePointPosition) ;
	this.ui.find('#ipt-stain-point-y').change(onChangePointPosition) ;
	

	this.refreshStains = function(){
		
		var scene = cc.Director.getInstance().getRunningScene() ;
		if( !('layerStains' in scene) )
		{
			return ;
		}

		var arrStains = scene.layerStains.getChildren() ;
		
		// this.ui.find('#lst-stains').html('') ;
		// this.selectedStain = null ;
		
		yc.ui.editer.WorldEditer.loadOptions(this.ui.find('#lst-stains'),arrStains,function(stain,si){
			return {
				text: '[id:'+stain.id+']'+stain.x.toFixed(1)+','+stain.y.toFixed(1)
				, value: stain.id
				, selected: panel.selectedStain===stain

				// 选中污渍事件 -----
				, click: function(stain){
					panel.selectedStain = stain ;
					// panel.selectedStainShape = null ;
					// panel.selectedStainPoint = null ;
					// panel.selectedStainPointIdx = -1 ;
					
					panel.ui.find('#ipt-stain-x').val(stain.x.toFixed(1)) ;
					panel.ui.find('#ipt-stain-y').val(stain.y.toFixed(1)) ;
					panel.ui.find('#sel-stain-bodyType>option[value='+stain.bodyType+']').attr('selected','selected') ;
					panel.ui.find('#ipt-stain-rotation').val(stain.getRotation()) ;
					
					panel.ui.find('#ipt-stain-shape-density').val('') ;
					panel.ui.find('#ipt-stain-shape-restitution').val('') ;
					panel.ui.find('#ipt-stain-shape-friction').val('') ;
					panel.ui.find('#ipt-stain-shape-color').val('') ;
					panel.ui.find('#ipt-stain-shape-border-color').val('') ;
					panel.ui.find('#ipt-stain-shape-text-style').val('') ;
					panel.ui.find('#ipt-stain-shape-text-color').val('') ;
					panel.ui.find('#ipt-stain-shape-text').val('') ;

					panel.ui.find('#lst-stain-points').html('') ;
					panel.ui.find('#ipt-stain-point-x').val('') ;
					panel.ui.find('#ipt-stain-point-y').val('') ;

					// 加载形状list
					panel.refreshStainShapes(stain) ;
				}
			}
		}) ;
		
	}

	this.refreshStainShapes = function(stain){
		yc.ui.editer.WorldEditer.loadOptions(panel.ui.find('#lst-stain-shapes'),stain.shapes,function(shape,si){
			return {
				text: '[S' + si + '] ' + shape.type
				, value: si
				, selected: panel.selectedStainShape===shape

				// 选择形状事件 ----------------
				, click: function(shape){

					panel.selectedStainShape = shape ;
					// panel.selectedStainPoint = null ;
					// panel.selectedStainPointIdx = -1 ;

					panel.ui.find('#ipt-stain-shape-density').val(shape.density) ;
					panel.ui.find('#ipt-stain-shape-restitution').val(shape.restitution) ;
					panel.ui.find('#ipt-stain-shape-friction').val(shape.friction) ;
					panel.ui.find('#ipt-stain-shape-color').val(shape.color) ;
					panel.ui.find('#ipt-stain-shape-border-color').val(shape.borderColor) ;
					panel.ui.find('#ipt-stain-shape-text-style').val(shape.textStyle) ;
					panel.ui.find('#ipt-stain-shape-text-color').val(shape.textColor) ;
					panel.ui.find('#ipt-stain-shape-text').val(shape.text) ;
					panel.ui.find('#ipt-stain-shape-img').val(shape.img) ;
					panel.ui.find('#ipt-stain-shape-img-tile').val( shape.tile ) ;

					panel.ui.find('#ipt-stain-point-x').val('') ;
					panel.ui.find('#ipt-stain-point-y').val('') ;

					panel.refreshStainShapePoints(shape) ;
				}
			}
		}) ;
	}

	this.refreshStainShapePoints = function(shape){
		// 加载顶点
		yc.ui.editer.WorldEditer.loadOptions(editer.ui.find('#lst-stain-points'),shape.points,function(point,pi){
		
			// panel.selectedStainPoint = null ;

			return {
				text: '[P'+pi+']'+point[0].toFixed(0)+','+point[1].toFixed(0)
				, value: pi
				, selected: panel.selectedStainPoint===point

				// 选择顶点 ---------------
				, click: function(point,pi){
						panel.selectedStainPoint = point ;
						panel.selectedStainPointIdx = pi ;

						panel.selectedStain.dbgBrightShapePoint = point ;

						panel.ui.find('#ipt-stain-point-x').val(point[0].toFixed(0)) ;
						panel.ui.find('#ipt-stain-point-y').val(point[1].toFixed(0)) ;
				}
			}
		}) ;
	}









	
	this.createStain = function(){

		editer.layer.lineOutRect( function(pressPt,releasePt){

			var polygon = panel._polygonShapeScript(releasePt,pressPt) ;
			var center = {
				x: polygon.points[0][0] + ((polygon.points[3][0]-polygon.points[0][0])/2)|0
				, y: polygon.points[1][1] + ((polygon.points[0][1] - polygon.points[1][1])/2)|0
			} ;
			// 取相对坐标
			for(var i=0;i<polygon.points.length;i++)
			{
				polygon.points[i][0]-= center.x ;
				polygon.points[i][1]-= center.y ;
			}


			var cam = ins(yc.outer.Camera) ;
			var stain = new yc.outer.Stain ;
			stain.initWithScript({
					x: center.x
					, y: center.y
					, linearDampingMultiple: 2		// 线速度阻尼倍数(相对质量)
					, angularDampingMultiple: 4		// 角速度阻尼倍数(相对质量)
					, bodyType: b2Body.b2_staticBody
					, shapes:[ polygon ]
				}) ;

			cc.Director.getInstance().getRunningScene().layerStains.addChild(stain) ;

			// 设为当前对象
			panel.selectedStain = stain ;
			panel.selectedStainShape = stain.shapes[0] ;

			// 刷新所有污渍列表
			panel.refreshStains() ;

			return false ;
		} ) ;
	}
	
	this.removeStain = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}

		this.selectedStain.destroy() ;

		this.refreshStains() ;
	}

	this.locateStain = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}

		// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = true ;

		editer.layer.touchCallback = function(touches,event){
			// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = false ;
			editer.layer.touchCallback = null ;
			editer.message('') ;

			if(!panel.selectedStain)
			{
				alert("没有选择污渍") ;
				return ;
			}
			
			var cam = ins(yc.outer.Camera) ;
			$('#ipt-stain-x').val( cam.x - cam.offsetX + touches[0]._point.x ) ;
			$('#ipt-stain-y').val( cam.y - cam.offsetY + touches[0]._point.y ) ;
			onChangeStainPosition() ;

			return false ;
		}

	}




	this.createStainShape = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}

		editer.layer.lineOutRect( function(pressPt,releasePt){

			if(!panel.selectedStain)
			{
				alert("没有选择污渍，操作无效") ;
				return false ;
			}

			pressPt = {
				wx: pressPt.wx - panel.selectedStain.x
				, wy: pressPt.wy - panel.selectedStain.y
			}
			releasePt = {
				wx: releasePt.wx - panel.selectedStain.x
				, wy: releasePt.wy - panel.selectedStain.y
			}

			var newShape = panel._polygonShapeScript(releasePt,pressPt) ;
			panel.selectedStain._script.shapes.push(newShape) ;
			panel.selectedStain.initWithScript(panel.selectedStain._script) ;

			// 选中新创建的形状
			panel.selectedStainShape = newShape ;

			// 刷新顶点
			panel.refreshStainShapes(panel.selectedStain) ;

			return false ;
		} ) ;
	}


	this._polygonShapeScript = function(pt1,pt2){

		// 避免0 宽度、高度
		if(pt1.wx==pt2.wx)
		{
			pt1.wx+= 1 ;
		}
		if(pt1.wy==pt2.wy)
		{
			pt1.wy+= 1 ;
		}
		var lft = Math.round(Math.min(pt1.wx,pt2.wx)) ;
		var rgt = Math.round(Math.max(pt1.wx,pt2.wx)) ;
		var btn = Math.round(Math.min(pt1.wy,pt2.wy)) ;
		var top =Math.round(Math.max(pt1.wy,pt2.wy)) ;

		return {
			type: 'polygon'					// 类型 circle, polygon
			, density: 0.5					// 密度
			, friction: 1					// 摩擦力
			, restitution: 1				// 弹性
			, color: "150,150,150"			// 颜色
			, borderColor: "80,80,80,0"		// 边界颜色
			// 多边形的顶点
			, points: [ [lft,top], [lft,btn], [rgt,btn], [rgt,top] ]
			, text: null
			, textStyle: "normal 16px san-serif"
			, textColor: "0,0,0,1"
			, img: "res/Static_poly.png"
			, tile: true
		} ;
	}

	this.removeStainShape = function(){
		if(!this.selectedStain || !this.selectedStainShape)
		{
			alert("没有选择污渍 或 污渍中的形状") ;
			return ;
		}
		if( this.selectedStain.shapes.length<=1 )
		{
			alert("污渍不能少于一个形状") ;
			return ;
		}

		yc.util.arr.remove(this.selectedStain.shapes,this.selectedStainShape) ;

		this.selectedStain.initWithScriptShapes(this.selectedStain.shapes) ;

		// 刷新形状
		this.refreshStainShapes(panel.selectedStain) ;
	}
	
	this.createStainPoint = function(){
		if(!this.selectedStain || !this.selectedStainShape)
		{
			alert("没有选择污渍 或 污渍中的形状") ;
			return ;
		}
		editer.message('在地图上点出顶点的位置') ;
		// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = true ;

		editer.layer.touchCallback = function(touches,event){
			// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = false ;
			editer.layer.touchCallback = null ;
			editer.message('') ;

			if(!panel.selectedStain || !panel.selectedStainShape)
			{
				alert("没有选择污渍 或 污渍中的形状，操作无效") ;
				return false ;
			}
			
			var pt = yc.util.windowToClient(panel.selectedStain,touches[0]._point.x,touches[0]._point.y) ;
			panel.selectedStainShape.points.push(pt) ;
			panel.selectedStain.initWithScriptShapes(panel.selectedStain.shapes) ;

			// 选中新创建的顶点
			panel.selectedStainPoint = pt ;

			// 刷新顶点
			panel.refreshStainShapePoints(panel.selectedStainShape) ;

			return false ;
		}
	}

	this.removeStainPoint = function(){
		if(!this.selectedStain || !this.selectedStainPoint)
		{
			alert("没有选择污渍或顶点") ;
			return ;
		}
		if(this.selectedStainShape.points.length<=3)
		{
			alert("多边形的顶点数量不能小于3") ;
			return ;
		}

		yc.util.arr.remove(this.selectedStainShape.points,this.selectedStainPoint) ;

		this.selectedStain.initWithScriptShapes(this.selectedStain.shapes) ;

		// 刷新顶点
		this.refreshStainShapePoints(this.selectedStainShape) ;
	}

	this.locateStainPoint = function(){
		if(!this.selectedStain || !this.selectedStainPoint)
		{
			alert("没有选择污渍或顶点") ;
			return ;
		}

		// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = true ;

		editer.layer.touchCallback = function(touches,event){
			// cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = false ;
			editer.layer.touchCallback = null ;
			editer.message('') ;

			if(!panel.selectedStain || !panel.selectedStainShape || !panel.selectedStainPoint)
			{
				alert("没有选择污渍 或 污渍中的形状，操作无效") ;
				return false ;
			}
			
			var pt = yc.util.windowToClient(panel.selectedStain,touches[0]._point.x,touches[0]._point.y) ;
			panel.selectedStainPoint[0] = pt[0] ;
			panel.selectedStainPoint[1] = pt[1] ;
			panel.selectedStain.initWithScriptShapes(panel.selectedStain.shapes) ;

			// 刷新顶点
			panel.refreshStainShapePoints(panel.selectedStainShape) ;

			return false ;
		}
	}



	this.stopStainMoving = function(){
		this.selectedStain.b2Body.SetLinearVelocity(new b2Vec2(0,0)) ;
	}
	this.stopStainRotation = function(){
		this.selectedStain.b2Body.SetAngularVelocity(0) ;
	}

}