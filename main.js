
var ICellGame = cc.Application.extend({
	config:document.querySelector('#cocos2d-html5')['c'],
	
	ctor:function (scene) {
		
		this._super();
		this.startScene = scene;
		cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
		cc.setup(this.config['tag']);
		cc.AudioEngine.getInstance().init("mp3,ogg");
		cc.Loader.getInstance().onloading = function () {
			cc.LoaderScene.getInstance().draw();
		};
		cc.Loader.getInstance().onload = function () {
			log("resources loaded") ;
			cc.AppController.shareAppController().didFinishLaunchingWithOptions();

			// 资源加载完成，初始化动画列表
			yc.animations.initBuildinAnimations() ;
		};
		cc.Loader.getInstance().preload(g_ResFiles);
	},
	applicationDidFinishLaunching:function () {
		// initialize director
		var director = cc.Director.getInstance();

		// enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
//	 director->enableRetinaDisplay(true);

		// turn on display FPS
		director.setDisplayStats(this.config['showFPS']);

		// set FPS. the default value is 1.0/60 if you don't call this
		director.setAnimationInterval(1.0 / this.config['frameRate']);

		// create a scene. it's an autorelease object

		// run
		director.runWithScene(new this.startScene());


		//Game.Func.getInstance().adjustSizeForWindow();
		var app = this ;
		$(window).resize(function () {
			app.resize() ;
		});
		this.resize() ;

		return true;
	}
	
	, resize: function(){

		$("#editor-panel-space").height($(window).height()) ;

		cc.canvas.width = $(window).width() - $("#editor-panel-space").width() - 2 ;
		cc.canvas.height = $(window).height() ;

		$("#Cocos2dGameContainer")
				.width(cc.canvas.width)
				.height(cc.canvas.height)

		//重置坐标(原点移到左下角)
		cc.renderContext.translate(0,cc.canvas.height);

		var director = cc.Director.getInstance() ;
		director._winSizeInPixels = director._winSizeInPoints = cc.size(cc.canvas.width,cc.canvas.height) ;

		var cam = ins(yc.outer.Camera) ;
		if(cam!==undefined)
		{
			cam.update() ;
		}
	}
});

$(function(){
	$('#ui').width($(window).width()) ;
	
    ICellGame.instance = new ICellGame(yc.MainScene);
    
    // webkitRequestAnimationFrame 似乎不太流畅
    if( window.requestAnimFrame === window.webkitRequestAnimationFrame )
    {
       window.requestAnimFrame = null 
    }
}) ;

