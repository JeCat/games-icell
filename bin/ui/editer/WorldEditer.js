yc.ui.editer.WorldEditer = function(){

	log('create WorldEditer') ;

	this.ui = $('#dlg-world-editer').dialog({
		title: '世界编辑器'
		, width:650
		, position: [0,0]
	}) ;
	$('#tabs-world-editer').tabs() ;
	
	this.stain = new yc.ui.editer.PanelStain(this) ;
	editer = this ;

	// 辅助层
	this.layer = new yc.ui.editer.WorldEditerLayer() ;
	cc.Director.getInstance()._runningScene.addChild( this.layer ) ;

	this.show = function(){
		this.ui.dialog('open') ;
	}
	
	this.message = function(msg){
		this.ui.find('#worldediter-message').html(msg) ;
	}
	


	// 角色 -----------
	this.roleClasses = {
			'yc.outer.AminoAcid': '氨基酸'
			, 'yc.outer.VirusCluster': '病毒群'
			, 'yc.outer.Boss': 'Boss'
	}
	this.refreshRoles = function(){

		var scene = cc.Director.getInstance()._runningScene ;
		if( !('layerRoles' in scene) )
		{
			return ;
		}
		var arrRoles = scene.layerRoles.getChildren() ;
		
		this.ui.find('#lst-roles').html('') ;
		this.selectedRole = null ;
		
		yc.ui.editer.WorldEditer._loadOptions(this.ui.find('#lst-roles'),arrRoles,function(role,idx){
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
		
	

	this.refreshRoles() ;
	this.refreshSettings() ;
}

yc.ui.editer.WorldEditer.singleton = true ;

yc.ui.editer.WorldEditer._loadOptions = function(sel,opts,each)
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

function enterEditMode(){
	
	cc.Director.getInstance().replaceScene(new (yc.GameScene.extend({
		onEnter: function(){
			this._super() ;

			// 进入状态
			yc.settings.player.nohurt = true ;		// 无敌
			yc.settings.player.stealth = true ;		// 隐身
			yc.settings.outer.stain.dbg = true ;	// 绘制污渍信息

			ins(yc.ui.editer.WorldEditer).show() ;
		}

		, onExit: function(){

			// 退出状态
			yc.settings.player.nohurt = false ;		// 无敌
			yc.settings.player.stealth = false ;	// 隐身
			yc.settings.outer.stain.dbg = false ;	// 绘制污渍信息

			// 关闭窗口
			ins(yc.ui.editer.WorldEditer).ui.dialog('close') ;
		}
	})));
}

