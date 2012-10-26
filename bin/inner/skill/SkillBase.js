yc.inner.skill.SkillBase = cc.Node.extend({
	ctor: function(){
		var _name = 'noname';
		var _title = '无标题';
		var _coolingTime = 30;// 冷却时间，单位是秒
		var _leftCoolingTime = 0;// 剩余冷却时间，为0时可以释放此技能
		var _building = null;
		
		this.name=function(){
			return _name;
		}
		this.setName=function(n){
			_name = n;
		}
		this.setBuilding = function(b){
			_building = b;
		}
		this.building = function(){
			return _building ;
		}
	}
	, start: function(){
	}
});
