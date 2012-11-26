var STAR_STATE_GRABBED = 0;
var STAR_STATE_UNGRABBED = 1;

var Star = cc.Sprite.extend({
    _state:STAR_STATE_UNGRABBED,
    // _rect:null,

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithImg:function (sImgName) {

        this._state = STAR_STATE_UNGRABBED;

        this.initWithFile(sImgName);

        this._rect = cc.rect(0, 0, this.getContentSize().width, this.getContentSize().height);  

        return true;
    },
    addTexture : function(aTexture){
        if(!this._arrTextures){
            this._arrTextures = [];
        }
        this._arrTextures.push(aTexture);
    },
    onEnter:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
        this._super();
    },
    onExit:function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.origin.x += this.getPosition().x;
        myRect.origin.y += this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    }
    ,onTouchBegan:function (touch, event) {
        if(!this.bClickable){
            return false;
        }

        if (this._state != STAR_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)) return false;

        this._state = STAR_STATE_GRABBED;

        this.initWithFile(this._arrTextures[1]);
        
        this.timer();

        return true;
    }
    ,onTouchMoved:function (touch, event) {
    }
    ,onTouchEnded:function (touch, event) {
        cc.Assert(this._state == STAR_STATE_GRABBED, "Star - Unexpected state!");
        this._state = STAR_STATE_UNGRABBED;

        ins(yc.inner.building.ProteinFactory).singleComposite( this.getFormula() );

        if(!this.bAutoMode){
            this.initWithFile(this._arrTextures[0]);
        }

        if(this.interval !== undefined){
            clearInterval(this.interval);
        }

        this.nTime = 0 ;
    }
    , toglleAutoMode : function(bAuto){
        if(this.bAutoMode === undefined){
            this.bAutoMode = false;
        }
        if(bAuto === undefined){
            bAuto = this.bAutoMode;
        }

        if(bAuto === false){
            this.initWithFile(this._arrTextures[2]);
            this.bAutoMode = true;
        }else{
            this.initWithFile(this._arrTextures[0]);
            this.bAutoMode = false;
        }
        ins(yc.user.ProteinFormulas).toggle( this.getFormula().name );
    }
    
    , setClickable : function(bAble){
        this.bClickable = bAble;
    }
    , setFormula : function(aFormula){
        this.aFormula = aFormula;
    }
    , getFormula : function(){
        return this.aFormula ;
    }
    , timer : function(){
        var target = this;
        this.nTime = Date.parse(new Date())/1000 ;
        this.interval = setInterval(function(){
            var howLongPress = Date.parse(new Date())/1000 - target.nTime;
            if( howLongPress > 1){
                target.toglleAutoMode();
                clearInterval(target.interval);
                target.nTime = 0 ;
            }
        },300);
    }
    , touchDelegateRetain:function () {
    }
    , touchDelegateRelease:function () {
    }
   
});

Star.starWithTexture = function (sImgName1, sImgName2 , sImgName3) {

    var star = new Star();

    star.setClickable(true);

    star.nTime = 0;

    star.addTexture(sImgName1);
    star.addTexture(sImgName2);
    star.addTexture(sImgName3);

    star.initWithImg(sImgName1);
    return star;
};