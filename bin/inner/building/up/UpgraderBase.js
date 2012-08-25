yc.inner.building.up.UpgraderBase = function(){
    
    this.lv = 0 ;
    
    this.title = 'Nothing' ;
    this.description = 'Nothing todo ...' ;
    this.icon = '' ;
    
}

yc.inner.building.up.UpgraderBase.prototype.isUnlock = function(){
    return false ;
}

yc.inner.building.up.UpgraderBase.prototype.upgrade = function(tower){
    
    // 检查是否解锁
    if(!this.isUnlock())
    {
        return false ;
    }
    
    // 检查资源
    var cost = this.cost() ;
    // ...
    
    return true ;
}

yc.inner.building.up.UpgraderBase.prototype.cost = function()
{
    return {}
}
    