yc.outer.SceneOuter = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        // 摄像机
        this.aCamera = new yc.outer.Camera(this) ;
        
        // 层
        this.layerPlayer = new cc.Layer();
        this.addChild(this.layerPlayer);
        this.layerPlayer.init();
        
        // 细胞
        this.cell = new yc.outer.Cell() ;
        this.layerPlayer.addChild(this.cell) ;
        this.cell.init() ;
    }
});