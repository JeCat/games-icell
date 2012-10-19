

function moremoney(AminoAcid , Protein)
{
	if(!$.isNumeric(AminoAcid)){
		AminoAcid = 10;
	}
	if(!$.isNumeric(Protein)){
		Protein = 500;
	}
	//  氨基酸池
	ins(yc.inner.AminoAcidPool)
		.increase('red',AminoAcid)
		.increase('yellow',AminoAcid)
		.increase('blue',AminoAcid) ;
	//  蛋白质
	ins(yc.inner.ProteinPool).increase('red',Protein) ;
	ins(yc.inner.ProteinPool).increase('yellow',Protein) ;
	ins(yc.inner.ProteinPool).increase('blue',Protein) ;
	ins(yc.inner.ProteinPool).increase('orange',Protein) ;
	ins(yc.inner.ProteinPool).increase('green',Protein) ;
	ins(yc.inner.ProteinPool).increase('violet',Protein) ;
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
