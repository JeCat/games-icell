yc.inner.ProteinFormulas = function(){
	
	this.formulaNum = 0 ;
	this.worldFormulas = {} ;
	
	this.first = null ;
	this.last = null ;
	
	this.addNewFormula = function(formula)
	{
		if(typeof(this.worldFormulas[formula.name])!='undefined')
		{
			return ;
		}
		
		// 触发事件
		// $(window).trigger('yc.inner.ProteinFormulas::onBeforeAppend',[this,formula]) ;

		formula.color = 'rgb('+formula.rgb[0]+','+formula.rgb[1]+','+formula.rgb[2]+')' ;
		var to16 = function(i)
		{
			var s = i.toString(16) ;
			if(s.length==0)
			{
				return '00' ;
			}
			else if(s.length==1)
			{
				return '0'+s ;
			}
			else
			{
				return s ;
			}
		}
		formula.colorHtml = '#'+to16(formula.rgb[0])+to16(formula.rgb[1])+to16(formula.rgb[2]) ;

		formula.status = 'pause' ;
		
		formula.total = 0 ;
		for(var key in formula.materials)
		{
			formula.total+= formula.materials[key] ;
		}
		
		// update ui
		// var ui = $('#protein-composition-formula-template')
		// 				.clone()
		// 				.appendTo('#protein-formulas-outer')
		// 				.attr('id','protein-formula-'+formula.name)
		// 				.show() ;
		
		// formula.ui = ui ;
		// ui.data('formula',formula) ;


		//ui.find('.formula-name').text(formula.name).css({color: formula.color}) ;
		
		// 显示公式
		// formula.detail = '<span style="color:'+formula.color+'">♫</span> = ' ;
		// var i = 0 ;
		// for(var key in formula.materials)
		// {
		// 	if(i++)
		// 	{
		// 		formula.detail+= ' + ' ;
		// 	}
		// 	formula.detail+= '<span style="color:'+key+'">♪ '+formula.materials[key]+'</span>' ;
		// }
		// ui.find('.formula-display').html(formula.detail) ;
		
		// 维护链表
		if( !this.first )
		{
			this.first = formula ;
			this.first.first = 'first';
			this.last = formula ;
		}
		
		this.last.next = formula ;
		this.last.last = null;
		
		this.last = formula ;
		formula.last = 'last' ;
		formula.next = this.first ;
		
		
		this.formulaNum ++ ;
		
		
		this.worldFormulas[formula.name] = formula ;
		
		
		// 触发事件
		// $(window).trigger('yc.inner.ProteinFormulas::onAfterAppend',[this,formula]) ;
		
		return this ;
	}
	
	this.toggle = function(name)
	{
		if(this.worldFormulas[name].status=='compositing')
		{
			this.worldFormulas[name].status = 'pause'
		}else if(this.worldFormulas[name].status=='pause')
		{
			this.worldFormulas[name].status = 'compositing' ;
		}

		// if(this.worldFormulas[name].status=='compositing')
		// {
		// 	return ;
		// }
		// else if(this.worldFormulas[name].status=='pause')
		// {
		// 	this.worldFormulas[name].status = 'waiting' ;
		// 	// this.worldFormulas[name].ui.find('.protein-formula-togglebtn').text('暂停') ;
		// 	// this.worldFormulas[name].ui.find('.formula-msg').text('').hide() ;
		// }
		// else if(this.worldFormulas[name].status=='waiting')
		// {
		// 	this.worldFormulas[name].status = 'pause' ;
		// 	// this.worldFormulas[name].ui.find('.protein-formula-togglebtn').text('自动') ;
		// 	// this.worldFormulas[name].ui.find('.formula-msg').text('暂停').show() ;
		// }
	}
	
	
	// 初始化蛋白质公式
	for(var name in yc.settings.protein )
	{
		this.addNewFormula(yc.settings.protein[name]) ;
	}
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