
// 随机将一些格子堵住
function randomBlock(){
	
	var cell = yc.inner.Cell.ins() ;
			
	for(var i=0;i<cell.cytoplasms.length;i++)
	{
		var hexgon = cell.cytoplasms[i] ;

		if( Math.random()>0.7 )
		{
			hexgon.block = true ;
		}
	}
	
	// 重新计算最优路径
	cell.researchPath() ;
}

function testVirusRun(startX,startY){
    
    var layer = yc.inner.monster.VirusLayer.ins() ;
    var virus = layer.createVirusSprite() ;
    
    virus.run(startX,startY) ;
	
}
