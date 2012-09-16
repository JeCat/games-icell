yc.util.DbgPannel = function(){

	var pannel = this ;
	this.output = {} ;

	// 在ui上输出游戏状态
	setInterval(function(){
		output = '' ;
		for(var key in pannel.output){
			output+= key+': '+pannel.output[key]+'<br />';
		}
		$('#player-status').html(output) ;
		
	},500) ;

}