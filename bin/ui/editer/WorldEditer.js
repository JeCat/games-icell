yc.ui.editer.WorldEditer = function(){

	log('create WorldEditer') ;

	/*this.ui = $('#dlg-world-editer').dialog({
		title: '世界编辑器'
		, width:650
		, position: [0,0]
	}) ;*/
	this.ui = $('#dlg-world-editer')
				.height($(window).height())
				.show() ;
	$('#tabs-world-editer').tabs() ;
	
	this.stain = new yc.ui.editer.PanelStain(this) ;
	this.pinup = new yc.ui.editer.PanelPinup(this) ;
	editer = this ;

	// 辅助层
	this.layer = new yc.ui.editer.WorldEditerLayer() ;

	this.open = function(){
		this.ui.show() ;

		// 进入状态
		yc.settings.player.nohurt = true ;		// 无敌
		yc.settings.player.stealth = true ;		// 隐身
		yc.settings.outer.stain.dbg = true ;	// 绘制污渍信息

		ins(yc.outer.Cell)._followingCamera = null ; 									// 停止摄像机跟随
		cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = true ;		// 停止鼠标控制玩家

		// 辅助层
		cc.Director.getInstance().getRunningScene().addChild( this.layer ) ;
	}

	this.close = function(){

		// 关闭窗口
		this.ui.hide() ;

		// 退出状态
		yc.settings.player.nohurt = false ;		// 无敌
		yc.settings.player.stealth = false ;	// 隐身
		yc.settings.outer.stain.dbg = false ;	// 绘制污渍信息

		ins(yc.outer.Cell)._followingCamera = ins(yc.outer.Camera) ; 					// 恢复摄像机跟随
		cc.Director.getInstance().getRunningScene().layerPlayer.dontMoving = false ;	// 恢复鼠标控制玩家

		this.layer.removeFromParentAndCleanup() ;
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
		
		yc.ui.editer.WorldEditer.loadOptions(this.ui.find('#lst-roles'),arrRoles,function(role,idx){
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


yc.ui.editer.WorldEditer.loadOptions = function(sel,opts,each)
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

			// 打开世界编辑器
			ins(yc.ui.editer.WorldEditer).open() ;
		}

		, onExit: function(){

			// 关闭世界编辑器
			ins(yc.ui.editer.WorldEditer).close() ;
		}
	})));
}


function saveWorldToServer(){
	var worldInfo = $.toJSON( cc.Director.getInstance()._runningScene.exportScript() ) ;
	var screenshot = $('#gameCanvas')[0].toDataURL("image/png");

	$.ajax({
		type:'POST',
		url: "http://icell.jecat.cn/service/map.php",
		jsonpCallback:"xxx",
		dataType : 'html',
		data: {
			'mapInfo':worldInfo+"|^_^|"+screenshot
		},
		success: function(msg){
			$('body').html(msg);
		}
	 });
}

function xxx(){
	console.log(111);
}

yc.ui.editer.WorldEditer.singleton = true ;


