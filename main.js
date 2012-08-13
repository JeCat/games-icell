var YouCellGame = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    
    
    // setting
    settings: {
        inner: {
            
            // 六边形边长
            hexgonSideLength: 30
            // 六边形格子的最大层数
            , cellMaxLevels: 5
            // 六边形格子层数的游戏初始值
            , cellInitialLevels: 2
            
            // 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
            , totalHexgonLevels: 13
            
            , width: 600
            , height: 676
            
            // 细胞核
            , nucleus: {
                x: null
                , y: null
            }
            
            , dbg: true
        }
        , outerStage: {}
        
        , dbg: true
    } ,

    
    ctor:function (scene) {
        
        // 六边形格子 总共层数： 1(细胞核) + 2*(细胞膜) + 实际空间
        this.settings.inner.totalHexgonLevels = this.settings.inner.cellMaxLevels*2+1+2 ;
        
        // 细胞核 六边形的坐标
        this.settings.inner.nucleus.x = this.settings.inner.nucleus.y = this.settings.inner.cellMaxLevels+1 ;
        
        // 内部舞台的宽
        this.settings.inner.width = Math.ceil( 1.5 * this.settings.inner.hexgonSideLength * this.settings.inner.totalHexgonLevels + this.settings.inner.hexgonSideLength/2 ) ;
        
        // 内部舞台的高
        this.settings.inner.height = Math.ceil( Math.sqrt(3) * this.settings.inner.hexgonSideLength * this.settings.inner.totalHexgonLevels ) ;

        
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);
        cc.AudioEngine.getInstance().init("mp3,ogg");
        cc.Loader.shareLoader().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };
        cc.Loader.shareLoader().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
        cc.Loader.shareLoader().preload([
            {type:"image", src:"res/HelloWorld.png"},
            {type:"image", src:"res/CloseNormal.png"},
            {type:"image", src:"res/CloseSelected.png"}
        ]);
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
//     director->enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // create a scene. it's an autorelease object

        // run
        director.runWithScene(new this.startScene());

        return true;
    }
});


function log(message){
	console.log(message) ;
}

$(function(){
	$('#ui').width($(window).width()) ;
	
	startGame() ;
}) ;


function startGame(){
	
	$('#main-menu').hide() ;
	
	$('#gameCanvas')
		.css({left:0,top:0})
		.width($(window).width())
		.height($(window).height())
		.attr({
			width: $(window).width()
			, height: $(window).height()
		})
		[0].focus() ;
	
	
	game = new YouCellGame(yc.GameScene);
	dbg = false ;
	
	// webkitRequestAnimationFrame 似乎不太流畅
	if( window.requestAnimFrame === window.webkitRequestAnimationFrame )
	{
	   window.requestAnimFrame = null 
	}
	
	
	// 在ui上输出游戏状态
	setInterval(function(){
		
		var cell = cc.Director.getInstance()._runningScene.layerPlayer.cell ;
		var pos = cell.getPosition() ;
		var camera = yc.outer.Camera.ins() ;
		
		var output = 'left:' + pos.x + ', top:' + pos.y+'<br />' ;
		output+= 'player:'+cell.x+', '+cell.y + '<br />';
		output+= 'speed:'+ cell.speed + '<br />';
		output+= 'camera:'+camera.x+', '+camera.y + '<br />';
		$('#player-status').html(output) ;
		
	},500) ;
}


