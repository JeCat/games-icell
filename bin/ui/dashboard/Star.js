var STAR_STATE_GRABBED = 0;
var STAR_STATE_UNGRABBED = 1;

var Star = cc.Sprite.extend({
    _state:STAR_STATE_UNGRABBED,
    _rect:null,
    // _arrTextures : [],

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithTexture:function (aTexture) {
here() ;
        if (this._super(aTexture)) {
            this._state = STAR_STATE_UNGRABBED;
        }
here() ;
        if (aTexture instanceof cc.Texture2D) {
            var s = aTexture.getContentSize();
            this._rect = cc.rect(0, 0, s.width, s.height);
        } else if ((aTexture instanceof HTMLImageElement) || (aTexture instanceof HTMLCanvasElement)) {
            this._rect = cc.rect(0, 0, aTexture.width, aTexture.height);
        }
here() ;
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

        this.setTexture(this._arrTextures[1]);
        
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
            this.setTexture(this._arrTextures[0]);
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
            this.setTexture(this._arrTextures[2]);
            this.bAutoMode = true;
        }else{
            this.setTexture(this._arrTextures[0]);
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
    ,performPNG : function (filename) {
        //var now = cc.timeval();
here() ;
        var texture;
        var cache = cc.TextureCache.getInstance();
here() ;
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
here() ;
        var now = cc.Time.gettimeofdayCocos2d();
here() ;
        texture = cache.addImage(filename);
here() ;
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);
here() ;
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);
here() ;
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);
here() ;
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB565);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);
here() ;
        return null;
    }
});

Star.starWithTexture = function (sImgName1, sImgName2 , sImgName3) {
here() ;
    var star = new Star();
here() ;
    star.setClickable(true);
here() ;
    star.nTime = 0;
    var aTexture1 = star.performPNG(sImgName1);
here() ;
    var aTexture2 = star.performPNG(sImgName2);
    var aTexture3 = star.performPNG(sImgName3);
here() ;
    if ( aTexture1 && aTexture2 && aTexture3 ){
        star.addTexture(aTexture1);
        star.addTexture(aTexture2);
        star.addTexture(aTexture3);
    }else{
        return false;
    }
here() ;

    star.initWithTexture(aTexture1);
    return star;
};




// var STAR_STATE_GRABBED = 0;
// var STAR_STATE_UNGRABBED = 1;

// var Star = cc.Sprite.extend({
//     _state:STAR_STATE_UNGRABBED,
//     _rect:null,

//     rect:function () {
//         return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
//     },
//     initWithTexture:function (aTexture) {
//         if (this._super(aTexture)) {
//             this._state = STAR_STATE_UNGRABBED;
//         }
//         if (aTexture instanceof cc.Texture2D) {
//             var s = aTexture.getContentSize();
//             this._rect = cc.rect(0, 0, s.width, s.height);
//         } else if ((aTexture instanceof HTMLImageElement) || (aTexture instanceof HTMLCanvasElement)) {
//             this._rect = cc.rect(0, 0, aTexture.width, aTexture.height);
//         }
//         return true;
//     },
//     onEnter:function () {
//         cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
//         this._super();
//     },
//     onExit:function () {
//         cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
//         this._super();
//     },
//     containsTouchLocation:function (touch) {
//         var getPoint = touch.getLocation();
//         var myRect = this.rect();

//         myRect.origin.x += this.getPosition().x;
//         myRect.origin.y += this.getPosition().y;
//         return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
//     }
//     ,onTouchBegan:function (touch, event) {
//         if (this._state != STAR_STATE_UNGRABBED) return false;
//         if (!this.containsTouchLocation(touch)) return false;

//         this._state = STAR_STATE_GRABBED;
//         return true;
//     }
//     ,onTouchMoved:function (touch, event) {
//         // If it weren't for the TouchDispatcher, you would need to keep a reference
//         // to the touch from touchBegan and check that the current touch is the same
//         // as that one.
//         // Actually, it would be even more complicated since in the Cocos dispatcher
//         // you get CCSets instead of 1 UITouch, so you'd need to loop through the set
//         // in each touchXXX method.
//         cc.Assert(this._state == STAR_STATE_GRABBED, "Star - Unexpected state!");

//         var touchPoint = touch.getLocation();

//         this.setPosition(cc.p(touchPoint.x, touchPoint.y));
//     }
//     ,onTouchEnded:function (touch, event) {
//         cc.Assert(this._state == STAR_STATE_GRABBED, "Star - Unexpected state!");
//         this._state = STAR_STATE_UNGRABBED;
//     }
//     , touchDelegateRetain:function () {
//     }
//     , touchDelegateRelease:function () {
//     }
//     ,performPNG : function (filename) {
//         var now = cc.timeval();
//         var texture;
//         var cache = cc.TextureCache.getInstance();

//         cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
//         var now = cc.Time.gettimeofdayCocos2d();
//         texture = cache.addImage(filename);
//         if (texture)
//             return texture;
//         else
//             cache.removeTexture(texture);

//         cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
//         var now = cc.Time.gettimeofdayCocos2d();
//         texture = cache.addImage(filename);
//         if (texture)
//             return texture;
//         else
//             cache.removeTexture(texture);

//         cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1);
//         var now = cc.Time.gettimeofdayCocos2d();
//         texture = cache.addImage(filename);
//         if (texture)
//             return texture;
//         else
//             cache.removeTexture(texture);

//         cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB565);
//         var now = cc.Time.gettimeofdayCocos2d();
//         texture = cache.addImage(filename);
//         if (texture)
//             return texture;
//         else
//             cache.removeTexture(texture);
//         return null;
//     }
// });

// Star.starWithTexture = function (sImgName) {
//     var star = new Star();
//     var aTexture = star.performPNG(sImgName)
//     if ( aTexture ){
//         star.initWithTexture(aTexture);
//     }else{
//         return false;
//     }
//     return star;
// };