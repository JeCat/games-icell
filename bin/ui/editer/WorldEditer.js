yc.ui.editer.WorldEditer = function(){

	this.ui = $('#dlg-world-editer')
				.height($(window).height())
				.show() ;
	$('#tabs-world-editer').tabs() ;
	
	this.stain = new yc.ui.editer.PanelStain(this) ;
	this.pinup = new yc.ui.editer.PanelPinup(this) ;
	this.role = new yc.ui.editer.PanelRole(this) ;
	editer = this ;

	// 辅助层
	this.layer = new yc.ui.editer.WorldEditerLayer() ;

	this.open = function(){
		this.ui.show() ;

		// 进入状态
		yc.settings.player.nohurt = true ;		// 无敌
		yc.settings.player.stealth = true ;		// 隐身
		yc.settings.outer.stain.dbg = true ;	// 绘制污渍信息
		yc.settings.outer.aminoacid.dbgInfo = true ;
		yc.settings.outer.virus.dbgInfo = true ;

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
		yc.settings.outer.aminoacid.dbgInfo = false ;
		yc.settings.outer.virus.dbgInfo = false ;

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

	$("#mapListDiv").dialog("close");
}

function mapList(){
	var mapListDiv = $("#mapListDiv");
	$('#mapListDiv_list').html('');
	$.ajax({
		type:'POST',
		url: "http://icell.jecat.cn/service/map.php",
		dataType : 'json',
		data: {
			'act':'list'
		},
		success: function(json){
			$.each( json , function(v,b){
				$('#mapListDiv_list').append(
					  "<div class='mapListDiv_list_li'>"
						+ "<a href='#' onclick='initMap("+b['mid']+");return false;' class='mapListDiv_list_a'>"+b['mapname']+"</a><br/>"
						+ "<span class='mapListDiv_list_span'>"+b['createTime']+"</span><br/>"
						+ "<img class='mapListDiv_thumb' src='"+b['thumbName']+"'/>"
					+ "</div>"
				);
			});
		}
	});


	mapListDiv.dialog({
		title: 'map list'
		, width:800
		, height:500
	});

}

function initMap(mid){
	$.ajax({
		type:'POST',
		url: "http://icell.jecat.cn/service/map.php",
		dataType : 'json',
		data: {
			'act':'data'
			, 'mid':mid
		},
		success: function(json){

			cc.Director.getInstance().replaceScene(new (yc.GameScene.extend({
				onEnter: function(){
					this._super() ;

					this.initWithScript(json);
				}
			})));

		}
	});
}

function saveWorldToServer(){

	$("#aSaveWorldMsg").remove();

	var worldInfo = $.toJSON( cc.Director.getInstance()._runningScene.exportScript() ) ;
	var screenshot = $('#gameCanvas')[0].toDataURL("image/png");

	var msgTimeout = 30000;

	if(!icell_userInfo){
		$('#saveWorldMsg').html('<span id="aSaveWorldMsg">user info is missing , save failed!</span>');
		setTimeout(function(){
			$("#aSaveWorldMsg").remove();
		}
		,msgTimeout);
		return;
	}

	var mapName = prompt('please input map name');
	if(!mapName){
		$('#saveWorldMsg').html('<span id="aSaveWorldMsg">You must tell us what the map name is , save failed!</span>');
		setTimeout(function(){
			$("#aSaveWorldMsg").remove();
		}
		,msgTimeout);
		return;
	}

	$.ajax({
		type:'POST',
		url: "http://icell.jecat.cn/service/map.php",
		dataType : 'json',
		data: {
			'act':'save'
			, 'mapInfo':worldInfo+"|^_^|"+screenshot
			, 'userInfo' : icell_userInfo
			, 'mapName' : mapName
		},
		beforeSent: function(){
			$('#saveWorldMsg').html('<span id="aSaveWorldMsg">saving...</span>');
		},
		success: function(json){
			var msg = json['msg'];
			$('#saveWorldMsg').html('<span id="aSaveWorldMsg">'+msg+'</span>');
			setTimeout(function(){
				$("#aSaveWorldMsg").remove();
			}
			,msgTimeout);
		}
	});
}

yc.ui.editer.WorldEditer.singleton = true ;


//快捷键
$('body , canvas').keydown(function(event){
	switch(event.keyCode) {
		case 107:
		case 187:
			ins(yc.ui.editer.WorldEditer).stain.createStainPoint();
			break;
	}
});
