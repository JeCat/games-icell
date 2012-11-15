yc.ui.editer.WorldEditer = function(){

	this.ui = $('#world-editer').appendTo("#editor-panel-space") ;
	$('#tabs-world-editer').tabs() ;
	
	this.stain = new yc.ui.editer.PanelStain(this) ;
	this.pinup = new yc.ui.editer.PanelPinup(this) ;
	this.role = new yc.ui.editer.PanelRole(this) ;
	editer = this ;

	// 辅助层
	this.layer = new yc.ui.editer.WorldEditerLayer(this) ;

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


		ins(yc.outer.Camera).bBoundaryOverflow = true ; 	// 允许镜头溢出

		// 缩放范围
		ins(yc.outer.Camera).maxZoom = 3 ;
		ins(yc.outer.Camera).minZoom = 0.02 ;

		// 辅助层
		cc.Director.getInstance().getRunningScene().addChild( this.layer ) ;
		
		// 解锁全部 genes
		this.unlockGenes();

		// 刷新一下内容
		this.refresh() ;

		// 打开ui
		this.ui.show() ;
		$("#editor-panel-space").show();
		$("#editor-panel-space").width(420) ;
		ICellGame.instance.resize() ;
		
		// 世界边界
		this.loadSceneBorder() ;
	}

	this.close = function() {

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

		ins(yc.outer.Camera).bBoundaryOverflow = false ; 	// 禁止镜头溢出

		// 缩放范围
		ins(yc.outer.Camera).maxZoom = yc.settings.camera.defautlMaxZoom ;
		ins(yc.outer.Camera).minZoom = yc.settings.camera.defautlMinZoom ;

		// 辅助层
		this.layer.removeFromParent() ;
		
		// 恢复 genes
		this.relockGenes();

		// 关闭ui
		$("#editor-panel-space").width(0) ;
		ICellGame.instance.resize() ;
	}

	this.refresh = function(){
		this.refreshRoles() ;
		this.refreshSettings() ;
		this.role.refreshAminoAcids() ;
		this.role.refreshVirusCluster() ;
		this.stain.refreshStains() ;
		this.pinup.refreshPinups() ;

		// 刷新动画
		$("select.animations-list").each(function(){
			for(var name in yc.animations.frames)
			{
				$(this).append("<option value=\""+name+"\">"+name+"</option>") ;
			}
		}) ;
	}
	
	this.message = function(msg){
		this.ui.find('#worldediter-message').html(msg) ;
	}
	
	// genes
	this.unlockGenes = function() {
		this._restoreGenes = ins(yc.user.Character).dna.genes;
		
		var i , j;
		for( j=0 ; j<100 ; ++j ){
			for( i in yc.dna.genes){
				ins(yc.user.Character).dna.obtainGene(yc.dna.genes[i]) ;
			}
		}
	}
	this.relockGenes = function() {
		ins(yc.user.Character).dna.genes = this._restoreGenes;
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
	
	
	function getSelectCollor(o){
		var parent = jQuery(o).parent();
		var select = parent.find('select');
		
		var c = select.val();
		if( 'all' == c ){
			var options = select.get(0).options ;
			var arrOptions = [];
			var i;
			for(i=0;i<options.length;++i){
				if( 'all' != options[i].value ){
					arrOptions[i] = options[i].value;
				}
			}
			return arrOptions;
		}
		return c;
	}
	function getIncreaseNum(o){
		var parent = jQuery(o).parent();
		var input = parent.find('input');
		var c = input.val();
		return parseInt(c);
	}
	this.increaseAminoAcid = function(o){
		var color = getSelectCollor(o);
		var num = getIncreaseNum(o);
		
		if( 'object' == typeof color ){
			var i;
			for(i in color){
				ins(yc.user.Character).aminoacids.increase(color[i],num);
			}
		}else{
			ins(yc.user.Character).aminoacids.increase(color,num);
		}
	}
	this.increaseProtein = function(o){
		var color = getSelectCollor(o);
		var num = getIncreaseNum(o);
		
		if( 'object' == typeof color ){
			var i;
			for(i in color){
				ins(yc.user.Character).proteins.increase(color[i],num);
			}
		}else{
			ins(yc.user.Character).proteins.increase(color,num);
		}
	}
	
	var _sceneBorderNameList = ['top','btm','lft','rgt'];
	this.loadSceneBorder = function(){
		var i,name;
		for( i in _sceneBorderNameList ){
			name = _sceneBorderNameList[i] ;
			jQuery('#scene_'+name).val( scene[name] );
		}
	}
	this.setSceneBorder = function(){
		var i,name;
		for( i in _sceneBorderNameList ){
			name = _sceneBorderNameList[i] ;
			scene[name] = parseInt( jQuery('#scene_'+name).val() );
		}
		scene.reCreateWalls() ;
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
			.attr('selected',info.selected)
			.click(function(){
				$(this).data('info').click($(this).data('object')) ;
			}) ;

		if( info.selected )
		{
			optUi[0].click() ;
		}
	}
}

