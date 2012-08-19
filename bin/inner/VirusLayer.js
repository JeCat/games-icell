yc.inner.VirusLayer = cc.Layer.extend({  

    arrVirus: []
    
    /**
     * 创建一个病毒sprite
     */
    , createVirusSprite: function(){
        var virus = yc.op.ins(yc.inner.Virus).ob() ;
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
        yc.op.ins(yc.inner.Virus).free(virus) ;
    }
 
    
}) ;


yc.inner.VirusLayer.ins = function(){
    if(typeof(yc.inner.VirusLayer._ins)=='undefined'){
        yc.inner.VirusLayer._ins = new yc.inner.VirusLayer() ;
    }
    return yc.inner.VirusLayer._ins ;
}
