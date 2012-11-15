

function moremoney(AminoAcid , Protein)
{
	if(!$.isNumeric(AminoAcid)){
		AminoAcid = 100;
	}
	if(!$.isNumeric(Protein)){
		Protein = 500;
	}
	//  氨基酸池
	ins(yc.user.Character).aminoacids.increase('red',AminoAcid)
	ins(yc.user.Character).aminoacids.increase('yellow',AminoAcid)
	ins(yc.user.Character).aminoacids.increase('blue',AminoAcid)

	//  蛋白质
	ins(yc.user.Character).proteins.increase('red',Protein) ;
	ins(yc.user.Character).proteins.increase('yellow',Protein) ;
	ins(yc.user.Character).proteins.increase('blue',Protein) ;
	ins(yc.user.Character).proteins.increase('orange',Protein) ;
	ins(yc.user.Character).proteins.increase('green',Protein) ;
	ins(yc.user.Character).proteins.increase('violet',Protein) ;
}

function newVirusCluster(){
	var cell = ins(yc.inner.Cell) ;
	
	var v = yc.util.ObjectPool.ins(yc.outer.VirusCluster ).ob() ;
	v.x = cell.x + 100 ;
	v.y = cell.y + 100 ;
	v.init() ;
	
	cc.Director.getInstance().getRunningScene().layerEnemies.addChild(v) ;
}

function testVirusRun(startX,startY){
	
	var layer = ins(yc.inner.monster.VirusLayer) ;
	var virus = layer.createVirusSprite() ;
	
	virus.run(startX,startY) ;
	
}

function resize(w,h){

	var director = cc.Director.getInstance() ;
	director.getWinSize() ;


		//缩放比例
		var xScale = cc.canvas.width / cc.originalCanvasSize.width;

		yc.util.drawLine(
				[0,0],[1000,1000]
		        , $("#gameCanvas")
					//.width(w)
					//.height(h)
		       		.attr("width",w)
		       		.attr("height",h)
		       		[0].getContext('2d')
	   			, "red" ) ;

	/*$("#gameCanvas")
		.width(w)
		.height(h)
		.attr({
			width: w
			, height: h
		}) ;*/

    //director._winSizeInPixels = director._winSizeInPoints = cc.size(w,h) ;
    //director._winSizeInPixels = cc.size(director._winSizeInPoints.width * this._contentScaleFactor, director._winSizeInPoints.height * this._contentScaleFactor);
}

function test1(){

	var c = yc.dbg.canvasContextWapper.create() ;

	yc.event.register(c,"before_translate",function(x,y){

		yc.util.drawCircle(this,x,y,5,5,"green") ;

		if(x>500&&x<1000)
		{
			log("before_translate:"+x,","+y)
		}
	})
}


function traceNode(node){
	while(node && node!==undefined){

		var archor = node.getAnchorPoint() ;
		//log(node) ;
		log(node.constructor.className+"//anchor:"+archor.x+","+archor.y+"; ") ;

		node = node._parent ;
	}
}


function moregene(name){
	ins(yc.user.Character).dna.obtainGene( yc.dna.genes[name] ) ;
	log(yc.dna.genes,ins(yc.user.Character).dna)
}

function unlockAll(){
	for(var name in yc.dna.genes){
		ins(yc.user.Character).dna.obtainGene( yc.dna.genes[name] ) ;
	}
	log('unlock all towers');
}

function savecell(){
	ins(yc.user.Character).cell = ins(yc.inner.Cell).exportScript() ;
	ins(yc.user.Character).save() ;
}

