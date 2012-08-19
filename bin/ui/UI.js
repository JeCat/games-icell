yc.ui.UI = function(){

    log('UI init') ;
    
    $('#menu-inner-layer-zoom').css('left',$(window).width()-$('#menu-inner-layer-zoom').width()-10) ;
    $('#debug-output').css('left',$(window).width()-$('#debug-output').width()-10) ;
    
	// 注册事件 ------------------------
	
	// 氨基酸池数量变化
	$(window).bind('yc.inner.AminoAcidPool::onAfterChange',null,function(e,pool,type,num){
		$('.aminoacid-num-'+type).text( '♪ '+pool[type] ) ;
	}) ;
	
	// 蛋白质池
    $(window).bind('yc.inner.ProteinFormulas::onAfterAppend',null,function(e,o,formula){
        $('#protein-pool-dashboard').append("<div class='protein-num protein-num-"+formula.name+"' style='color:"+formula.color+"'>♫ 0</div>") ;
    }) ;
    $(window).bind('yc.inner.ProteinPool::onAfterChange',null,function(e,pool,name,total,num){
        $('.protein-num-'+name).text( '♫ '+total ) ;
    }) ;
	
	
	// 合成蛋白质
	this.toggleProteinComposion = function(){
		
		$("#dialog-protein-composite")
			.width(400).height(300)
			.css({
				top: ($(window).height()-300)/2
				, left: ($(window).width()-400)/2
				, position: 'absolute'
				, 'z-index': 100
			})
			.toggle() ;
	}
}
yc.ui.UI.ins = new yc.ui.UI ;
