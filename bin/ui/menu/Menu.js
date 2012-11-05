yc.ui.menu.Menu = cc.Layer.extend(
{
	items : null,
	title : null,
	buttons : [],
	
	ctor: function( title , items){

		this._super() ;

		var screenSize = cc.Director.getInstance().getWinSize();
		
		this.items = items;
		this.title = title;
		
		//button height
		var buttonHeight = 150;
		var titleHeight = 300;
		var kuangMaxHeight = screenSize.height - 100;

		var midX = screenSize.width / 2;
		var midY = screenSize.height / 2;

		//bj//////////////////////////////////////////////////////////////////
        var bj = cc.LayerColor.create(cc.c4(0, 0, 0, 200), screenSize.width, screenSize.height);
        
        
		//buttons//////////////////////////////////////////////////////
		var buttonY = 0;
		for(var i =0;i<this.items.length;i++){

			var button = cc.MenuItemImage.create(
		        "res/menu/btn.png",
		        "res/btn-yes-1.png",
		        null,
		        this,
		        this.YesBtnCallBack
		    );

			button.setPosition(cc.p(0 , buttonY ));
			
			this.buttons.push(button);
			
			buttonY = buttonY - buttonHeight;
		}
	    var menu = cc.Menu.create(this.buttons);
	    //menu.setPosition(cc.p(screenSize.width / 2 , screenSize.height /2 - buttonY / 2 -55 ));
		
		

	    //kuang////////////////////////////////////////////////////////////
        var kuang = cc.Sprite.create();
        
	    var kuangTop = cc.Sprite.create("res/menu/top.png");
	    kuangTop.setPosition(cc.p(0 , buttonHeight * this.items.length + 108));
	    
	    var kuangMidHeight = buttonHeight * this.items.length;
	    var kuangMid = cc.Sprite.create("res/menu/mid.png");
	    kuangMid.draw = function(ctx){
	    	yc.util.tileImage( ctx, "res/menu/mid.png", 0,0, 828 , kuangMidHeight) ;
	    }
	    kuangMid.setPosition(cc.p(-414 , 111 ));
	    
	    var kuangBut = cc.Sprite.create("res/menu/dot.png");
	    kuangBut.setPosition(cc.p(0 , 0));
//	    kuangBut.setRotation(180);
	    

	    

        
        
	    //kuang.addChild(kuangTop);
	    //kuang.addChild(kuangMid);
	    kuang.addChild(kuangBut);
	    kuang.setScale(0.6 , 0.6);
	    kuang.setPosition(cc.p(midX , midY));
	    bj.addChild(kuang);

        this.addChild(kuang);

	    //text
	    this.label = cc.LabelTTF.create('',  'Times New Roman', 14, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT);
	    this.addChild(this.label);
	    this.label.setPosition(cc.p( 0 , 0 ));
	    this.label.setColor ( new cc.Color3B(0,0,0) ); 
	    
	}
	, setItems : function(item){
		this.items = item;
	}
}) ;

yc.ui.menu.Menu.start = function(){
	
	var items = [
	 {
		title:"ActionManagerTest",
		action:function () {
		    alert("111111")
		}
	 },
	 {
		title:"ActionManagerTest",
		action:function () {
			alert("22222222")
		}
	 },
	 {
		title:"ActionManagerTest",
		action:function () {
			alert("22222222")
		}
	 }]

	var menu = new yc.ui.menu.Menu("sssssssss", items);

	var scene = cc.Director.getInstance().getRunningScene() ;
	scene.layerUi.addChild(menu);
}