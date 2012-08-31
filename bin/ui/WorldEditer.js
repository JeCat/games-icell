yc.ui.WorldEditer = function(){

	this.ui = $('#dlg-world-editer').dialog({width:500}) ;
	this.ui = $('#tabs-world-editer').tabs() ;
	
	var editer = this ;

	this.layer = new yc.ui.WorldEditerLayer() ;
	cc.Director.getInstance()._runningScene.addChild( this.layer ) ;

	this.selectedStain = null ;
	this.selectedStainPoint = null ;
	
	this.show = function(){
		this.ui.dialog('open') ;
	}
	
	this.refresh = function(){
		
		var arrStains = cc.Director.getInstance()._runningScene.layerStains.getChildren() ;
		
		this.ui.find('#lst-stains').html('') ;
		this.selectedStain = null ;
		
		for ( var i = 0; i < arrStains.length; i++) {
			
			$('<option></option>').appendTo('#lst-stains')
					.text('[id:'+arrStains[i].id+']'+arrStains[i].x.toFixed(1)+','+arrStains[i].y.toFixed(1))
					.val(arrStains[i].id)
					.data('stain',arrStains[i])
					.click(function(){
						
						var stain = $(this).data('stain') ;
						editer.selectedStain = stain ;
						
						editer.ui.find('#lst-stain-points').html('') ;
						editer.selectedStainPoint = null ;
						
						for ( var p = 0; p < stain.points.length; p++) {
							
							var point = stain.points[p] ;
							
							$('<option></option>')
								.appendTo('#lst-stain-points')
								.text('[idx:'+point.idx+']'+point.x.toFixed(1)+','+point.y.toFixed(1))
								.data('point',point)
								.click(function(){
									
									var pp = $(this).data('point') ;
									editer.selectedStainPoint ;
								})
							
						}
					})
		}
	}
	
	this.createStain = function(x,y){
		return ;
		var stain = new yc.outer.Stain() ;
		this.layer.addChild(stain) ;
		this.layer.arrStains.push(stain) ;
	}
	
	this.createStainPoint = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}
		this.layer.touchCallback = function(touches,event){
			editer.layer.touchCallback = null ;

			if(!editer.selectedStain)
			{
				alert("没有选择污渍") ;
				return ;
			}
			var camera = ins(yc.outer.Camera) ;
			var x = camera.x+touches[0]._point.x ;
			var y = camera.y+touches[0]._point.y ;
			editer.selectedStain.appendPoint( x, y ) ;
		}
	}
	

}

function worldediter(){
	ins(yc.ui.WorldEditer).show() ;
}