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

var $ = jquery ;

var game = new YouCellGame(yc.outer.SceneOuter);


