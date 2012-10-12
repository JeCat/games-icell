yc.ui.MsgBox = cc.Layer.extend({
	bg : null
	, btns : null
	, yesBtn : null
	, noBtn : null
	, ctor: function(){

		this._super() ;

	    var screenSize = cc.Director.getInstance().getWinSize();

	    this.bg = cc.Sprite.create("res/bg300x200.png");
	    this.addChild(this.bg);

	    this.setPosition(cc.p(screenSize.width / 2 , screenSize.height / 2));

		this.yesBtn = cc.MenuItemImage.create(
	        "res/btn-yes.png",
	        "res/btn-yes-1.png",
	        null,
	        this,
	        function (sender){
	        	this.hide();
	        }
	    );
	    this.noBtn = cc.MenuItemImage.create(
	        "res/btn-no.png",
	        "res/btn-no-1.png",
	        null,
	        this,
	        function (sender){
	        	this.hide();
	        }
	    );

	    this.yesBtn.setPosition(cc.p( 20 , 20 ));
	    this.noBtn.setPosition(cc.p( 20 , 20 ));

	    this.btns = cc.Menu.create(this.yesBtn , this.noBtn);

	    this.btns.setPosition(cc.p(screenSize.width - 40, screenSize.height - 40));

	    this.addChild(this.btns);

	    this.hide();
	}
	, hideYesBtn : function(){

	}
	, hideNoBtn : function(){

	}
	, show : function(){
		this.setVisible(true);
	}
	, hide : function(){
		this.setVisible(false);
	}
	, YesBtnCallBack : function(){

	}
	, NoBtnCallBack : function(){
		
	}
}) ;
