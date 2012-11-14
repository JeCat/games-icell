yc.ui.skill.SkillBar = cc.Layer.extend({
	marginLeft: 50
	, buttons : {}
	, buttonsIndex : []
	, ctor: function(){
		
	}
	, createButtonForSkill: function(skill){
		var name = skill.name();
		var button ;
		if( this.buttons[name] != undefined ){
			button = this.buttons[name];
		}else{
			switch(name){
			case 'xxxxxxxxxxx'://OutsideShooter
				button = new yc.ui.skill.OutsideShooterButton;
				break;
			default:
				
				var title = 1;
				var key = 49;
				for(var attr in this.buttons)
				{
					if( this.buttons[attr] != undefined ){
						title++;
						key++;
					}
				}
				
				button = new yc.ui.skill.ButtonBase();
				button.setTitle( title);
				button.setKeyCode( key);
				if(skill.icon()){
					button.setIcon( skill.icon());
				}else{
					button.setIcon( "res/tower_yellow.png");
				}
				
				break;
			}

			this.addChild( button );
			
			var index = 1 ;
			for(var attr in this.buttons)
			{
				if( this.buttons[attr] != undefined ){
					index++;
				}
			}
			
			button.setPosition( cc.p( this.marginLeft + index*button.boxWidth + button.boxWidth / 2 , button.boxHeight / 2 ) );
			
			this.buttons[name] = button ;
			this.buttonsIndex.push( name);
		}
		button.addSkill( skill );
		return button;
	}
	, removeButtonForSkill: function(skill){
		var name = skill.name();
		var button = this.buttons[name];
		button.removeSkill( skill );
		
		if( button.skillList().length == 0){
			for(var attr in this.buttons)
			{
				if( attr == name){
					this.buttons[attr] = undefined;
					
					// 维护按钮排序
					for(var i=0; i<this.buttonsIndex.length; i++)
					{
						if(this.buttonsIndex[i] == name){
							this.buttonsIndex.splice(i,1);
						}
					}
					
					// 重新排序
					this.againOrder();
					
				}
			}
		}
		
		return button;
	}
	
	, againOrder: function(){

		for(var i=0; i<this.buttonsIndex.length; i++)
		{
			var name = this.buttonsIndex[i];
			var button = this.buttons[name];
			
			var index = i+1;
			button.setTitle( i+1);
			button.setKeyCode( 49+i);
			button.setPosition( cc.p( this.marginLeft + index*button.boxWidth + button.boxWidth / 2 , button.boxHeight / 2 ) );
		}
	}
});
