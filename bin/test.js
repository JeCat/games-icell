

function moremoney()
{
	//  氨基酸池
	ins(yc.inner.AminoAcidPool)
		.increase('red',10)
		.increase('yellow',10)
		.increase('blue',10) ;
	//  蛋白质
	ins(yc.inner.ProteinPool).increase('red',500) ;
	ins(yc.inner.ProteinPool).increase('yellow',500) ;
	ins(yc.inner.ProteinPool).increase('blue',500) ;
	ins(yc.inner.ProteinPool).increase('orange',500) ;
	ins(yc.inner.ProteinPool).increase('green',500) ;
	ins(yc.inner.ProteinPool).increase('violet',500) ;
}

function newVirusCluster(){
	var cell = ins(yc.inner.Cell) ;
	
	var v = yc.util.ObjectPool.ins(yc.outer.VirusCluster ).ob() ;
	v.x = cell.x + 100 ;
	v.y = cell.y + 100 ;
	v.init() ;
	
	cc.Director.getInstance()._runningScene.layerEnemies.addChild(v) ;
}

function testVirusRun(startX,startY){
	
	var layer = ins(yc.inner.monster.VirusLayer) ;
	var virus = layer.createVirusSprite() ;
	
	virus.run(startX,startY) ;
	
}
