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
	}
	
	this.increase('red',10) ;
	this.increase('yellow',10) ;
	this.increase('blue',10) ;
}
yc.inner.AminoAcidPool.types = ['red','yellow','blue'] ;

yc.inner.AminoAcidPool._ins = null ;
yc.inner.AminoAcidPool.ins = function(){
    if(!yc.inner.AminoAcidPool._ins){
        yc.inner.AminoAcidPool._ins = new yc.inner.AminoAcidPool() ;
    }
    return yc.inner.AminoAcidPool._ins ;
}
