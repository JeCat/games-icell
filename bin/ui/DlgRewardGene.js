yc.ui.DlgRewardGene = function(){
	
	this.ui = $('#dialog-killboss-reward') ;
	var dlg = this ;
	
	this.show = function(boss){
		
		this.ui.find('#reward-genes-outer').html('') ;
		
		for(var g=0;g<boss.genes.length;g++)
		{
			var gene = boss.genes[g] ;
			var geneUi = this.ui.find('#reward-gene-template').clone()
					.appendTo('#reward-genes-outer')
					.attr('id','') ;
			
			var title = gene.title ;
			// 显示等级
			var dna = ins(yc.dna.DNA) ;
			if(typeof(dna.genes[gene.name])!='undefined')
			{
				gene.title+= " Lv"+ (dna.genes[gene.name].superimposing+1) ;
			}
			
			geneUi.find('.title').html(gene.title) ;
			geneUi.find('.description').html(gene.description) ;
			geneUi.find('.btn-select')
				.data('gene',gene) 
				.click(function(){
					ins(yc.dna.DNA).obtainGene($(this).data('gene')) ;
					dlg.ui.hide() ;
				}) ;
			geneUi.show() ;
		}
		
		this.ui
			.css({
				top: ($(window).height()-300)/2
				, left: ($(window).width()-400)/2
				, position: 'absolute'
				, 'z-index': 100
			})
			.show() ;
		
	}
}