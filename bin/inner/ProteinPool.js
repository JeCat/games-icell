yc.inner.ProteinPool = function ()
{
    this.mapProteins = {}
	
	this.increase = function(name,num){
		
		// 触发事件
		$(window).trigger('yc.inner.ProteinPool::onBeforeChange',[this,name,this.mapProteins[name],num]) ;
		
		if(typeof(this.mapProteins[name])=='undefined')
		{
		    this.mapProteins[name] = 0 ;
		}
		this.mapProteins[name]+= num ;
		
		// 触发事件
		$(window).trigger('yc.inner.ProteinPool::onAfterChange',[this,name,this.mapProteins[name],num]) ;
	}
	
}

yc.inner.ProteinPool._ins = null ;
yc.inner.ProteinPool.ins = function(){
    if(!yc.inner.ProteinPool._ins){
        yc.inner.ProteinPool._ins = new yc.inner.ProteinPool() ;
    }
    return yc.inner.ProteinPool._ins ;
}
