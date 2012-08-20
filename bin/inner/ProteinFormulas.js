yc.inner.ProteinFormulas = function(){
    
    log('ProteinFormulas init') ;
    
    this.formulaNum = 0 ;
    this.mapFormulas = {} ;
    
    this.first = null ;
    this.last = null ;
    
    this.addNewFormula = function(formula)
    {
        if(typeof(this.mapFormulas[formula.name])!='undefined')
        {
            return ;
        }
        
        // 触发事件
        $(window).trigger('yc.inner.ProteinFormulas::onBeforeAppend',[this,formula]) ;

        formula.status = 'waiting' ;
        
        formula.total = 0 ;
        for(var key in formula.materials)
        {
            formula.total+= formula.materials[key] ;
        }
        
        // update ui
        var ui = $('#protein-composition-formula-template')
                        .clone()
                        .appendTo('#protein-formulas-outer')
                        .attr('id','protein-formula-'+formula.name)
                        .show() ;
        
        formula.ui = ui ;
        ui.data('formula',formula) ;
        //ui.find('.formula-name').text(formula.name).css({color: formula.color}) ;
        
        // 显示公式
        formula.detail = '<span style="color:'+formula.color+'">♫</span> = ' ;
        var i = 0 ;
        for(var key in formula.materials)
        {
            if(i++)
            {
                formula.detail+= ' + ' ;
            }
            formula.detail+= '<span style="color:'+key+'">♪ '+formula.materials[key]+'</span>' ;
        }
        ui.find('.formula-display').html(formula.detail) ;
        
        // 维护链表
        if( !this.first )
        {
            this.first = formula ;
            this.first.ui.attr('first','first') ;
            this.last = formula ;
        }
        
        this.last.next = formula ;
        this.last.ui.removeAttr('last') ;
        
        this.last = formula ;
        formula.ui.attr('last','last') ;
        formula.next = this.first ;
        
        
        this.formulaNum ++ ;
        
        
        this.mapFormulas[formula.name] = formula ;
        
        
        // 触发事件
        $(window).trigger('yc.inner.ProteinFormulas::onAfterAppend',[this,formula]) ;
    }
    
    this.toggle = function(name)
    {
        if(this.mapFormulas[name].status=='compositing')
        {
            return ;
        }
        else if(this.mapFormulas[name].status=='pause')
        {
            this.mapFormulas[name].status = 'waiting' ;
            this.mapFormulas[name].ui.find('.protein-formula-togglebtn').text('暂停') ;
        }
        else if(this.mapFormulas[name].status=='waiting')
        {
            this.mapFormulas[name].status = 'pause' ;
            this.mapFormulas[name].ui.find('.protein-formula-togglebtn').text('继续') ;
        }
    }
    
    this.addNewFormula({
        name: 'red'
        , materials: {red:5}
        , color: 'rgb(255,0,0)'
    }) ;
    this.addNewFormula({
        name: 'yellow'
        , materials: {yellow:5}
        , color: 'rgb(255,255,0)'
    }) ;
    this.addNewFormula({
        name: 'blue'
        , materials: {blue:5}
        , color: 'rgb(0,0,255)'
    }) ;
    this.addNewFormula({
        name: 'orange'
        , materials: {red:4,yellow:4}
        , color: 'rgb(255,165,0)'
    }) ;
    
}

// 由物理三原色 转换为屏幕三原色
yc.inner.ProteinFormulas.transColor = function(tricolor){
    red = typeof(tricolor.red)=='undefined'? 0: tricolor.red ;
    red+= green = typeof(tricolor.yellow)=='undefined'? 0: tricolor.yellow ;
    blue = typeof(tricolor.blue)=='undefined'? 0: tricolor.blue ;
    return {red:red,green:green,blue:blue} ;
}

yc.inner.ProteinFormulas.proteinColor = function(materials){
    materials = yc.inner.ProteinFormulas.transColor(materials) ;
    var max = Math.max(materials.red,materials.green,materials.blue);
    
    return {
        red: Math.round((materials.red/max)*255)
        , green: Math.round((materials.green/max)*255)
        , blue: Math.round((materials.blue/max)*255)
    }
}
yc.inner.ProteinFormulas.ins = new yc.inner.ProteinFormulas ;