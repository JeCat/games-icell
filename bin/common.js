
var PTM_RATIO = 32;
var TAG_SPRITE_MANAGER = 1;


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



var g_AppFiles = [
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
	, 'bin/ui/CreateBuildingBtn.js'
	, 'bin/ui/UpgradeBuildingBtn.js'
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
	//, 'bin/inner/skill/Rocket.js'

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




var g_ResFiles = [
	{type:"image", src:"res/HelloWorld.png"}
	, {type:"image", src:"res/CloseNormal.png"}
	, {type:"image", src:"res/CloseSelected.png"}
	, {type:"image", src:"res/Goal.png"}
	, {type:"image", src:"res/skill.png"}
	, {type:"image", src:"res/star2.png"}
	
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
	, {type:"image", src:"res/btn-main.png"}
	, {type:"image", src:"res/btn-main-1.png"}
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
	, {type:"plist", src:"res/building/build.plist"}
	, {type:"image", src:"res/building/build.png"}
	, {type:"plist", src:"res/role/virus.plist"}
	, {type:"image", src:"res/role/virus.png"}
	, {type:"plist", src:"res/role/role.plist"}
	, {type:"image", src:"res/role/role.png"}
	, {type:"plist", src:"res/smoke.plist"}
	, {type:"image", src:"res/smoke.png"}
	, {type:"plist", src:"res/role/boss.plist"}
	, {type:"image", src:"res/role/boss.png"}
	
]



function enableNativeClassExtend(nativeClass){
	if( g_architecture == 'native' )
	{
		if( typeof(nativeClass.extend)!='undefined' )
		{
			return ;
		}
		
		nativeClass.prototype.ctor = (function(nativeClass){
			return function(){
				cc.associateWithNative( this, nativeClass ) ;
			}
		})(nativeClass) ;
		
		nativeClass.extend = cc.Class.extend ;
	}
}
