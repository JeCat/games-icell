yc.inner.skill.Bottles = yc.inner.skill.SkillBase.extend({
	ctor : function(){
		this._super();
		
	}
	, start: function(){
		
		
		var bottles = new yc.outer.Bottles;
		bottles.create();
		

		var scene = cc.Director.getInstance().getRunningScene() ;
		scene.layerRoles.addChild(bottles);
		
		
		this._super();
	}
})
