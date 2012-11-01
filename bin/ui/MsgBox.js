yc.ui.MsgBox = cc.Layer.extend({
	bg : null
	, label : null
	, btns : null
	, yesBtn : null
	, noBtn : null
	, ctor: function(){

		this._super() ;

	    var screenSize = cc.Director.getInstance().getWinSize();
	    this.setPosition(cc.p(screenSize.width / 2 , screenSize.height / 2));

	    //bg
	    this.bg = cc.Sprite.create("res/bg300x200.png");
	    this.addChild(this.bg);
	    this.bg.setScale(1,0.4);

	    //btns
		this.yesBtn = cc.MenuItemImage.create(
	        "res/btn-yes.png",
	        "res/btn-yes-1.png",
	        null,
	        this,
	        this.YesBtnCallBack
	    );
	    this.noBtn = cc.MenuItemImage.create(
	        "res/btn-no.png",
	        "res/btn-no-1.png",
	        null,
	        this,
	        this.NoBtnCallBack
	    );

	    this.yesBtn.setPosition(cc.p( 20 , 0 ));
	    this.noBtn.setPosition(cc.p( 60 , 0 ));

	    this.btns = cc.Menu.create(this.yesBtn , this.noBtn);

	    this.btns.setPosition(cc.p( 20 , -42 ));

	    this.addChild(this.btns);


	    //text
	    this.label = cc.LabelTTF.create('',  'Times New Roman', 14, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT);
	    this.addChild(this.label);
	    this.label.setPosition(cc.p( 0 , 0 ));
	    this.label.setColor ( new cc.Color3B(0,0,0) ); 

	}
	, setText : function(msg){
		this.label.setString(msg);
	}
	, hideYesBtn : function(){
		this.yesBtn.setVisible(false);
	}
	, hideNoBtn : function(){
		this.noBtn.setVisible(false);
	}
	, show : function(){
		this.setVisible(true);
	}
	, hide : function(){
		this.setVisible(false);
	}
	, YesBtnCallBack : function(){
		this.removeFromParent(true);
	}
	, NoBtnCallBack : function(){
		this.removeFromParent(true);
	}
}) ;
