yc.ui.skill.SkillBar = cc.Layer.extend({
	marginLeft: 50
	, buttons : {}
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
		var button ;
		if( this.buttons[name] != undefined ){
			button = this.buttons[name];
		}else{
			button = new yc.ui.skill.ButtonBase;
			this.addButton( button );
			this.buttons[name] = button ;
		}
		button.addSkill( skill );
		return button;
	}
});
