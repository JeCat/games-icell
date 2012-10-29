// package

var yc = {} ;
yc.util = {} ;
yc.ui = {} ;
yc.ui.dashboard = {} ;
yc.ui.editer = {} ;
yc.ui.skill = {} ;
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
			
			, 'bin/outer/Camera.js'
			, 'bin/outer/LifeEntity.js'
			, 'bin/outer/PhysicalEntity.js'
			, 'bin/outer/Cell.js'
			, 'bin/outer/PlayerLayer.js'
			, 'bin/outer/AminoAcid.js'
			, 'bin/outer/Stain.js'
			, 'bin/outer/VirusCluster.js'
			, 'bin/outer/Boss.js'
			, 'bin/outer/BossCompass.js'
			, 'bin/outer/Portal.js'
			, 'bin/outer/RandomRolesLayer.js'
			, 'bin/outer/ContactListener.js'

			, 'bin/outer/pinups/LayerGround.js'
			, 'bin/outer/pinups/Pinup.js'
			
			, 'bin/inner/AminoAcidPool.js'
			, 'bin/inner/ProteinPool.js'
			, 'bin/inner/InnerLayer.js'
			, 'bin/inner/CellInnerMap.js'
			, 'bin/inner/Hexgon.js'
			, 'bin/inner/CellHexgon.js'
			, 'bin/inner/HexgonAxes.js'
			, 'bin/inner/HexgonAxesPathMap.js'
			, 'bin/inner/Cell.js'
			, 'bin/inner/ProteinFormulas.js'
			
			, 'bin/inner/building/BuildingLayer.js'
			, 'bin/inner/building/Building.js'
			, 'bin/inner/building/Tower.js'
			, 'bin/inner/building/Bullet.js'
			, 'bin/inner/building/ProteinFactory.js'
			, 'bin/inner/building/Recycle.js'
			
			, 'bin/inner/building/up/UpgraderBase.js'
			, 'bin/inner/building/up/TowerFirepower.js'
			, 'bin/inner/building/up/TowerBombing.js'
			, 'bin/inner/building/up/TowerRetardment.js'
			
			, 'bin/inner/organ/OrganLayer.js'
			, 'bin/inner/organ/Organ.js'
			, 'bin/inner/organ/Eye.js'
			, 'bin/inner/organ/Tower.js'
			
			, 'bin/inner/skill/SkillBase.js'
			, 'bin/inner/skill/ShootVirusCluster.js'
			, 'bin/inner/skill/Bullet.js'

			, 'bin/inner/monster/Mitochondria.js'
			, 'bin/inner/monster/FlopAminoAcid.js'
			, 'bin/inner/monster/Virus.js'
			, 'bin/inner/monster/VirusCluster.js'
			, 'bin/inner/monster/VirusLayer.js'
			
			, 'bin/dna/DNA.js'
			, 'bin/dna/Gene.js'
			, 'bin/dna/GeneBuildingUpgrader.js'
			, 'bin/dna/genes.js'
			
			, 'bin/actions/DynamicMove.js'
			, 'bin/actions/Timer.js'
			
			
			, 'bin/levels/FreeWorld.js'
			, 'bin/levels/StorySelector.js' 
            , 'bin/levels/c1/tutorial.js'
			, 'bin/levels/c1/l1.js'
			
			
			, 'bin/Charactar.js'
			
			, 'bin/util/declareClassName.js'
		 
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



