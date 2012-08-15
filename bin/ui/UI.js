yc.ui.UI = function(){

	// 注册事件 ------------------------
	
	// 氨基酸池数量变化
	$(window).bind('onAfterAminoAcidChange',null,function(e,pool,type,num){
		$('.amino-acid-nums-'+type).text( '♪'+pool[type] ) ;
	}) ;
}
yc.ui.UI.ins = new yc.ui.UI ;
