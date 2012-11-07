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
			, spriter: 'sel-viruscluster-spriter'
			, turnRate: 'ipt-viruscluster-turnRate'
			, moseySpeed: 'ipt-viruscluster-moseySpeed'
			, normalSpeed: 'ipt-viruscluster-normalSpeed'
			, vigilanceRange: 'ipt-viruscluster-vigilanceRange'
			, size: 'ipt-viruscluster-size'
			, unlockLevel: 'ipt-viruscluster-unlock-level'
			, dna: 'lst-boss-dna'
		}
		, onModelChnage: function(roleScript){
			// 将用户修改的数值，应用到场景里的对象中
			var eleOption = $(this).propslst('selectedOption') ;
			$(eleOption).data('object').initWithScript(roleScript) ;
		}
	}) ;

	// 初始化 virus propslst
	$('#lst-roles-virus-queue').propslst({
		exchanges: {
			hp: 'ipt-virus-hp'
			, speed: 'ipt-virus-speed'
			, wait: 'ipt-virus-wait'
			, spriter: 'ipt-virus-spriter'
			, offsetx: 'ipt-virus-offsetx'
			, offsety: 'ipt-virus-offsety'
			, flop: 'sel-virus-flop'
			, flopNum: 'ipt-virus-flop-num'
		}
	}) ;

	// 初始化 boss dna 菜单
	$("#lst-boss-dna").html("") ;
	for(var name in yc.dna.genes){
		var gene = yc.dna.genes[name] ;
		$("#lst-boss-dna").append("<option value='"+gene.name+"'>"+gene.title+"</option>") ;
	}


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
		role.removeFromParent() ;

		// 刷新氨基酸列表
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
					return null ;
				}

				return {
					text: "[id:"+object.id+"]"
					, model: object._script
					, click: function(option,script){
						// 加载病毒群中的病毒队列
						panel.refreshVirusQueue() ;
					}
				}
			}]
		) ;
		
		return ;
	}

	this.createVirusCluster = function(){


		editor.layer.touchCallback = function(touches,event){

			editer.layer.touchCallback = null ;
			
			var script = {
				virusclusters: [ {
					x: touches[0]._point.wx
					, y: touches[0]._point.wy
			  		, turnRate: 0.2					// 转向灵敏度
					, moseySpeed: 2					// 漫步速度
					, normalSpeed: 5				// 正常速度
					, vigilanceRange: 200			// 警视范围
					, viruses: []
					, boss: false 					// 是否是一个boss
					, killdown:[]
					, spriter: "role.virus_a"
					, size: yc.settings.outer.virus.defaultSize
					, unlockLevel: null //'c1.l1'
				} ]
			} ;
			for(var i=0; i<10; i++)
			{
				var shakeRange = yc.settings.inner.hexgonSideLength/4 ;

				script.virusclusters[0].viruses.push( {
					spriter: 'res/virus16.png'
					, wait: 1
					, speed: 15
					, hp: 10
					, offsetx: Math.round( (shakeRange - shakeRange*2*Math.random())*100 ) / 100
					, offsety: Math.round( (shakeRange - shakeRange*2*Math.random())*100 ) / 100
					, flop: yc.user.AminoAcidPool.types[ 0|(Math.random()*(yc.user.AminoAcidPool.types.length)) ]
					, flopNum: 0|Math.random()*11
				} ) ;
			}

			cc.Director.getInstance().getRunningScene().initWithScript(script) ;

			// 刷新病毒群列表
			panel.refreshVirusCluster() ;

		}
	}

	this.removeVirusCluster = function(){
		//var selCluster = $('#lst-roles-virusclusters').propslst('selectedObject') ;
		var selClusterIdx = $('#lst-roles-virusclusters')[0].selectedIndex ;
		var opt = $('#lst-roles-virusclusters')[0].options[selClusterIdx] ;
		var viruscluster = $(opt).data('object') ;

		// 删除对象
		viruscluster.removeFromParent() ;

		this.refreshVirusCluster() ;
	}

 	this.copyVirusCluster = function(){
		var selClusterScript = $('#lst-roles-virusclusters').propslst('selectedModel') ;
		if( !selClusterScript )
		{
			alert("请选择病毒群") ;
			return ;
		}

		var newModel = {} ;
		yc.util.cloneObject(newModel,selClusterScript) ;

		cc.Director.getInstance().getRunningScene().initWithScript( {virusclusters:[newModel]} ) ;

		// 刷新病毒群列表
		panel.refreshVirusCluster() ;
	}

	// -----------------------------------
	// for virus

	this.refreshVirusQueue = function(){
		var selClusterScript = $('#lst-roles-virusclusters').propslst('selectedModel') ;
		if(!selClusterScript)
		{
			return ;
		}

		$('#lst-roles-virus-queue')
			.html('')
			.propslst('load',[selClusterScript.viruses,function(object,idx){
				return {
					text: "["+idx+"] " + object.wait + ' sec/ hp:' + object.hp + '/ speed:' + object.speed
					, model: object
				}
			}]
		) ;

		$('#spn-virus-num').html('Num:'+selClusterScript.viruses.length) ;
 	}

 	this.removeVirus = function(){
		var selClusterScript = $('#lst-roles-virusclusters').propslst('selectedModel') ;
		var selVirusIdx = $('#lst-roles-virus-queue')[0].selectedIndex ;
		if( !selClusterScript || selVirusIdx<0 )
		{
			alert("请选择病毒群中的病毒") ;
			return ;
		}

		selClusterScript.viruses.splice(selVirusIdx,1) ;

		// 加载病毒群中的病毒队列
		panel.refreshVirusQueue() ;
 	}

 	this.copyVirus = function(){
		var selClusterScript = $('#lst-roles-virusclusters').propslst('selectedModel') ;
		var selVirusIdx = $('#lst-roles-virus-queue')[0].selectedIndex ;
		if( !selClusterScript || selVirusIdx<0 )
		{
			alert("请选择病毒群中的病毒") ;
			return ;
		}

		var newModel = {} ;
		yc.util.cloneObject(newModel,selClusterScript.viruses[selVirusIdx]) ;

		selClusterScript.viruses.splice(selVirusIdx+1,0,newModel) ;

		// 加载病毒群中的病毒队列
		panel.refreshVirusQueue() ;
	}

 	this.order = function(step){
		var selClusterScript = $('#lst-roles-virusclusters').propslst('selectedModel') ;
		var selVirusIdx = $('#lst-roles-virus-queue')[0].selectedIndex ;
		if( !selClusterScript || selVirusIdx<0 )
		{
			alert("请选择病毒群中的病毒") ;
			return ;
		}

		if(selClusterScript.viruses.length<=selVirusIdx+step)
		{
			return ;
		}

		var target = selClusterScript.viruses.splice(selVirusIdx+step,1) ;
		selClusterScript.viruses.splice(selVirusIdx,0,target[0]) ;

		// 加载病毒群中的病毒队列
		panel.refreshVirusQueue() ;
	}

}