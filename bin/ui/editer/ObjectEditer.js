yc.ui.editer.ObjectEditer = function(object,eleUi,indent){

	/*if(typeof(indent)=='undefined')
	{
		indent = 1 ;
	}*/
	this.ui = eleUi  ;
	this.object = object ;

	this._displayEle = function(parent,key){

		var item = parent[key] ;
		var liUi = $('<li></li>') ;
		
		var keyHtml = key+':' ;
		switch(typeof(item))
		{
		case 'object':
			
			liUi.html(keyHtml) ;
			
			if(item===null)
			{
				liUi.append('null') ;
				break ;
			}
			else if(item.constructor.name=='Array')
			{
				var hrefUi = $('<a href="javascript:void(0)">[...]</a>').appendTo(liUi) ;
			}
			else
			{
				var hrefUi = $('<a href="javascript:void(0)">{...}</a>').appendTo(liUi) ;
			}

			var childUl = $('<ul style="display:none"></ul>').appendTo(liUi) ;
				
			hrefUi
				.data('ui',childUl)
				.data('object',item)
				.click(function(){
					var ui = $(this).data('ui') ;
					if(!ui.data('scaned'))
					{
						new yc.ui.editer.ObjectEditer($(this).data('object'),ui) ;
						ui.data('scaned',true) ;
					}
					
					ui.toggle() ;
				}) ;
			
			break ;
			
		case 'function':
			return ;
		
		default:
			
			liUi.html(keyHtml) ;
			var ipt = $("<input />")
					.appendTo(liUi)
					.addClass('object-editer-input')
					.data({
						parent: parent
						, name: key
					})
					.blur(function(){
						$(this).data('parent')[$(this).data('name')] = eval( $(this).val() ) ;
					}) ;

			if(typeof(item)=='string')
			{
				ipt.val('"'+item+'"') ;
			}
			else if(typeof(item)=='undefined')
			{
				ipt.val('undefined') ;
			}
			else
			{
				ipt.val(item.toString()) ;
			}
		}
		

		liUi.appendTo(this.ui) ;
	}
	

	this.ui.html('') ;
	if( object.constructor.name=='Array' )
	{
		for(var i=0;i<object.length;i++)
		{
			this._displayEle(i,object[i]) ;
		}
	}
	else
	{
		for(var key in object)
		{
			this._displayEle(object,key) ;
		}
	}
}