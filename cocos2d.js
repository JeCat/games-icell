

var $ = jquery ;

(function () {
    var d = document;
    var c = {
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        showFPS:true,
        frameRate:40,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'lib/',
        appFiles:[
            'bin/Declare.js'
            , 'bin/Cocos2dPatchs.js'
            , 'bin/GameScene.js'
            
            , 'bin/util/ObjectPool.js'
            
            , 'bin/outer/Camera.js'
            , 'bin/outer/Cell.js'
            , 'bin/outer/PlayerLayer.js'
            , 'bin/outer/AminoAcid.js'
            , 'bin/outer/RolesLayer.js'
            
            , 'bin/inner/AminoAcidPool.js'
            , 'bin/inner/InnerLayer.js'
            , 'bin/inner/CellInnerMap.js'
            , 'bin/inner/Hexgon.js'
            , 'bin/inner/CellHexgon.js'
            , 'bin/inner/HexgonAxes.js'
            , 'bin/inner/HexgonAxesPathMap.js'
            , 'bin/inner/Cell.js'
            
        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        s.c = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
