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

	// 初始化 viruscluster propslst
	$('#lst-roles-virusclusters').propslst({
		exchanges: {
			x: 'ipt-viruscluster-x'
			, y: 'ipt-viruscluster-y'
		}
		, onModelChnage: function(roleScript){
			// 将用户修改的数值，应用到场景里的对象中
			// var eleOption = $(this).propslst('selectedOption') ;
			// $(eleOption).data('object').initWithScript(roleScript) ;
		}
	}) ;


	// -----------------------------------
	// for amino acid 

	// 刷新氨基酸列表
	this.refreshAminoAcids = function(){

		$('#lst-roles-aminoacid')
			.html('')
			.propslst('load',[scene.layerRoles.getChildren(),function(object){

				if( object.constructor!==yc.outer.AminoAcid )
				{
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
						, x: touches[0]._point.wx
						, y: touches[0]._point.wy
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



	// -----------------------------------
	// for virus cluster

	this.refreshVirusCluster = function(){
		$('#lst-roles-virusclusters')
			.html('')
			.propslst('load',[scene.layerRoles.getChildren(),function(object){

				if( object.constructor!==yc.outer.VirusCluster )
				{
					log(object.constructor) ;
					return null ;
				}

				return {
					text: "[id:"+object.id+"]"
					, model: object._script
				}
			}]
		) ;
		
		return ;
	}

	this.createVirusCluster = function(){


		editor.layer.touchCallback = function(touches,event){

			editer.layer.touchCallback = null ;

			cc.Director.getInstance().getRunningScene().initWithScript({
				virusclusters: [ {
					x: touches[0]._point.wx
					, y: touches[0]._point.wy
			  		, turnRate: 0.04			// 转向灵敏度
					, moseySpeed: 2				// 漫步速度
					, normalSpeed: 5			// 正常速度
					, vigilanceRange: 200		// 警视范围
					, viruses: [
						{}
					]
					, boss: false 				// 是否是一个boss
					, killdown:[				// 击杀后掉落的 dna
						"..."
						, "..."
						, "..."
					]
				} ]
			}) ;

			// 刷新贴图列表
			panel.refreshVirusCluster() ;

		}
	}



	this.refreshAminoAcids() ;
}