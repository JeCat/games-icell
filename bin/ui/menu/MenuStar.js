yc.ui.menu.MenuStar = cc.Layer.extend(
{
	items : null,
	title : null,
	titleHeight : 155,
	starNum : 0,
	buttons : [],
	BtnCallBack: function(sender){
		var idx = sender.getZOrder();
        this.items[idx].action();
        this.setVisible(false) ;
	},
	setTitle : function( title){
		this.title = title;
	},
	setTitleHeight : function( titleHeight){
		this.titleHeight = titleHeight;
	},
	setStarNum : function( n){
		this.starNum = n;
	},
	setItems : function( items){
		this.items = items;
	},
	run: function(){

		var screenSize = cc.Director.getInstance().getWinSize();
		
		//button height
		var buttonHeight = 150;
		var titleHeight = this.titleHeight;
	    var starHeight = 100;

		var midX = screenSize.width / 2;
		var midY = screenSize.height / 2;

		
		//bj//////////////////////////////////////////////////////////////////
        var bj = cc.LayerColor.create(cc.c4(0, 0, 0, 200), screenSize.width, screenSize.height);
        
		//buttons//////////////////////////////////////////////////////
		var buttonY = 0;
		for(var i =0;i<this.items.length;i++){

			var button = cc.MenuItemImage.create(
		        "res/menu/btn.png",
		        "res/menu/btn2.png",
		        this.BtnCallBack,
		        this
		    );
			button.setPosition(cc.p(0 , buttonY));
			this.buttons.push(button);
			
			var label = cc.LabelTTF.create(this.items[i].title, "Arial", 50);
			label.setPosition(cc.p(+240 , +55));
			button.addChild(label);
			buttonY = buttonY - buttonHeight;
		}
	    var menu = cc.Menu.create(this.buttons);
	    menu.setPosition(cc.p(430 , -(titleHeight + starHeight + 190)));
	    
	    //kuang////////////////////////////////////////////////////////////
        var kuang = cc.Sprite.create();
	    var kuangMidHeight = buttonHeight * this.items.length + titleHeight + starHeight;
	    var kuangHeight = kuangMidHeight + 222;
        
	    var kuangTop = cc.Sprite.create("res/menu/top.png");
	    kuangTop.setAnchorPoint(new cc.Point(0,1));
	    kuangTop.setPosition(cc.p(0 , 0));
	    
	    var kuangMid = cc.Sprite.create();
	    kuangMid.draw = function(ctx){
	    	yc.util.tileImage( ctx, "res/menu/mid.png", 0,0, 828  , kuangMidHeight) ;
	    }
	    kuangMid.setPosition(cc.p(0 , -110 ));
	    
	    var kuangBut = cc.Sprite.create("res/menu/but.png");
	    kuangBut.setAnchorPoint(new cc.Point(0,1));
	    kuangBut.setPosition(cc.p(0 , - (109 + kuangMidHeight )));
	    

        //var dot = cc.Sprite.create("res/menu/dot.png");
        //dot.setPosition(cc.p(0 , 0 ));

	    
	    // star
	    var starLayer = new cc.Layer ;
	    starLayer.setPosition(cc.p( 350 , - 100 )) ;
	    
    	var startIco = this.starNum >= 1 ? "res/star2.png" : "res/star3.png";
	    var starIcon1 = new cc.Sprite() ;
	    starIcon1.initWithFile( startIco) ;
		starLayer.addChild(starIcon1);
		
		var label = cc.LabelTTF.create("普通击杀", "Arial", 20);
		//label.setColor("#000000");
		label.setPosition(cc.p(130 , 0));
		starLayer.addChild(label);
		

    	startIco = this.starNum >= 2 ? "res/star2.png" : "res/star3.png";
		var posx = 0;
		for(var i=0; i<2; i++){
			
			var geneIcon = new cc.Sprite() ;
			geneIcon.initWithFile(startIco) ;
			geneIcon.setPosition(cc.p(posx, - 30 )) ;
			starLayer.addChild(geneIcon);
			posx+= 34  ;
		}
		var label = cc.LabelTTF.create("完全击杀", "Arial", 20);
		label.setPosition(cc.p(130 , -30));
		starLayer.addChild(label);

    	startIco = this.starNum >= 3 ? "res/star2.png" : "res/star3.png";
		var posx = 0;
		for(var i=0; i<3; i++){
			
			var geneIcon = new cc.Sprite() ;
			geneIcon.initWithFile(startIco) ;
			geneIcon.setPosition(cc.p(posx, - 60 )) ;
			starLayer.addChild(geneIcon);
			posx+= 34  ;
		}
		var label = cc.LabelTTF.create("完美击杀", "Arial", 20);
		label.setPosition(cc.p(130 , -60));
		starLayer.addChild(label);
		


	    //text
	    var title = this.title;
	    var fontSprinte = cc.Sprite.create();
	    fontSprinte.draw = function(ctx){
		    var font = ins(yc.ui.font.Font);
	    	font.setWidth(650);
	    	font.setHeight(titleHeight);
	    	font.setTextIndent(0);
	    	font.setTextAlign('center');
	    	font.setLetterSpacing(4);
	    	font.setLineHeight(40);
	    	font.setText("[color=#FFF;weight=bold;size=40;font=隶书]" + title + "[/]");
	    	font.draw(ctx);
	    };
	    fontSprinte.setPosition(cc.p( 100 , - (starHeight + 120) ));
		
	    //缩放
		var Scale = screenSize.height / (kuangHeight + 100);
		if(Scale > 0.95){
			Scale = 0.95;
		}
        
	    kuang.addChild(kuangTop);
	    kuang.addChild(kuangMid);
	    kuang.addChild(kuangBut);
	    kuang.addChild(starLayer);
	    kuang.addChild(menu);
	    kuang.addChild(fontSprinte);
	    kuang.setScale(Scale , Scale);
	    kuang.setPosition(cc.p(midX - (414*Scale)  , midY + (kuangHeight/2)*Scale ));
	    //bj.addChild(kuang);

	    this.addChild(bj);
	    this.addChild(kuang);
        //this.addChild(dot);

		var scene = cc.Director.getInstance().getRunningScene() ;
		scene.layerUi.addChild(this);
	    
		return true;
	}
}) ;

yc.ui.menu.MenuStar.test = function(){
	
	var items = [
	 {
		title:"[解锁]防御塔(射击)",
		action:function () {
		    
		}
	 },{
			title:"[解锁]防御塔(火炮)",
			action:function () {
			    
			}
		 },{
				title:"[解锁]防御塔(减速)",
				action:function () {
				    
				}
			 }]

	var menu = ins( yc.ui.menu.MenuStar );
	menu.setTitle("选择DNA");
	menu.setStarNum(1);
	menu.setTitleHeight(40);
	menu.setItems(items);
	menu.run();
}