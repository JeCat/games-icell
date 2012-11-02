var BUILDINGBTN_STATE_GRABBED = 0;
var BUILDINGBTN_STATE_UNGRABBED = 1;

var BuildingBtn = cc.Sprite.extend({
    _state:BUILDINGBTN_STATE_UNGRABBED,
    _rect:null,

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithTexture:function (aTexture) {
        if (this._super(aTexture)) {
            this._state = BUILDINGBTN_STATE_UNGRABBED;
        }
        if (aTexture instanceof cc.Texture2D) {
            var s = aTexture.getContentSize();
            this._rect = cc.rect(0, 0, s.width , s.height);
        } else if ((aTexture instanceof HTMLImageElement) || (aTexture instanceof HTMLCanvasElement)) {
            this._rect = cc.rect(0, 0, aTexture.width, aTexture.height);
        }
        return true;
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
        if (this._state != BUILDINGBTN_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)){
            return false;
        }
        this._state = BUILDINGBTN_STATE_GRABBED;
        return true;
    }
    ,onTouchMoved:function (touch, event) {
    }
    ,onTouchEnded:function (touch, event) {
        var that = this;
        cc.Assert(this._state == BUILDINGBTN_STATE_GRABBED, "BuildingBtn - Unexpected state!");
        this._state = BUILDINGBTN_STATE_UNGRABBED;

        var BuildingCreateMenu = ins(yc.ui.BuildingCreateMenu);
        if(this.yesMenu){
            this.yesMenu.removeFromParent(true);
        }
        this.yesBtn = cc.MenuItemImage.create(
            "res/btn-yes.png",
            "res/btn-yes-1.png",
            null,
            this,
            function (){
                if(BuildingCreateMenu.createBuilding(that.hexgon , that.building )){
                    BuildingCreateMenu.close();
                }
            }
        );
        this.yesMenu = cc.Menu.create(this.yesBtn);
        this.yesMenu.setPosition(this.getPosition());
        BuildingCreateMenu.ui.addChild(this.yesMenu);

        console.log( this.building.title + ' building btn touch end');
        
        // window.event.cancelBubble = true;   //stop event go through
    }
    , touchDelegateRetain:function () {
    }
    , touchDelegateRelease:function () {
    }
    ,performPNG : function (filename) {
        var now = cc.timeval();
        var texture;
        var cache = cc.TextureCache.getInstance();

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB565);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            return texture;
        else
            cache.removeTexture(texture);
        return null;
    }
    , addTexture : function(aTexture){
        if(!this._arrTextures){
            this._arrTextures = [];
        }
        this._arrTextures.push(aTexture);
    }
});

BuildingBtn.buildingBtnWithTexture = function (sImgName1,sImgName2,sImgName3 ) {
    var buildingBtn = new BuildingBtn();
    var aTexture1 = star.performPNG(sImgName1);
    var aTexture2 = star.performPNG(sImgName2);
    var aTexture3 = star.performPNG(sImgName3);
    if ( aTexture1 && aTexture2 && aTexture3 ){
        star.addTexture(aTexture1);
        star.addTexture(aTexture2);
        star.addTexture(aTexture3);
    }else{
        return false;
    }

    return buildingBtn;
};