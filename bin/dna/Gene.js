yc.dna.Gene = function(opts){
    
    for(var attr in opts)
    {
        this[attr] = opts[attr] ;
    }
    
    // 叠加
    this.superimposing = 0 ;
    
    this.takeEffect = function(){
        
        this.superimposing ++ ;
    }
}
