var g_architecture = 'native' ;


require("box2d/box2d.js");
require("js/helper/jsb_constants.js");
require("bin/common.js") ;




enableNativeClassExtend(cc.Layer) ;
enableNativeClassExtend(cc.Scene) ;
enableNativeClassExtend(cc.LayerGradient) ;
enableNativeClassExtend(cc.Sprite) ;
enableNativeClassExtend(cc.MenuItemFont) ;	
enableNativeClassExtend(cc.Action) ;
enableNativeClassExtend(cc.Node) ;


var MW = MW || {};

cc.dumpConfig();

for( var i=0; i < g_AppFiles.length; i++) {
    require( g_AppFiles[i] );
}





var director = cc.Director.getInstance();
director.setDisplayStats(true);

// set FPS. the default value is 1.0/60 if you don't call this
director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var mainScene = new yc.MainScene();

// run
director.runWithScene(mainScene);
