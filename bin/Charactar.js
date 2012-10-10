yc.Charactar = function(){
	
	// 初始 dna
	this.dna = new yc.dna.DNA() ;
	this.dna.obtainGene(yc.dna.genes['tower(shooter)']) ;

	// 初始关卡
	// todo ...
}

yc.charactar = new yc.Charactar() ;
