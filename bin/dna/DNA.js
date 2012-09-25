yc.dna.DNA = function(){
	
	this.genes = {}
	
	this.obtainGene = function(gene){
		
		// 生效
		gene.takeEffect() ;
		
		if( typeof(this.genes[gene.name])=='undefined' )
		{
			this.genes[gene.name] = gene ;
		}
	}
}
yc.dna.DNA.className = 'yc.dna.DNA' ;
