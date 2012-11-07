
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
		cc.Loader.getInstance().preload([
			{type:"image", src:"res/HelloWorld.png"}
			, {type:"image", src:"res/CloseNormal.png"}
			, {type:"image", src:"res/CloseSelected.png"}
			, {type:"image", src:"res/victory.png"}
			
			, {type:"image", src:"res/btn-composition.png"}
			, {type:"image", src:"res/btn-composition-light.png"}
			, {type:"image", src:"res/btn-composition-selected.png"}
			, {type:"image", src:"res/pin_map.png"}
			, {type:"image", src:"res/virus24.png"}
			, {type:"image", src:"res/boss-a-48.png"}
			, {type:"image", src:"res/boss-a-24.png"}

			, {type:"image", src:"res/bg300x200.png"}
			, {type:"image", src:"res/bg200x300.png"}
			, {type:"image", src:"res/btn-pause.png"}
			, {type:"image", src:"res/btn-pause-1.png"} 
			, {type:"image", src:"res/btn-back.png"}
			, {type:"image", src:"res/btn-back-1.png"}
			, {type:"image", src:"res/btn-sound-on.png"}
			, {type:"image", src:"res/btn-sound-off.png"}
			, {type:"image", src:"res/btn-no.png"}
			, {type:"image", src:"res/btn-no-1.png"}
			, {type:"image", src:"res/btn-yes.png"}
			, {type:"image", src:"res/btn-yes-1.png"}

			, {type:"image", src:"res/building/cannon.png"}
			, {type:"image", src:"res/building/jetter.png"}
			, {type:"image", src:"res/building/recycle.png"}
			, {type:"image", src:"res/building/shooter.png"}
			, {type:"image", src:"res/building/slower.png"}
			, {type:"image", src:"res/building/cannon-l.png"}
			, {type:"image", src:"res/building/jetter-l.png"}
			, {type:"image", src:"res/building/recycle-l.png"}
			, {type:"image", src:"res/building/shooter-l.png"}
			, {type:"image", src:"res/building/slower-l.png"}
			, {type:"image", src:"res/building/cannon-nm.png"}
			, {type:"image", src:"res/building/jetter-nm.png"}
			, {type:"image", src:"res/building/recycle-nm.png"}
			, {type:"image", src:"res/building/shooter-nm.png"}
			, {type:"image", src:"res/building/slower-nm.png"}
			, {type:"image", src:"res/building/dec_bg.png"}
			
			, {type:"image", src:"res/menu/btn.png"}
			, {type:"image", src:"res/menu/btn2.png"}
			, {type:"image", src:"res/menu/but.png"}
			, {type:"image", src:"res/menu/dot.png"}
			, {type:"image", src:"res/menu/mid.png"}
			, {type:"image", src:"res/menu/top.png"}

			, {type:"image", src:"res/mitochondria.png"}
			
			, {type:"image", src:'res/weibo_login.png'}
			
			, {type:"image", src:"res/null-pinup.png"}
			, {type:"image", src:"res/null.png"}

			, {type:"image", src:"res/map-c1.png"}
			, {type:"image", src:"res/level-flag-normal.png"}
			, {type:"image", src:"res/level-flag-flash.png"}
			, {type:"image", src:"res/dna-icons-16.png"}
			, {type:"image", src:"res/dna-icons-32.png"}
			
			, {type:"image", src:"res/organ/Tower.png"}


			, {type:"plist", src:"res/building/factory.plist"}
			, {type:"image", src:"res/building/factory.png"}
			, {type:"plist", src:"res/building/tower.plist"}
			, {type:"image", src:"res/building/tower.png"}
			, {type:"plist", src:"res/role/virus.plist"}
			, {type:"image", src:"res/role/virus.png"}
			
		]);
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


