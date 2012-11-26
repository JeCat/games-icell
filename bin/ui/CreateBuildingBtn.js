var CREATEBUILDINGBTN_STATE_GRABBED = 0;
var CREATEBUILDINGBTN_STATE_UNGRABBED = 1;

var CreateBuildingBtn = cc.Sprite.extend({
    _state:CREATEBUILDINGBTN_STATE_UNGRABBED,
    // _rect:null,
    type:"CreateBuildingBtn",

    rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },
    initWithImg:function (sImgName) {
        this._state = CREATEBUILDINGBTN_STATE_UNGRABBED;

        this.initWithFile(sImgName);

        this._rect = cc.rect(0, 0, this.getContentSize().width , this.getContentSize().height);
       
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
            ins(yc.ui.BuildingCreateMenu).touchMiss(touch);
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
            
        BuildingCreateMenu.showBuildingDes(this.hexgon , this.building , this.getPosition() , this.bBuildable);

        console.log( this.building.title + ' building btn touch end');
        
        // window.event.cancelBubble = true;   //stop event go through
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
    //type : nm = noMoney ; l = lock ; other = normal
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
    , isLocked : function(){
        return false;
    }
});

CreateBuildingBtn.buildingBtnWithTexture = function (sImgName1,sImgName2,sImgName3 ) {
    var buildingBtn = new CreateBuildingBtn();

    buildingBtn.addTexture(sImgName1);
    buildingBtn.addTexture(sImgName2);
    buildingBtn.addTexture(sImgName3);

    buildingBtn.setBuildable(true);

    buildingBtn.initWithImg(sImgName1);

    return buildingBtn;
};