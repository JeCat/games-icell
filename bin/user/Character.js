yc.user.Character = function(){
	
	this.name = "_me" ;

	this.dna = new yc.dna.DNA() ;
	this.levels = [] ;
	this.cell = {} ;
	this.aminoacids = new yc.user.AminoAcidPool ;
	this.proteins = new yc.user.ProteinPool ;

	// 玩家进入场景，初始化玩家状态
	this.enter = function(){

	}

	// 玩家完成场景，保存玩家状态
	this.save = function(){

		var data = {
			dna: [] 
		} ;

		// dna
		for( var name in this.dna.genes )
		{
			data.dna.push(name) ;
		}

		// 解锁level


		// cell状态


		// 资源池
	}
}


yc.user.Character.loadCurrent = function(){

	var character = new yc.user.Character() ;

	// 初始状态
	character.dna.obtainGene(yc.dna.genes['tower(shooter)']) ;

	// 设置为当前角色
	yc.user.Character._singletonInstance = character ;
}
