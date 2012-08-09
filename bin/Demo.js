 var Helloworld = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLb:null,
    circle:null,
    sprite:null,

    init:function () {
    	    	
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        //this.helloLb = cc.LabelTTF.create("Hello World", "Arial", 24);
        // position the label on the center of the screen
        //this.helloLb.setPosition(cc.p(cc.Director.getInstance().getWinSize().width / 2, 0));
        // add the label as a child to this layer
        //this.addChild(this.helloLb, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new yc.outer.Cell();
        this.addChild(this.sprite, 0);
        


        var actionTo = cc.SkewTo.create(5, 0., 45);
        var actionToBack = cc.SkewTo.create(5, 0, 0);
        var rotateTo = cc.RotateTo.create(5, 300.0);
        var rotateToBack = cc.RotateTo.create(5, 0);
        var actionScaleTo = cc.ScaleTo.create(5, -0.44, 0.47);
        var actionScaleToBack = cc.ScaleTo.create(5, 1.0, 1.0);
        var actionBy = cc.MoveBy.create(5, cc.p(80, 80));
        var actionByBack = actionBy.reverse();

        //this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));


        this.sprite.runAction(cc.Sequence.create(actionTo, actionToBack, null));
        this.sprite.runAction(cc.Sequence.create(rotateTo, rotateToBack, null));
        this.sprite.runAction(cc.Sequence.create(actionScaleTo, actionScaleToBack));
        this.sprite.runAction(cc.Sequence.create(actionBy, actionByBack));


        this.setTouchEnabled(true);


        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            this,
            this.menuCloseCallback);
        var text = cc.MenuItemFont.create("Hello Dom", this, function () {
        	log('hi') ;
        });
        text.setColor({r:255, g:0, b:0});
        text.setPosition(cc.p(cc.canvas.width / 2, cc.canvas.height / 2));
        closeItem.setPosition(cc.p(cc.canvas.width - 20, 20));
        var menu = cc.Menu.create(closeItem, text);
        menu.setPosition(cc.p(0, 0));
        this.sprite.addChild(menu);
        //cc.fullscreen();

        cc.DOM.convert(this.sprite, closeItem, text);
        return true;
    },
    // a selector callback
    menuCloseCallback:function (sender) {
        history.go(-1);
    }

});
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});


