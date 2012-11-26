var UPGRADEBUILDINGBTN_STATE_GRABBED = 0;
var UPGRADEBUILDINGBTN_STATE_UNGRABBED = 1;

var UpgradeBuildingBtn = cc.Sprite.extend({
    _state:UPGRADEBUILDINGBTN_STATE_UNGRABBED,
    // _rect:null,
    type:"UpgradeBuildingBtn",

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithImg:function (aTexture) {
        this._state = UPGRADEBUILDINGBTN_STATE_UNGRABBED;

        this.initWithFile(aTexture);

        this._rect = cc.rect(0, 0, this.getContentSize().width , this.getContentSize().height);
       
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

        myRect.origin.x += this.getParent().getPosition().x + this.getPosition().x;
        myRect.origin.y += this.getParent().getPosition().y + this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    }
    ,onTouchBegan:function (touch, event) {
        if (this._state != UPGRADEBUILDINGBTN_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)){
            ins(yc.ui.BuildingUpgradeMenu).touchMiss(touch);
            return false;
        }
        this._state = UPGRADEBUILDINGBTN_STATE_GRABBED;
        return true;
    }
    ,onTouchMoved:function (touch, event) {
    }
    ,onTouchEnded:function (touch, event) {
        var that = this;
        cc.Assert(this._state == UPGRADEBUILDINGBTN_STATE_GRABBED, "UpgradeBuildingBtn - Unexpected state!");
        this._state = UPGRADEBUILDINGBTN_STATE_UNGRABBED;

        var BuildingUpgradeMenu = ins(yc.ui.BuildingUpgradeMenu);
            
        BuildingUpgradeMenu.showBuildingDes(this.hexgon , this.building ,this.upgrader, this.getPosition() , this.bBuildable , this) ;

        console.log( this.upgrader.title + ' building btn touch end');
    }
    , touchDelegateRetain:function () {
    }
    , touchDelegateRelease:function () {
    }
    , addTexture : function(aTexture){
        if(!this._arrTextures){
            this._arrTextures = [];
        }
        this._arrTextures.push(aTexture);
    }
    , setFaceType : function(type){
        if(type==='nm'){
            this.initWithFile(this._arrTextures[2]);
        }else if(type==='l'){
            this.initWithFile(this._arrTextures[1]);
        }else{
            this.initWithFile(this._arrTextures[0]);
        }
    }
    , setBuildable: function( bBuildable ){
        this.bBuildable = bBuildable ? true:false;
    }
});

UpgradeBuildingBtn.buildingBtnWithTexture = function (sImgName1,sImgName2,sImgName3 ) {
    var buildingBtn = new UpgradeBuildingBtn();

    buildingBtn.addTexture(sImgName1);
    buildingBtn.addTexture(sImgName2);
    buildingBtn.addTexture(sImgName3);

    buildingBtn.setBuildable(true);

    buildingBtn.initWithImg(sImgName1);

    return buildingBtn;
};