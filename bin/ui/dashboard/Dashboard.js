yc.ui.dashboard.Dashboard = cc.LayerColor.extend({
	
	labelAminoAcids: {
		red: null
		, yellow: null
		, blue: null
	} 
	
	, labels: []
	
	, ctor: function(){
		this._super() ;
		        
        var wsize = cc.Director.getInstance().getWinSize();
        this.initWithColor(new cc.Color4B(255,255,255,255),300,300) ;
        this.setAnchorPoint(cc.p(0,wsize.height)) ;
        this.setPosition(500,500) ;
		
        
		// 氨基酸池
		this.labelAminoAcids.red = this._createLabel("♪123456789",new cc.Color3B(255,0,0)) ;
		this.labelAminoAcids.yellow = this._createLabel("♪123",new cc.Color3B(255,255,0)) ;
		this.labelAminoAcids.blue = this._createLabel("♪",new cc.Color3B(0,0,255)) ;
		
		
		// 调整布局
		this.layout() ;
	}
	
	, layout: function(){
		
		var posH = 0 ;
		
		for(var i=0; i<this.labels.length;i++) 
		{
			var label = this.labels[i] ;
			
			var size = label.getContentSize() ;
        	label.setPosition(new cc.p(size.width/2,posH-size.height/2)) ;
        	
        	posH-= size.height ;
		}
	}
	
	, _createLabel: function(word,color){
		
		var label = cc.LabelTTF.create(word,'',24,new cc.Size(0,24),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) ;
        label.setColor(color) ;
        
        this.addChild(label) ;
        this.labels.push(label) ;
        
        
        return label ;
	}
	
}) ;