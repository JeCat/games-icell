var CREATEBUILDINGBTN_STATE_GRABBED = 0;
var CREATEBUILDINGBTN_STATE_UNGRABBED = 1;

var CreateBuildingBtn = cc.Sprite.extend({
    _state:CREATEBUILDINGBTN_STATE_UNGRABBED,
    _rect:null,

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithTexture:function (aTexture) {
        if (this._super(aTexture)) {
            this._state = CREATEBUILDINGBTN_STATE_UNGRABBED;
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
        if(this.isLocked()){
            this.setFaceType('l');
            this.setBuildable(false);
        }

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

        myRect.origin.x += this.getParent().getPosition().x + this.getPosition().x;
        myRect.origin.y += this.getParent().getPosition().y + this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    }
    ,onTouchBegan:function (touch, event) {
        if (this._state != CREATEBUILDINGBTN_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)){
            ins(yc.ui.BuildingCreateMenu).close();
            return false;
        }
        this._state = CREATEBUILDINGBTN_STATE_GRABBED;
        return true;
    }
    ,onTouchMoved:function (touch, event) {
    }
    ,onTouchEnded:function (touch, event) {
        var that = this;
        cc.Assert(this._state == CREATEBUILDINGBTN_STATE_GRABBED, "CreateBuildingBtn - Unexpected state!");
        this._state = CREATEBUILDINGBTN_STATE_UNGRABBED;

        var BuildingCreateMenu = ins(yc.ui.BuildingCreateMenu);
            
        BuildingCreateMenu.showBuildingDes(this.hexgon , this.building , this.getPosition() , this.bBuildabel);

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
    //type : nm = noMoney ; l = lock ; other = normal
    , setFaceType : function(type){
        if(type==='nm'){
            this.setTexture(this._arrTextures[2]);
        }else if(type==='l'){
            this.setTexture(this._arrTextures[1]);
        }else{
            this.setTexture(this._arrTextures[0]);
        }
    }
    , setBuildable: function( bBuildabel ){
        this.bBuildabel = bBuildabel ? true:false;
    }
    , isLocked : function(){
        return false;
    }
});

CreateBuildingBtn.buildingBtnWithTexture = function (sImgName1,sImgName2,sImgName3 ) {
    var buildingBtn = new CreateBuildingBtn();
    var aTexture1 = buildingBtn.performPNG(sImgName1);
    var aTexture2 = buildingBtn.performPNG(sImgName2);
    var aTexture3 = buildingBtn.performPNG(sImgName3);
    if ( aTexture1 && aTexture2 && aTexture3 ){
        buildingBtn.addTexture(aTexture1);
        buildingBtn.addTexture(aTexture2);
        buildingBtn.addTexture(aTexture3);
    }else{
        return false;
    }

    buildingBtn.setBuildable(true);

    buildingBtn.initWithTexture(aTexture1);

    return buildingBtn;
};