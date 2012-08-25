yc.ui.dashboard.Dashboard = cc.Layer.extend({
	
	labelAminoAcids: {
		red: null
		, yellow: null
		, blue: null
	} 
	
	,labelProteins: {}
	
	, labels: []
	
	, ctor: function(){
	    
        var dashboard = this ;
        
		this._super() ;
		
		// HP
		this.labelHp = this._createLabel('HP 10/10',new cc.Color3B(0,255,0)) ;
		this._createSeparator(25) ;
        
		// 氨基酸池
		this.labelAminoAcids.red = this._createLabel("♪123456789",new cc.Color3B(255,0,0)) ;
		this._createSeparator(10) ;
		this.labelAminoAcids.yellow = this._createLabel("♪123",new cc.Color3B(255,255,0)) ;
		this._createSeparator(10) ;
		this.labelAminoAcids.blue = this._createLabel("♪",new cc.Color3B(0,0,255)) ;
		
        this._createSeparator(20) ;
        
        // 蛋白质工厂按钮
        var btnProteinFactory = cc.MenuItemImage.create(
                "res/btn-composition.png"
                , "res/btn-composition-selected.png"
                , null , this, function(){
                    yc.ui.UI.ins.toggleProteinComposion() ;
                }
        );
        
        this.labels.push(btnProteinFactory) ;
        this._createSeparator(10) ;
        
        // 菜单
        var menu = cc.Menu.create(btnProteinFactory);
        this.addChild(menu) ;
        menu.setAnchorPoint(cc.p(0,0)) ;
        menu.setPosition(new cc.p(0,0)) ;
       
		
		
		
		// 调整布局
		this.layout() ;
		
		// 注册事件
		// --------
		// 氨基酸数量数量
        $(window).bind('yc.inner.AminoAcidPool::onAfterChange',null,function(e,pool,type,num){
            dashboard.labelAminoAcids[type].setString('♪ '+pool[type]) ;
            dashboard.layout() ;
        }) ;
        
        // 新增蛋白质类型
        $(window).bind('yc.inner.ProteinFormulas::onAfterAppend',null,function(e,o,formula){
            dashboard.labelProteins[formula.name] = dashboard._createLabel("♫ 0",new cc.Color3B(formula.rgb[0],formula.rgb[1],formula.rgb[2])) ;
            dashboard._createSeparator(10) ;
            dashboard.layout() ;
        }) ;
        
        // 蛋白质数量变化
        $(window).bind('yc.inner.ProteinPool::onAfterChange',null,function(e,pool,name,total,num){
            dashboard.labelProteins[name].setString('♫ '+total) ;
        }) ;
        
        
        // HP 状态
        $(window).bind('yc.inner.Cell::onAfterChange',null,function(e,o,val,hp){
            dashboard.labelHp.setString('HP '+hp+'/'+o.hpMax) ;
            dashboard.layout() ;
        }) ;
	}
	
	, layout: function(){
		
		var posH = 0 ;
		
		for(var i=this.labels.length-1;i>=0;i--) 
		{
			var label = this.labels[i] ;
			
			var size = label.getContentSize() ;
        	label.setPosition(new cc.p(size.width/2,posH+size.height/2)) ;
        	
        	posH+= size.height ;
		}
		
        var wsize = cc.Director.getInstance().getWinSize();
        this.setPosition(new cc.p(6,wsize.height-posH-10)) ;
	}
	
	, _createLabel: function(word,color){
		
		var label = cc.LabelTTF.create(word,'',16,new cc.Size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
        label.setColor(color) ;
        
        this.addChild(label) ;
        this.labels.push(label) ;
        
        
        return label ;
	}
	
	, _createSeparator: function(height){
        var separator = new cc.Sprite() ;
        separator.setContentSize(new cc.Size(1,height)) ;
        this.labels.push(separator) ;
	}
	
}) ;