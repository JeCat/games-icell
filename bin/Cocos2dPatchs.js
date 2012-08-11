yc.cocos2d = {} ;
yc.cocos2d.patchs = {} ;
yc.cocos2d.patchs.Node = {} ;
yc.cocos2d.patchs.Node.transform = function (ctx) {
    var context = ctx || cc.renderContext;
    // transformations
    if (cc.renderContextType == cc.CANVAS) {
        
        //-------------------------------------------
        // 关键部分：记录下 translate 信息
        if (!this._ignoreAnchorPointForPosition) {
            if (this._parent) {
                this._transformX = 0 | (this._position.x - this._parent._anchorPointInPoints.x) ;
                this._transformY = -(0 | (this._position.y - this._parent._anchorPointInPoints.y)) ;
            } else {
                this._transformX = 0 | this._position.x ;
                this._transformY = -(0 | this._position.y) ;
            }
        } else {
            if (this._parent) {
                this._transformX = 0 | ( this._position.x - this._parent._anchorPointInPoints.x + this._anchorPointInPoints.x) ;
                this._transformY = -(0 | (this._position.y - this._parent._anchorPointInPoints.y + this._anchorPointInPoints.y)) ;
            } else {
                this._transformX = 0 | ( this._position.x + this._anchorPointInPoints.x) ;
                this._transformY = -(0 | (this._position.y + this._anchorPointInPoints.y)) ;
            }
        }
        context.translate(this._transformX,this._transformY);
        //-------------------------------------------
        
        

        if (this._rotation != 0) {
            //context.rotate(cc.DEGREES_TO_RADIANS(this._rotation));
            context.rotate(this._rotationRadians);
        }

        if ((this._scaleX != 1) || (this._scaleY != 1)) {
            context.scale(this._scaleX, this._scaleY);
        }

        if ((this._skewX != 0) || (this._skewY != 0)) {
            context.transform(1,
                -Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)),
                -Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)),
                1, 0, 0);
        }
    } else {
        //Todo WebGL implement need fixed
        var transfrom4x4;

        // Convert 3x3 into 4x4 matrix
        var tmpAffine = this.nodeToParentTransform();
        //CGAffineToGL(&tmpAffine, transfrom4x4.mat);

        // Update Z vertex manually
        //transfrom4x4.mat[14] = m_fVertexZ;

        //kmGLMultMatrix( &transfrom4x4 );


        // XXX: Expensive calls. Camera should be integrated into the cached affine matrix
        /*if ( m_pCamera != NULL && !(m_pGrid != NULL && m_pGrid->isActive()) ) {
         bool translate = (m_tAnchorPointInPoints.x != 0.0f || m_tAnchorPointInPoints.y != 0.0f);

         if( translate )
         kmGLTranslatef(RENDER_IN_SUBPIXEL(m_tAnchorPointInPoints.x), RENDER_IN_SUBPIXEL(m_tAnchorPointInPoints.y), 0 );

         m_pCamera->locate();

         if( translate )
         kmGLTranslatef(RENDER_IN_SUBPIXEL(-m_tAnchorPointInPoints.x), RENDER_IN_SUBPIXEL(-m_tAnchorPointInPoints.y), 0 );
         }*/
    }
}