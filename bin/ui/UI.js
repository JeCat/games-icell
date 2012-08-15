yc.ui.UI = function(){

	// 注册事件 ------------------------
	
	// 氨基酸池数量变化
	$(window).bind('onAfterAminoAcidChange',null,function(e,pool,type,num){
		$('.amino-acid-nums-'+type).text( '♪'+pool[type] ) ;
	}) ;
	
	// 合成蛋白质
	$( "#protein-composite-progress" ).progressbar({
		value: 59
	});
	
	this.showProteinComposion = function(){
		
		$("#dialog-protein-composite")
			.width(400).height(300)
			.css({
				top: ($(window).height()-300)/2
				, left: ($(window).width()-400)/2
				, position: 'absolute'
				, 'z-index': 100
			})
			.show() ;
	}
}
yc.ui.UI.ins = new yc.ui.UI ;
