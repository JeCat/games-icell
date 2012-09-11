yc.inner.monster.VirusLayer = cc.Layer.extend({  

    arrVirus: []
    
    /**
     * 创建一个病毒sprite
     */
    , createVirusSprite: function(strength){
        var virus = yc.op.ins(yc.inner.monster.Virus).ob() ;
        
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

