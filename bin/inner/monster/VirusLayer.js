yc.inner.monster.VirusLayer = cc.Layer.extend({  

    arrVirus: []
    
    /**
     * 创建一个病毒sprite
     */
    , createVirusSprite: function(){
        var virus = yc.op.ins(yc.inner.monster.Virus).ob() ;
        virus.init() ;
        
        this.addChild(virus) ;
        this.arrVirus.push(virus) ;
        
        return virus ;
    }
    /**
     * 创建一个病毒sprite
     */
    , removeVirusSprite: function(virus){
        
        yc.util.arr.remove(this.arrVirus,virus) ;
        
        this.removeChild(virus) ;
        yc.op.ins(yc.inner.monster.Virus).free(virus) ;
    }
 
    
}) ;


yc.inner.monster.VirusLayer.ins = function(){
    if(typeof(yc.inner.monster.VirusLayer._ins)=='undefined'){
        yc.inner.monster.VirusLayer._ins = new yc.inner.monster.VirusLayer() ;
    }
    return yc.inner.monster.VirusLayer._ins ;
}
