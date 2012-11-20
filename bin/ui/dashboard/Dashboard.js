
yc.ui.dashboard.Dashboard = cc.Layer.extend({
	aminoAcidsStars : []				//氨基酸的按钮
	, proteinsStars : {					//蛋白质的按钮
		red : null						//  red          
		, orange : null					//orange 
		, yellow : null					//yellow
		, green : null					//green 
		, blue : null					//blue 
		, violet : null					//violet 
	}					
	, centerPosition : []				//蛋白质面板圆心
	, aminoAcidsPositions : [			//  氨基酸  显示的位置偏移
		[ 0 , 30 ]
		, [ 26 , -15 ]
		, [ -26 , -15 ]
	]
	, proteinsPositions : {       			//  蛋白质  显示的位置偏移
		red : [ 0 , 80 ]					//  red
		, orange : [ 69 , 40 ]				//orange 
		, yellow : [ 69 , -40 ]				//yellow
		, green : [ 0 , -80 ]				//green 
		, blue : [ -69 , -40 ]				//blue 
		, violet : [ -69 , 40 ]				//violet 
	}
	, starsLayer : null	
	, starsScale : 0.9
	
	, labelAminoAcids: {}			//  氨基酸  名称及数量显示
	, labelProteins : {}			//  蛋白质  名称及数量显示

	, ctor: function(){
		
		this._super() ;


		if( g_architecture=='native' )
		{
			// there are a lot for mistake of package ui.dashboard, under native architecture
			// please refact these cc.Node
			// todo by Kong Yuan !!
			return ;
		}


		var dashboard = this ;

		var screenSize = cc.Director.getInstance().getWinSize();
here() ;
		this.onResize(screenSize.width, screenSize.height);
here() ;
		// HP 状态
		dashboard.HP = cc.LabelTTF.create('HP 10/10','',16,cc.size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
		dashboard.HP.setColor(cc.c3(0,255,0)) ;
		
here() ;
		if( g_architecture=='html5' )
		{
			$(window).bind('yc.inner.Cell::onAfterChange',null,function(e,o,val,hp){
				dashboard.HP.setString('HP '+hp+'/'+o.hpMax) ;
			}) ;
		}
here() ;
		/*     合成面板 start    */

		//  氨基酸
		dashboard.aminoAcidsStars[0] = Star.starWithTexture("res/dashboard/aminoAcid_red.png" , "res/dashboard/aminoAcid_red.png" , "res/dashboard/aminoAcid_red.png") ;
here() ;
        dashboard.aminoAcidsStars[1] = Star.starWithTexture("res/dashboard/aminoAcid_yellow.png" , "res/dashboard/aminoAcid_yellow.png" , "res/dashboard/aminoAcid_yellow.png") ;
        dashboard.aminoAcidsStars[2] = Star.starWithTexture("res/dashboard/aminoAcid_blue.png" , "res/dashboard/aminoAcid_blue.png" , "res/dashboard/aminoAcid_blue.png") ;
here() ;
        dashboard.aminoAcidsStars[0].setClickable(false);
        dashboard.aminoAcidsStars[1].setClickable(false);
        dashboard.aminoAcidsStars[2].setClickable(false);
here() ;
        for(var i =0 ; i< dashboard.aminoAcidsStars.length ; i++){
        	dashboard.aminoAcidsStars[i].setScale( dashboard.starsScale , dashboard.starsScale );
        	dashboard.aminoAcidsStars[i].setPosition( 
        		dashboard.centerPosition[0] + dashboard.aminoAcidsPositions[i][0]  
        		, dashboard.centerPosition[1] + dashboard.aminoAcidsPositions[i][1]
        	);
        }
        dashboard.labelAminoAcids.red = dashboard._createLabel("0",new cc.Color3B(255,0,0)) ;
		dashboard.labelAminoAcids.yellow = dashboard._createLabel("0",new cc.Color3B(255,255,0)) ;
		dashboard.labelAminoAcids.blue = dashboard._createLabel("0",new cc.Color3B(0,0,255)) ;
here() ;
        //  蛋白质

        // 根据关卡中已有的公式创建label
		var formulas = ins(yc.user.ProteinFormulas).worldFormulas ;
		for(var name in formulas)
		{
			var star = Star.starWithTexture("res/dashboard/star_"+name+".png" , "res/dashboard/star_"+name+".png" , "res/dashboard/star_"+name+".png");
			star.setFormula(formulas[name]);
			dashboard.proteinsStars[name] = star ;

        	star.setScale( dashboard.starsScale , dashboard.starsScale );
        	star.setPosition( 
        		dashboard.centerPosition[0] + dashboard.proteinsPositions[name][0]  
        		, dashboard.centerPosition[1] + dashboard.proteinsPositions[name][1]
        	);

			var fml = formulas[name] ;
			this.labelProteins[name] = dashboard._createLabel("0",new cc.Color3B(fml.rgb[0],fml.rgb[1],fml.rgb[2])) ;
		}

		this.dashboard_bg = cc.Sprite.create("res/dashboard/dashboard_bg.png");
		this.dashboard_bg.setPosition(cc.p(0,0));

here() ;
		/*     合成面板 end    */

		// 注册事件
		// --------
		// 氨基酸数量数量
		if( g_architecture=='html5' )
		{
			$(window).bind('yc.user.AminoAcidPool::onAfterChange',null,function(e,pool,type,num){
				dashboard.labelAminoAcids[type].setString(''+pool[type]) ;
				// dashboard.layout() ;
			}) ;
			
			// 新增蛋白质类型
			$(window).bind('yc.user.ProteinFormulas::onAfterAppend',null,function(e,o,formula){
				dashboard.labelProteins[formula.name] = dashboard._createLabel("0",new cc.Color3B(formula.rgb[0],formula.rgb[1],formula.rgb[2])) ;
				dashboard._createSeparator(10) ;
				// dashboard.layout() ;
			}) ;
			
			// 蛋白质数量变化
			$(window).bind('yc.user.ProteinPool::onAfterChange',null,function(e,pool,name,total,num){
				dashboard.labelProteins[name].setString(''+total) ;

				if(yc.ui.BuildingCreateMenu){
					ins(yc.ui.BuildingCreateMenu).onProteinsChanged();
				}
			}) ;
			
			// HP 状态
			$(window).bind('yc.inner.Cell::onAfterChange',null,function(e,o,val,hp){
				// dashboard.labelHp.setString('HP '+hp+'/'+o.hpMax) ;
				dashboard.HP.setString('HP '+hp+'/'+o.hpMax) ;
				// dashboard.layout() ;
			}) ;
		}
here() ;
	}

	, onEnter : function(){
		this._super() ;

		yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;
		
		var screenSize = cc.Director.getInstance().getWinSize();
		this.onResize(screenSize.width, screenSize.height);

		// hp
		this.addChild(this.HP) ;

		// protein stars
		for(var name in this.proteinsStars)
		{
			// star
			this.addChild(this.proteinsStars[name]) ;
			// star's lable
			this.proteinsStars[name].addChild(this.labelProteins[name]) ;
		}

		// amino acid stars
        for(var i =0 ; i< this.aminoAcidsStars.length ; i++){
			// star
        	this.addChild(this.aminoAcidsStars[i]);
        }
		// star's lable
        this.aminoAcidsStars[0].addChild(this.labelAminoAcids.red);
        this.aminoAcidsStars[1].addChild(this.labelAminoAcids.yellow);
        this.aminoAcidsStars[2].addChild(this.labelAminoAcids.blue);

        this.addChild( this.dashboard_bg , -1 );
	}

	, onExit : function(){
		this._super() ;

		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;

		// proteinhp
		this.removeChild(this.HP) ;
		this.removeChild(this.dashboard_bg);
		// protein stars
		for(var name in this.proteinsStars)
		{
			// star
			this.removeChild(this.proteinsStars[name]) ;
			// star's lable
			this.proteinsStars[name].removeChild(this.labelProteins[name]) ;
		}

		// amino acid stars
        for(var i =0 ; i< this.aminoAcidsStars.length ; i++){
			// star
        	this.removeChild(this.aminoAcidsStars[i]);
        }
		// star's lable
        this.aminoAcidsStars[0].removeChild(this.labelAminoAcids.red);
        this.aminoAcidsStars[1].removeChild(this.labelAminoAcids.yellow);
        this.aminoAcidsStars[2].removeChild(this.labelAminoAcids.blue);
	}

	, _createLabel: function(word,color){
		var label = cc.LabelTTF.create(word,'',16,new cc.Size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
		label.setColor(color) ;
		return label ;
	}

	, onResize : function(w,h){
		var dash = this;
		dash.centerPosition = [ 100 , h - 120 ];

		xxx = dash.dashboard_bg;
		if(dash.dashboard_bg){
			dash.dashboard_bg.setPosition( cc.p(dash.centerPosition[0]+15,dash.centerPosition[1]+28) );
		}
		if(dash.HP){
			dash.HP.setPosition(cc.p(40 , h - 10));
		}

		if(dash.aminoAcidsStars.length === 0){
			return;
		}

		for(var i =0 ; i< dash.aminoAcidsStars.length ; i++){
        	dash.aminoAcidsStars[i].setPosition( 
        		dash.centerPosition[0] + dash.aminoAcidsPositions[i][0]  
        		, dash.centerPosition[1] + dash.aminoAcidsPositions[i][1]
        	);
        }

        for(var name in dash.proteinsStars){
        	var star = dash.proteinsStars[name];
        	star.setPosition( 
        		dash.centerPosition[0] + dash.proteinsPositions[name][0]  
        		, dash.centerPosition[1] + dash.proteinsPositions[name][1]
        	);
        }
        
	}
}) ;





// yc.ui.dashboard.Dashboard = cc.Layer.extend({
	
// 	labelAminoAcids: {
// 		red: null
// 		, yellow: null
// 		, blue: null
// 	} 
	
// 	,labelProteins: {}
	
// 	, labels: []
	
// 	, ctor: function(){
		
// 		var dashboard = this ;
		
// 		this._super() ;
		
// 		// HP
// 		this.labelHp = this._createLabel('HP 10/10',new cc.Color3B(0,255,0)) ;
// 		this._createSeparator(25) ;
		
// 		// 氨基酸池
// 		this.labelAminoAcids.red = this._createLabel("♪ 0",new cc.Color3B(255,0,0)) ;
// 		this._createSeparator(10) ;
// 		this.labelAminoAcids.yellow = this._createLabel("♪ 0",new cc.Color3B(255,255,0)) ;
// 		this._createSeparator(10) ;
// 		this.labelAminoAcids.blue = this._createLabel("♪ 0",new cc.Color3B(0,0,255)) ;
		
// 		this._createSeparator(20) ;
		
// 		// 蛋白质工厂按钮
// 		var btnProteinFactory = cc.MenuItemImage.create(
// 				"res/btn-composition.png"
// 				, "res/btn-composition-selected.png"
// 				, null , this, function(){
// 					yc.ui.UI.ins.toggleProteinComposion() ;
// 				}
// 		);
		
// 		this.labels.push(btnProteinFactory) ;
// 		this._createSeparator(10) ;
		
// 		// 菜单
// 		var menu = cc.Menu.create(btnProteinFactory);
// 		this.addChild(menu) ;
// 		menu.setAnchorPoint(cc.p(0,0)) ;
// 		menu.setPosition(new cc.p(0,0)) ;
	   
		
// 		// 根据关卡中已有的公式创建label
// 		var formulas = ins(yc.user.ProteinFormulas).worldFormulas ;
// 		for(var name in formulas)
// 		{
// 			var fml = formulas[name] ;

// 			this.labelProteins[name] = this._createLabel("♫ 0",new cc.Color3B(fml.rgb[0],fml.rgb[1],fml.rgb[2])) ;
// 			this._createSeparator(10) ;
// 		}
		
// 		// 调整布局
// 		this.layout() ;
		
// 		// 注册事件
// 		// --------
// 		// 氨基酸数量数量
// 		$(window).bind('yc.user.AminoAcidPool::onAfterChange',null,function(e,pool,type,num){
// 			dashboard.labelAminoAcids[type].setString('♪ '+pool[type]) ;
// 			dashboard.layout() ;
// 		}) ;
		
// 		// 新增蛋白质类型
// 		$(window).bind('yc.user.ProteinFormulas::onAfterAppend',null,function(e,o,formula){
// 			dashboard.labelProteins[formula.name] = dashboard._createLabel("♫ 0",new cc.Color3B(formula.rgb[0],formula.rgb[1],formula.rgb[2])) ;
// 			dashboard._createSeparator(10) ;
// 			dashboard.layout() ;
// 		}) ;
		
// 		// 蛋白质数量变化
// 		$(window).bind('yc.user.ProteinPool::onAfterChange',null,function(e,pool,name,total,num){
// 			dashboard.labelProteins[name].setString('♫ '+total) ;
// 		}) ;
		
		
// 		// HP 状态
// 		$(window).bind('yc.inner.Cell::onAfterChange',null,function(e,o,val,hp){
// 			dashboard.labelHp.setString('HP '+hp+'/'+o.hpMax) ;
// 			dashboard.layout() ;
// 		}) ;
// 	}
	
// 	, layout: function(){
		
// 		var posH = 0 ;
		
// 		for(var i=this.labels.length-1;i>=0;i--) 
// 		{
// 			var label = this.labels[i] ;
			
// 			var size = label.getContentSize() ;
// 			label.setPosition(new cc.p(size.width/2,posH+size.height/2)) ;
			
// 			posH+= size.height ;
// 		}
		
// 		var wsize = cc.Director.getInstance().getWinSize();
// 		this.setPosition(new cc.p(6,wsize.height-posH-10)) ;
// 	}
	
// 	, _createLabel: function(word,color){
		
// 		var label = cc.LabelTTF.create(word,'',16,new cc.Size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
// 		label.setColor(color) ;
		
// 		this.addChild(label) ;
// 		this.labels.push(label) ;
		
		
// 		return label ;
// 	}
	
// 	, _createSeparator: function(height){
// 		var separator = new cc.Sprite() ;
// 		separator.setContentSize(new cc.Size(1,height)) ;
// 		this.labels.push(separator) ;
// 	}
	
// }) ;