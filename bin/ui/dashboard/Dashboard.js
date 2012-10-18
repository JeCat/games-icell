yc.ui.dashboard.Dashboard = cc.Layer.extend({
	stars : []
	, starsLayer : null
	, starsScale : 0.8
	, starPositions : [
		cc.p( 0 , 30 )
		, cc.p( 26 , -15 )
		, cc.p( -26 , -15 )
		, cc.p( 0 , 80 )
		, cc.p( 69 , 40 )
		, cc.p( 69 , -40 )
		, cc.p( 0 , -80 )
		, cc.p( -69 , -40 )
		, cc.p( -69 , 40 )
	]
	,labelAminoAcids: {}
	, ctor: function(){
		
		this._super() ;

		var dashboard = this ;
		var stars = this.stars;
		var screenSize = cc.Director.getInstance().getWinSize();
		
		// HP 状态
		var HP = cc.LabelTTF.create('HP 10/10','',16,new cc.Size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
		HP.setColor(new cc.Color3B(0,255,0)) ;
		this.addChild(HP) ;
		HP.setPosition(cc.p(40 , screenSize.height - 10));

		$(window).bind('yc.inner.Cell::onAfterChange',null,function(e,o,val,hp){
			HP.setString('HP '+hp+'/'+o.hpMax) ;
		}) ;

		
		// "res/btn-composition.png"
		// , "res/btn-composition-selected.png"

		/*     合成面板 start    */

		this.starsLayer = cc.Layer.create();
		
				stars.push( Star.starWithTexture("res/CloseNormal.png") );
		        stars.push( Star.starWithTexture("res/CloseNormal.png") );
		        stars.push( Star.starWithTexture("res/CloseNormal.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );
		        stars.push( Star.starWithTexture("res/btn-composition.png") );

		        for(var i =0 ; i< stars.length ; i++){
		        	stars[i].setScale( this.starsScale , this.starsScale );
		        	stars[i].setPosition( this.starPositions[i] );
		        	this.starsLayer.addChild(stars[i]);
		        }


		        this.labelAminoAcids.red = this._createLabel("♪ 0",new cc.Color3B(255,0,0)) ;
				this.labelAminoAcids.yellow = this._createLabel("♪ 0",new cc.Color3B(255,255,0)) ;
				this.labelAminoAcids.blue = this._createLabel("♪ 0",new cc.Color3B(0,0,255)) ;
		        stars[0].addChild(this.labelAminoAcids.red);
		        stars[1].addChild(this.labelAminoAcids.yellow);
		        stars[2].addChild(this.labelAminoAcids.blue);

        this.addChild(this.starsLayer);
		this.starsLayer.setContentSize(new cc.Size( 160 , 160 ));
		this.starsLayer.setPosition(cc.p( 100 , screenSize.height - 120 ));

		/*     合成面板 end    */
		
		
	}

	, _createLabel: function(word,color){
		var label = cc.LabelTTF.create(word,'',16,new cc.Size(0,16),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
		label.setColor(color) ;
		return label ;
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
// 		var formulas = ins(yc.inner.ProteinFormulas).mapFormulas ;
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
// 		$(window).bind('yc.inner.AminoAcidPool::onAfterChange',null,function(e,pool,type,num){
// 			dashboard.labelAminoAcids[type].setString('♪ '+pool[type]) ;
// 			dashboard.layout() ;
// 		}) ;
		
// 		// 新增蛋白质类型
// 		$(window).bind('yc.inner.ProteinFormulas::onAfterAppend',null,function(e,o,formula){
// 			dashboard.labelProteins[formula.name] = dashboard._createLabel("♫ 0",new cc.Color3B(formula.rgb[0],formula.rgb[1],formula.rgb[2])) ;
// 			dashboard._createSeparator(10) ;
// 			dashboard.layout() ;
// 		}) ;
		
// 		// 蛋白质数量变化
// 		$(window).bind('yc.inner.ProteinPool::onAfterChange',null,function(e,pool,name,total,num){
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