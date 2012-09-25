yc.inner.ProteinPool = function ()
{
	this.mapProteins = {}
	this.total = 0 ;
	
	this.increase = function(name,num){
		
		// 触发事件
		$(window).trigger('yc.inner.ProteinPool::onBeforeChange',[this,name,this.mapProteins[name],num]) ;
		
		if(typeof(this.mapProteins[name])=='undefined')
		{
			// 触发事件
			$(window).trigger('yc.inner.ProteinPool::onBeforeNewType',[this,name]) ;
			
			this.mapProteins[name] = 0 ;
			
			// 触发事件
			$(window).trigger('yc.inner.ProteinPool::onAfterNewType',[this,name]) ;
		}
		this.mapProteins[name]+= num ;
		this.total+= num ;
		
		// 触发事件
		$(window).trigger('yc.inner.ProteinPool::onAfterChange',[this,name,this.mapProteins[name],num]) ;
	}
	
	this.num = function(name){
		if(typeof(this.mapProteins[name])=='undefined')
		{
			this.mapProteins[name] = 0 ;
		}
		return this.mapProteins[name] ;
	}
	
	this.clear = function(){
		for(var key in this.mapProteins)
		{
			this.increase(key,-this.mapProteins[key]) ;
		}
	}
}
