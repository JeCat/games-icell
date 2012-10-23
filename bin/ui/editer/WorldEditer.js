yc.ui.editer.WorldEditer = function(){

	this.ui = $('#world-editer').appendTo("#editor-panel-space") ;
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
		
		// 解锁全部 genes
		this.unlockGenes();

		// 打开ui
		this.ui.show() ;
		$("#editor-panel-space").width(300) ;
		ICellGame.instance.resize() ;
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

		this.layer.removeFromParentAndCleanup() ;
		
		// 恢复 genes
		this.relockGenes();

		// 关闭ui
		$("#editor-panel-space").width(0) ;
		ICellGame.instance.resize() ;
	}
	
	this.message = function(msg){
		this.ui.find('#worldediter-message').html(msg) ;
	}
	
	// genes
	this.unlockGenes = function() {
		this._restoreGenes = yc.charactar.dna.genes;
		
		var i , j;
		for( j=0 ; j<100 ; ++j ){
			for( i in yc.dna.genes){
				yc.charactar.dna.obtainGene(yc.dna.genes[i]) ;
			}
		}
	}
	this.relockGenes = function() {
		yc.charactar.dna.genes = this._restoreGenes;
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
				ins(yc.inner.AminoAcidPool).increase(color[i],num);
			}
		}else{
			ins(yc.inner.AminoAcidPool).increase(color,num);
		}
	}
	this.increaseProtein = function(o){
		var color = getSelectCollor(o);
		var num = getIncreaseNum(o);
		
		if( 'object' == typeof color ){
			var i;
			for(i in color){
				ins(yc.inner.ProteinPool).increase(color[i],num);
			}
		}else{
			ins(yc.inner.ProteinPool).increase(color,num);
		}
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

			var userInfo = unEncryptUserInfo(icell_userInfo);

			$.each( json , function(v,b){

				var li = $("<div class='mapListDiv_list_li'>"
							+ "<a href='#' onclick='initMap("+b['mid']+");return false;' class='mapListDiv_list_a'>"+b['mapname']+"</a><br/>"
							+ "<span class='mapListDiv_list_span'>"+b['createTime']+"</span><br/>"
							+ "<img class='mapListDiv_thumb' src='"+b['thumbName']+"'/>"
						+ "</div>");

				//map owner ?
				if(b['uid'] == userInfo['uid'] && b['service'] == userInfo['service']){
					li.find('.mapListDiv_list_span').after('<a class="mapListDiv_list_a" href="#" onclick="editMap('+b['mid']+');return false;">edit</a>');
				}

				$('#mapListDiv_list').append(li);
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

			$("#mapListDiv").dialog("close");
		}
	});
}

function editMap(mid){
	initMap(mid);
	ins(yc.ui.editer.WorldEditer).open() ;
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

//快捷键
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


yc.ui.editer.WorldEditer.singleton = true ;
