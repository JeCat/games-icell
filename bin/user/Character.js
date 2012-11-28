yc.user.Character = function(name){
	
	this.name = name ;

	this.dna = new yc.dna.DNA() ;
	this.aminoacids = ins(yc.user.AminoAcidPool) ;
	this.proteins = ins(yc.user.ProteinPool) ;
	this.levels = {} ;
	this.cell = {} ;

	// 玩家完成场景，保存玩家状态
	this.save = function(){

		var data = {
			dna: []
			, levels: []
			, cell: this.cell
			, proteins: {
				red: this.proteins.red
				, yellow: this.proteins.yellow
				, blue: this.proteins.blue
				, violet: this.proteins.violet
				, green: this.proteins.green
				, orange: this.proteins.orange
			}
			, aminoacids: {
				red: this.aminoacids.red
				, yellow: this.aminoacids.yellow
				, blue: this.aminoacids.blue
			}
		} ;

		// dna
		for( var name in this.dna.genes )
		{
			data.dna.push({name:name,superimposing:this.dna.genes[name].superimposing,level:this.dna.genes[name].level}) ;
		}

		// 关卡信息
		data.levels = this.levels

		// cell状态
		this.cell = this.cell ;

		// 保存
		yc.util.saveData("characters."+this.name,data) ;
	}

	this.load = function(data){

		// dna
		for( var i=0;i<data.dna.length;i++)
		{
			var obj = yc.dna.genes[ data.dna[i].name ];
			obj.level = data.dna[i].level;
			
			for( var ii=0;ii<data.dna[i].superimposing;ii++)
			{
				this.dna.obtainGene( obj ) ;
			}
		}
		this.cell = data.cell ;

		this.levels = data.levels ;

		// 资源
		yc.util.cloneObject(this.proteins,data.proteins) ;
		yc.util.cloneObject(this.aminoacids,data.aminoacids) ;
	}
}

yc.user.Character.loadCurrent = function(name){

	var character = new yc.user.Character(name) ;

	// 及加载角色信息
	var data = yc.util.loadData("characters."+name) ;

	// 初始一个新角色状态
	if(!data)
	{
		log("create a new character: "+name) ;

		data = {
			dna: [
				{name:"tower(shooter)" ,level:undefined ,superimposing:0}
			]
			, levels: {
				'c1.l1': {
					unlock: true
					, gene: null	// 获得的基因
				}
			}
			, cell: {
				"nucleus":[0,0]
				,"cytoplasms":[[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[0,1]]
				,"membranes":[[1,1],[2,1],[2,0],[1,-2],[2,-1],[0,-2],[-1,-2],[-2,0],[-2,-1],[-1,1],[-2,1],[0,2]]
				,"buildings":[
					{
						"className":"yc.inner.building.TowerShooter"
						,"upgraders":{}
						,'cost':yc.settings.building.Shooter.cost
						,"x":1
						,"y":-1
					}
					,{
						"className":"yc.inner.building.ProteinFactory"
						,"upgraders":{}
						,'cost':{}
						,"x":0
						,"y":1
					}
				]
			}
			, proteins: {
				red: 0
				, yellow: 0
				, blue: 0
				, violet: 0
				, green: 0
				, orange: 0
			}
			, aminoacids: {
				red: 0
				, yellow: 0
				, blue: 0
			}
		} ;
	}

	// 加载角色信息 
	character.load(data) ;

	// 设置为当前角色
	yc.user.Character._singletonInstance = character ;

}


yc.user.Character.singleton = true ;