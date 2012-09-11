yc.ui.editer.WorldEditer = function(){

	this.ui = $('#dlg-world-editer').dialog({
		title: '世界编辑器'
		, width:500
	}) ;
	$('#tabs-world-editer').tabs() ;
	
	var editer = this ;
	
	// 进入无敌模式
	yc.settings.player.nohurt = true ;
	yc.settings.player.stealth = true ;

	this.layer = new yc.ui.editer.WorldEditerLayer() ;
	cc.Director.getInstance()._runningScene.addChild( this.layer ) ;

	this.show = function(){
		this.ui.dialog('open') ;
	}
	
	// 污渍---------------------------
	this.selectedStain = null ;
	this.selectedStainPoint = null ;
	
	this.ui.find('#ipt-stain-x').change(function(){
		editer.selectedStain.x = parseInt($(this).val()) ;
	}) ;
	this.ui.find('#ipt-stain-y').change(function(){
		editer.selectedStain.y = parseInt($(this).val()) ;
	}) ;
	this.ui.find('#ipt-stain-damping').change(function(){
		editer.selectedStain.damping = parseFloat($(this).val()) ;
	}) ;

	this.ui.find('#ipt-stain-point-x').change(function(){
		editer.selectedStainPoint.x = parseInt($(this).val()) ;
	}) ;
	this.ui.find('#ipt-stain-point-y').change(function(){
		editer.selectedStainPoint.y = parseInt($(this).val()) ;
	}) ;
	
	
	this.refreshStains = function(){
		
		var arrStains = cc.Director.getInstance()._runningScene.layerStains.getChildren() ;
		
		this.ui.find('#lst-stains').html('') ;
		this.selectedStain = null ;
		
		this._loadOptions(this.ui.find('#lst-stains'),arrStains,function(stain){
			return {
				text: '[id:'+stain.id+']'+stain.x.toFixed(1)+','+stain.y.toFixed(1)
				, value: stain.id
				, click: function(stain){
					editer.selectedStain = stain ;
					editer.selectedStainPoint = null ;
					
					editer.ui.find('#ipt-stain-x').val(stain.x) ;
					editer.ui.find('#ipt-stain-y').val(stain.y) ;
					editer.ui.find('#ipt-stain-damping').val(stain.damping) ;
					

					editer._loadOptions(editer.ui.find('#lst-stain-points'),stain.points,function(point){
					
						return {
							text: '[idx:'+point.idx+']'+point.x.toFixed(1)+','+point.y.toFixed(1)
							, value: point.idx
							, click: function(point){
									editer.selectedStainPoint = point ;
									editer.ui.find('#ipt-stain-point-x').val(point.x.toFixed(0)) ;
									editer.ui.find('#ipt-stain-point-y').val(point.y.toFixed(0)) ;
							}
						}
					}) ;
				}
			}
		}) ;
		
	}
	
	this.message = function(msg){
		this.ui.find('#worldediter-message').html(msg) ;
	}
	
	this.createStain = function(){
		this.message('在地图上污渍的中心选择位置') ;
		this.layer.touchCallback = function(touches,event){
			editer.layer.touchCallback = null ;

			var stain = new yc.outer.Stain() ;
			stain.x = touches[0]._point.wx ;
			stain.y = touches[0]._point.wy ;
			stain.initRandom() ;
			cc.Director.getInstance()._runningScene.layerStains.addChild(stain) ;

			editer.message('新污渍的ID为：'+stain.id) ;
			log([touches,stain]) ;
		}
	}
	
	this.removeStain = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}
		this.selectedStain.removeFromParentAndCleanup() ;
	}
	
	this.createStainPoint = function(){
		if(!this.selectedStain)
		{
			alert("没有选择污渍") ;
			return ;
		}
		this.message('在地图上点出顶点的位置') ;
		this.layer.touchCallback = function(touches,event){
			editer.layer.touchCallback = null ;
			editer.message('') ;

			if(!editer.selectedStain)
			{
				alert("没有选择污渍") ;
				return ;
			}
			editer.selectedStain.appendWorldPoint( touches[0]._point.wx, touches[0]._point.wy ) ;
		}
	}

	this.removeStainPoint = function(){
		if(!this.selectedStain || !this.selectedStainPoint)
		{
			alert("没有选择污渍或顶点") ;
			return ;
		}
		this.selectedStain.removePoint(this.selectedStainPoint.idx) ;
	}
	
	// 角色 -----------
	this.roleClasses = {
			'yc.outer.AminoAcid': '氨基酸'
			, 'yc.outer.VirusCluster': '病毒群'
			, 'yc.outer.Boss': 'Boss'
	}
	this.refreshRoles = function(){

		var arrRoles = cc.Director.getInstance()._runningScene.layerRoles.getChildren() ;
		
		this.ui.find('#lst-roles').html('') ;
		this.selectedRole = null ;
		
		this._loadOptions(this.ui.find('#lst-roles'),arrRoles,function(role,idx){
			return {
				text: '[idx'+idx+']' + (role.constructor.className in editer.roleClasses? editer.roleClasses[role.constructor.className]: 'unknow')
				, value: null
				, click: function(role){
					new yc.ui.editer.ObjectEditer(role,$('#ul-role-properties')) ;
				}
			}
		}) ;
	}
		
	// 平衡
	this.refreshSettings = function(){
		new yc.ui.editer.ObjectEditer(yc.settings,$('#ul-settings')) ;
	}
		
	
	this._loadOptions = function(sel,opts,each)
	{
		sel.html('') ;
		for ( var i = 0; i < opts.length; i++) {
			var info = each(opts[i],i) ;
			var optUi = $('<option></option>').appendTo(sel)
				.text(info.text)
				.val(info.value)
				.data('object',opts[i])
				.data('info',info)
				.click(function(){
					$(this).data('info').click($(this).data('object')) ;
				}) ;
		}
	}
	
	

	this.refreshStains() ;
	this.refreshRoles() ;
	this.refreshSettings() ;
}

function worldediter(){
	ins(yc.ui.editer.WorldEditer).show() ;
}