yc.levels.creater = {
	onEnter: function(){
		// 打开世界编辑器
		ins(yc.ui.editer.WorldEditer).open() ;
	}

	, onExit: function(){

		// 关闭世界编辑器
		ins(yc.ui.editer.WorldEditer).close() ;
	}
};

function worldList(){
	var worldListDiv = $("#worldListDiv");
	$('#worldListDiv_list').html('');

	$.getJSON(
		"http://icell.jecat.cn/service/world.php?format=json&jsoncallback=?"
		, {'act':'list'} 
		, function(json){

			var userInfo = unEncryptUserInfo(icell_userInfo);

			$.each( json , function(v,b){

				var li = $("<div class='worldListDiv_list_li' style='float: left;width: 170px;height: 140px;margin:3px;padding:2px;border:1px gray solid;'>"
							+ "<a href='#' onclick='initWorld("+b['wid']+");return false;' class='worldListDiv_list_a'>"+b['worldname']+"</a><br/>"
							+ "<span class='worldListDiv_list_span'>"+b['createTime']+"</span><br/>"
							+ "<img class='worldListDiv_thumb' src='http://icell.jecat.cn/thumb/"+b['thumbName']+"'/>"
						+ "</div>");

				//world owner ?
				if(b['uid'] == userInfo['uid'] && b['service'] == userInfo['service']){
					li.find('.worldListDiv_list_span').after('<a class="worldListDiv_list_a" href="#" onclick="initWorld('+b['wid']+' , true);return false;">edit</a>');
				}

				$('#worldListDiv_list').append(li);
			});
		}
	);

	worldListDiv.dialog({
		title: 'world list'
		, width:800
		, height:500
	});

}

function initWorld(wid , edit){
	$.getJSON(
		"http://icell.jecat.cn/service/world.php?format=json&jsoncallback=?"
		, {
			'act':'data'
			, 'wid':wid
		}
		, function(json){

			cc.Director.getInstance().replaceScene(new (yc.GameScene.extend({
				onEnter: function(){
					this._super() ;

					
					this.initWithScript(json);

					yc.GameScene._level = wid;
					// 瓶子
					yc.outer.Bottles.all(wid);

					if(edit)
					{
						ins(yc.ui.editer.WorldEditer).open() ;
					}
				}
			})));

			$("#worldListDiv").dialog("close");
		}
	);

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

	var worldName = prompt('please input world name');
	if(!worldName){
		$('#saveWorldMsg').html('<span id="aSaveWorldMsg">You must tell us what the world name is , save failed!</span>');
		setTimeout(function(){
			$("#aSaveWorldMsg").remove();
		}
		,msgTimeout);
		return;
	}

	
	$("#saveIframe").contents().find("#act").val("save");
	$("#saveIframe").contents().find("#worldInfo").val(worldInfo+"|^_^|"+screenshot);
	$("#saveIframe").contents().find("#userInfo").val(icell_userInfo);
	$("#saveIframe").contents().find("#worldName").val(worldName);
	$("#saveIframe").contents().find("#saveWorldToServerForm").submit();
	
	return;
	
	
	$.ajax({
		type:'POST',
		url: "http://icell.jecat.cn/service/world.php",
		dataType : 'json',
		data: {
			'act':'save'
			, 'worldInfo':worldInfo+"|^_^|"+screenshot
			, 'userInfo' : icell_userInfo
			, 'worldName' : worldName
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

//快捷键
if(g_architecture=='html5')
{
	$('body , canvas').keydown(function(event){
		switch(event.keyCode) {
			case 107:
			case 187:
				ins(yc.ui.editer.WorldEditer).stain.createStainPoint();
				break;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				if(!event.ctrlKey){
					return;
				}
				var index = event.keyCode - 48;
				var option = $("#lst-stain-points option").get(index);
				if(option){
					option.click();
					$("#btn-stain-position").click();
				}else{
					return;
				}

				break;
				
			default : 
				// do nothing 
		}
	});
}


yc.ui.editer.WorldEditer.singleton = true ;
