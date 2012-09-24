



var YouCellGame = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    
    ctor:function (scene) {
        
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
            {type:"image", src:"res/HelloWorld.png"}
            , {type:"image", src:"res/CloseNormal.png"}
            , {type:"image", src:"res/CloseSelected.png"}
            
            , {type:"image", src:"res/btn-composition.png"}
            , {type:"image", src:"res/btn-composition-selected.png"}
            , {type:"image", src:"res/pin_map.png"}
            , {type:"image", src:"res/virus24.png"}
            , {type:"image", src:"res/boss-a-48.png"}
            , {type:"image", src:"res/boss-a-24.png"}
            , {type:"image", src:"res/mitochondria.png"}
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

$(function(){
	$('#ui').width($(window).width()) ;
	
	startGame() ;
}) ;


function startGame(){
	
	$('#main-menu').hide() ;
	
    var w = $(window).width() ;
    var h = $(window).height() ;
   // w = h = 500 ;
	$('#gameCanvas')
		.css({left:0,top:0})
		.width(w)
		.height(h)
		.attr({
			width: w
			, height: h
		})
		[0].focus() ;
	
	
	game = new YouCellGame(yc.levels.LevelSelector);
	
	// webkitRequestAnimationFrame 似乎不太流畅
	if( window.requestAnimFrame === window.webkitRequestAnimationFrame )
	{
	   window.requestAnimFrame = null 
	}
}


