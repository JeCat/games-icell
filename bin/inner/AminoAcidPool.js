yc.inner.AminoAcidPool = function ()
{	
	this.red = 0 ;
	this.yellow = 0 ;
	this.blue = 0 ;
	
	this.increase = function(type,num){
		
		// 触发事件
		$(window).trigger('yc.inner.AminoAcidPool::onBeforeChange',[this,type,num]) ;
		
		this[type]+= num ;
		
		// 触发事件
		$(window).trigger('yc.inner.AminoAcidPool::onAfterChange',[this,type,num]) ;
		
		return this ;
	}
	
	this.clear = function(){
		this.increase('red',-this.red) ;
		this.increase('yellow',-this.yellow) ;
		this.increase('blue',-this.blue) ;
	}
	
}
yc.inner.AminoAcidPool.types = ['red','yellow','blue'] ;

