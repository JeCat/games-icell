
/**
 * PropsList 是一个 jquery 插件，
 *
 * $("select").propslst({
 *	exchanges： {
 * 		model-prop: 'input-id'	
 * 	}
 *  , onModelChange: function(){}
 * })
 */

(function($) {

	$.fn.propslst = function(method,args){

		var sel = this ;

		if(typeof(method)=="string")
		{
			var ret = methods[method].apply(this,args) ;
			if(ret!==undefined)
			{
				return ret ;
			}
		}
		else
		{
			var options = method ;

			this.data('exchanges',options.exchanges) ;

			for(var key in options.exchanges)
			{
				$('#'+options.exchanges[key])
					// 绑定事件
					.change(function(){
						methods.applyData.apply(sel,[this]) ;
					})
					// 数据交换
					.data('exchange-prop',key) ;
			}

			// 
			if('onModelChnage' in options)
			{
				this.data('model-change',options.onModelChnage) ;
			} 
		}

		return $(this) ;
	}

	var methods = {


		load: function(array,eachFunc){

			var sel = this ;

			// load options
			for ( var i = 0; i < array.length; i++) {
				var info = eachFunc(array[i],i) ;
				if(!info)
				{
					continue ;
				}

				var optUi = $('<option></option>').appendTo( this )
					.text(info.text)
					.val(info.value)
					.data('model',info.model!==undefined?info.model:array[i])
					.data('object',array[i])
					.data('_info',info)
					.click(function(){
						var info = $(this).data('_info') ;

						// 数据交换
						methods.updateUI.apply( sel, [$(this).data('model'),this] ) ;

						// onclick 事件
						if( 'click' in info )
						{
							info.click.apply( sel, [this, $(this).data('model')] ) ;
						}
					}) ;
			}
		}


		, selectedModel: function(){
			if( this[0].selectedIndex < 0 )
			{
				return null ;
			}
			var opt = this[0].options[this[0].selectedIndex] ;
			return $(opt).data('model') ;
		}

		, selectedOption: function(){
			if( this[0].selectedIndex < 0 )
			{
				return null ;
			}
			return this[0].options[this[0].selectedIndex] ;
		}

		, updateUI: function(model) {

			var exchanges = this.data('exchanges') ;

			if(!exchanges)
			{
				return ;
			}

			for(var key in exchanges)
			{
				var ipt = $('#'+exchanges[key]) ;
				var val = model[key] ;

				// input 上的 数据显示格式
				var formater = $(ipt).data('formater') ;
				if(formater)
				{
					val = formater(val) ;
				}

				// checkbox 类型
				if( ipt.attr('type') == 'checkbox' )
				{
					ipt.attr('checked', val? 'checked': false ) ;
				}
				// text 类型
				else
				{
					ipt.val(val) ;
				}
			}
		}

		, applyData: function(ipt){
			var model = this.propslst('selectedModel') ;
			var prop = $(ipt).data('exchange-prop') ;

			if( model && prop )
			{
				// checkbox 类型
				if( $(ipt).attr('type') == 'checkbox' )
				{
					model[prop] = $(ipt).attr('checked')=='checked'? true: false ;
				}
				// select 类型
				else if(ipt.tagName=='SELECT')
				{
					model[prop] = ipt.options[ipt.selectedIndex].value ;
				}
				// text 类型
				else
				{
					var val = $(ipt).val() ;
					if($(ipt).attr('format')=='int')
					{
						model[prop] = parseInt(val) ;
						if(isNaN(model[prop]))
						{
							model[prop] = 0 ;
						}
					}
					else if($(ipt).attr('format')=='float')
					{
						model[prop] = parseFloat(val) ;
						if(isNaN(model[prop]))
						{
							model[prop] = 0 ;
						}
					}
					else
					{
						model[prop] = val ;
					}
				}

				// input 上的 数据转换
				var transfer = $(ipt).data('transfer') ;
				if(transfer)
				{
					model[prop] = transfer(model[prop]) ;
				}

				log(ipt,model) ;


				// model change 事件
				var changeEvent = this.data('model-change') ;
				if(changeEvent)
				{
					changeEvent.apply(this[0],[model]) ;
				}
			}
		}
	} ;



})(jQuery);