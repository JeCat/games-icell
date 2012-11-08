// package

var yc = {} ;
yc.util = {} ;
yc.ui = {} ;
yc.ui.dashboard = {} ;
yc.ui.editer = {} ;
yc.ui.skill = {} ;
yc.ui.font = {} ;
yc.ui.menu = {} ;
yc.outer = {} ;
yc.outer.pinups = {} ;
yc.inner = {} ;
yc.inner.building = {} ;
yc.inner.building.up = {} ;
yc.inner.monster = {} ;
yc.inner.organ= {};
yc.inner.skill= {};
yc.dna = {} ;
yc.actions = {} ;
yc.levels = {} ;
yc.levels.c1 = {} ;
yc.user = {} ;


var PTM_RATIO = 32;
var TAG_SPRITE_MANAGER = 1;

(function () {
	var d = document;
	var c = {
		menuType:'canvas', //whether to use canvas mode menu or dom menu
		COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
		box2d:true,
		showFPS:true,
		frameRate:60,
		tag:'gameCanvas', //the dom element to run cocos2d on
		engineDir:'lib/cocos2d/',
		appFiles:[
			'bin/test.js'   
			, 'bin/settings.js'
			, 'bin/Cocos2dPatchs.js'
			, 'bin/GameScene.js'
			, 'bin/MainScene.js'
			, 'bin/GameLayer.js'
			, 'bin/event.js'
			
			, 'bin/util/ObjectPool.js'
			, 'bin/util/functions.js'
			, 'bin/util/canvas.js'
			, 'bin/util/node.funcs.js'
			, 'bin/util/Instance.js'
			, 'bin/util/SmoothEdger.js'
			, 'bin/util/DbgPannel.js'
			, 'bin/util/debug.js'
			
			, 'bin/ui/UI.js'
			, 'bin/ui/BuildingBtn.js'
			, 'bin/ui/BuildingCreateMenu.js'
			, 'bin/ui/BuildingUpgradeMenu.js'
			, 'bin/ui/PauseMenu.js'
			, 'bin/ui/MsgBox.js'
			, 'bin/ui/DlgRewardGene.js'
			, 'bin/ui/UILayer.js'
			, 'bin/ui/dashboard/Dashboard.js'
			, 'bin/ui/dashboard/Star.js'

			, 'bin/ui/editer/WorldEditer.js'
			, 'bin/ui/editer/WorldEditerLayer.js'
			, 'bin/ui/editer/ObjectEditer.js'
			, 'bin/ui/editer/PanelStain.js'
			, 'bin/ui/editer/PanelPinup.js'
			, 'bin/ui/editer/PanelRole.js'
			, 'bin/ui/editer/PropsList.js'
			
			, 'bin/ui/skill/SkillBar.js'
			, 'bin/ui/skill/ButtonBase.js'
			, 'bin/ui/skill/OutsideShooterButton.js'

			, 'bin/ui/font/Font.js'
			, 'bin/ui/font/Html5Font.js'
			
			, 'bin/ui/menu/Menu.js'
			
			, 'bin/outer/Camera.js'
			, 'bin/outer/LifeEntity.js'
			, 'bin/outer/PhysicalEntity.js'
			, 'bin/outer/Cell.js'
			, 'bin/outer/Footprint.js'
			, 'bin/outer/PlayerLayer.js'
			, 'bin/outer/AminoAcid.js'
			, 'bin/outer/Stain.js'
			, 'bin/outer/VirusCluster.js'
			, 'bin/outer/Boss.js'
			, 'bin/outer/BossCompass.js'
			, 'bin/outer/Portal.js'
			, 'bin/outer/RandomRolesLayer.js'
			, 'bin/outer/ContactListener.js'
			, 'bin/outer/Bottles.js'

			, 'bin/outer/pinups/LayerGround.js'
			, 'bin/outer/pinups/Pinup.js'
			
			, 'bin/inner/InnerLayer.js'
			, 'bin/inner/CellInnerMap.js'
			, 'bin/inner/Hexgon.js'
			, 'bin/inner/CellHexgon.js'
			, 'bin/inner/HexgonAxes.js'
			, 'bin/inner/HexgonAxesPathMap.js'
			, 'bin/inner/Cell.js'
			
			, 'bin/inner/building/BuildingLayer.js'
			, 'bin/inner/building/Building.js'
			, 'bin/inner/building/Tower.js'
			, 'bin/inner/building/Bullet.js'
			, 'bin/inner/building/ProteinFactory.js'
			, 'bin/inner/building/Recycle.js'
			, 'bin/inner/building/PlastosomePower.js'
			, 'bin/inner/building/Rocket.js'

			, 'bin/inner/building/up/UpgraderBase.js'
			, 'bin/inner/building/up/TowerFirepower.js'
			, 'bin/inner/building/up/TowerBombing.js'
			, 'bin/inner/building/up/TowerRetardment.js'

			, 'bin/inner/organ/Organ.js'
			, 'bin/inner/organ/Eye.js'
			, 'bin/inner/organ/Tower.js'
			, 'bin/inner/organ/Bottles.js'
			
			, 'bin/inner/skill/SkillBase.js'
			, 'bin/inner/skill/OutsideShooter.js'
			, 'bin/inner/skill/Bullet.js'
			, 'bin/inner/skill/Bottles.js'

			, 'bin/inner/monster/Mitochondria.js'
			, 'bin/inner/monster/FlopAminoAcid.js'
			, 'bin/inner/monster/Virus.js'
			, 'bin/inner/monster/VirusCluster.js'
			, 'bin/inner/monster/VirusLayer.js'
			
			, 'bin/dna/DNA.js'
			, 'bin/dna/Gene.js'
			, 'bin/dna/GeneBuildingUpgrader.js'
			
			, 'bin/actions/DynamicMove.js'
			, 'bin/actions/Timer.js'
			
			
			, 'bin/levels/FreeWorld.js'
			, 'bin/levels/LevelSelector.js'
            , 'bin/levels/c1/tutorial.js'
			, 'bin/levels/c1/l1.js'
			, 'bin/levels/c1/l2.js'
			, 'bin/levels/c1/l3.js'
			, 'bin/levels/ResourceLoadingScene.js'
			
			
			, 'bin/user/ProteinFormulas.js'
			, 'bin/user/AminoAcidPool.js'
			, 'bin/user/ProteinPool.js'
			, 'bin/user/Character.js'
			
			, 'bin/util/declareClassName.js'
		
			, 'bin/dna/genes.js'
			, 'bin/animations.js'
		]
	};

	// 加后缀
	var url = parseUrl(location.toString()) ;

	// 自动加载内置关卡
	if( 'qv' in url.anchorParams )
	{
		var qv = url.anchorParams.qv=="random"? Math.random().toString(): url.anchorParams.qv ;
		for(var i=0;i<c.appFiles.length;i++)
		{
			c.appFiles[i]+= "?qv="+qv ;
		}
	}

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




function parseUrl(url) {
    var a =  document.createElement('a');
    a.href = url;
    var parseQuery = function(q){
            var ret = {},
                seg = q.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }

    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: parseQuery(a.search),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        anchorParams: parseQuery(a.hash.replace('#','')),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
