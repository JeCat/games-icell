yc.inner.organ.Organ = cc.Sprite.extend({
	ctor: function(){
		this.hexgon = null;
		var _isBlocking = false;
		
		this.isBlocking = function(){
			return _isBlocking ;
		}
		this.setBlocking = function(b){
			_isBlocking = b ;
		}
		
		var _skillList = [];
		this.addSkill = function( skillObj ){
			skillObj.setBuilding( this );
			_skillList.push(skillObj);
		};
		this.skillList = function(){
			return _skillList;
		}
	}
});
