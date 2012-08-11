function UI(){
	
	if(!UI.ins)
	{
		UI.ins = this ;
	}
	
	// 注册事件 ------------------------
	
	// 氨基酸池数量变化
	$(window).bind('onAfterAminoAcidChange',null,function(e,pool,type,num){
		$('#amino-acid-nums-'+type).text( pool[type] ) ;
	}) ;
}
UI.ins = null ;
