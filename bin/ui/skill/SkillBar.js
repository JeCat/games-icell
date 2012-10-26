yc.ui.skill.SkillBar = cc.Layer.extend({
	marginLeft: 50
	, ctor: function(){
		var _skillButtonList = [] ;
		this.addButton = function(btn){
			_skillButtonList.push(btn);
			this.addChild( btn );
			
			var index = _skillButtonList.length ;
			btn.setPosition( cc.p( this.marginLeft + index*btn.boxWidth + btn.boxWidth / 2 , btn.boxHeight / 2 ) );
		}
	}
	, createButtonForSkill: function(skill){
		var name = skill.name();
		console.log(name);
		var button = new yc.ui.skill.ButtonBase;
		button.setSkill( skill );
		this.addButton( button );
		return button;
	}
});
