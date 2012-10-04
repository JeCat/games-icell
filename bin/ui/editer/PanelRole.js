yc.ui.editer.PanelRole = function(editor){

	this.editor = editor ;
	var panel = this ;

	// 初始化 氨基酸 propslst
	$('#lst-roles-aminoacid').propslst({
		exchanges: {
			x: 'ipt-aminoacid-x'
			, y: 'ipt-aminoacid-y'
			, type: "sel-aminoacid-type"
			, num: "ipt-aminoacid-num" 
		}
		, onModelChnage: function(roleScript){
			// 将用户修改的数值，应用到场景里的对象中
			var eleOption = $(this).propslst('selectedOption') ;
			$(eleOption).data('object').initWithScript(roleScript) ;
		}
	}) ;



	// 刷新贴图列表
	this.refreshAminoAcids = function(){

		$('#lst-roles-aminoacid')
			.html('')
			.propslst('load',[scene.layerRoles.getChildren(),function(object){

				if( object.constructor!==yc.outer.AminoAcid )
				{
					log(object.constructor) ;
					return null ;
				}

				return {
					text: "[id:"+object.id+"] " + object.type + ':' + object.num
					, model: object._script
				}
			}]
		) ;
		
		return ;
	}



	this.createAminoAcid = function(type){


		editor.layer.touchCallback = function(touches,event){

			editer.layer.touchCallback = null ;

			cc.Director.getInstance().getRunningScene().initWithScript({
				aminoacids: [
					{
						type: 'red'
						, num: 10
						, x: yc.outer.Camera.screenPosX2WorldPosX(touches[0]._point.x)
						, y: yc.outer.Camera.screenPosY2WorldPosY(touches[0]._point.y)
					}
				]
			}) ;

			// 刷新贴图列表
			panel.refreshAminoAcids() ;

		}
	}

	this.removeAminoAcid = function(){

		var eleOpt = $('#lst-roles-aminoacid').propslst('selectedOption') ;
		var role = $(eleOpt).data('object') ;
		log(eleOpt,role)

		if(!eleOpt || !role)
		{
			alert("请选择需要移除的氨基酸") ;
			return ;
		}
		role.removeFromParentAndCleanup() ;

		// 刷新贴图列表
		this.refreshAminoAcids() ;
	}


	this.refreshAminoAcids() ;
}