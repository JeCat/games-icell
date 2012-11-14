yc.inner.skill.SkillBase = cc.Node.extend({
	ctor: function(){
		var _name = 'noname';
		var _icon = 'noname';
		var _title = '无标题';
		var _coolingTime = 30;// 冷却时间，单位是秒
		var _building = null;
		var _lastHappenTime = 0 ;
		this.target = this ;
		
		this.name=function(){
			return _name;
		}
		this.setName=function(n){
			_name = n;
		}
		this.icon=function(){
			return this._icon;
		}
		this.setIcon=function(n){
			this._icon = n;
		}
		this.setBuilding = function(b){
			_building = b;
		}
		this.building = function(){
			return _building ;
		}
		this.coolingTime = function(){
			return _coolingTime ;
		}
		this.setCoolingTime = function(t){
			_coolingTime = t ;
		}
		
		// 剩余冷却时间，为0时可以释放此技能
		this.leftCoolingTime = function(){
			var leftCoolingTime;
			var timestamp = (new Date()).valueOf();
			
			leftCoolingTime = _coolingTime*1000 - timestamp + _lastHappenTime;
			if( leftCoolingTime <= 0 ){
				leftCoolingTime = 0;
			}
			return leftCoolingTime/1000.0;
		}
		this.fillCoolingTime = function(){
			var timestamp = (new Date()).valueOf(); 
			_lastHappenTime = timestamp;
		}
	}
	, start: function(){
		this.fillCoolingTime();
	}
	, canStart: function(){
		return this.leftCoolingTime() <= 0;
	}
});
