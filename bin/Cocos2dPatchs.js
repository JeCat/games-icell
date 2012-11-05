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




yc.cocos2d.patchs.TouchDispatcher = {} ;
yc.cocos2d.patchs.TouchDispatcher.touches = function (touches, event, index) {
	cc.Assert(index >= 0 && index < 4, "TouchDispatcher.touches()");

	this._locked = true;

	// optimization to prevent a mutable copy when it is not necessary
	var targetedHandlersCount = this._targetedHandlers.length;
	var standardHandlersCount = this._standardHandlers.length;
	var needsMutableSet = (targetedHandlersCount && standardHandlersCount);

	var mutableTouches = (needsMutableSet ? touches.slice() : touches);
	var helper = this._handlerHelperData[index];
	//
	// process the target handlers 1st
	//
	if (targetedHandlersCount > 0) {
		var touch;
		for (var i = 0; i < touches.length; i++) {
			touch = touches[i];
			var handler;

			for (var j = 0; j < this._targetedHandlers.length; j++) {
				handler = this._targetedHandlers[j];

				if (!handler) {
					break;
				}

				var claimed = false;
				if (index == cc.TOUCH_BEGAN) {
					claimed = handler.getDelegate().onTouchBegan(touch, event);

					if (claimed) {
						handler.getClaimedTouches().push(touch);
					}
					//} else if (handler.getClaimedTouches().indexOf(touch)> -1){
				} else if (handler.getClaimedTouches().length > 0) {
					// moved ended cancelled
					claimed = true;
					switch (helper.type) {
						case cc.TOUCH_MOVED:
							handler.getDelegate().onTouchMoved(touch, event);
							break;
						case cc.TOUCH_ENDED:
							handler.getDelegate().onTouchEnded(touch, event);
							handler.getClaimedTouches().length = 0;
							//cc.ArrayRemoveObject(handler.getClaimedTouches(),touch);
							break;
						case cc.TOUCH_CANCELLED:
							handler.getDelegate().onTouchCancelled(touch, event);
							handler.getClaimedTouches().length = 0;
							//cc.ArrayRemoveObject(handler.getClaimedTouches(),touch);
							break;
					}
				}

				if (claimed && handler.isSwallowsTouches()) {
					if (needsMutableSet) {
						cc.ArrayRemoveObject(mutableTouches, touch);
					}
					break;
				}
			}
		}
	}

	//
	// process standard handlers 2nd
	//
	if (standardHandlersCount > 0) {
		for (i = 0; i < this._standardHandlers.length; i++) {
			handler = this._standardHandlers[i];

			if (!handler) {
				break;
			}

			var res = null ;
			
			switch (helper.type) {
				case cc.TOUCH_BEGAN:
					if (mutableTouches.length > 0) {
						res = handler.getDelegate().onTouchesBegan(mutableTouches, event);
					}
					break;
				case cc.TOUCH_MOVED:
					if (mutableTouches.length > 0) {
						res = handler.getDelegate().onTouchesMoved(mutableTouches, event);
					}
					break;
				case cc.TOUCH_ENDED:
					res = handler.getDelegate().onTouchesEnded(mutableTouches, event);
					break;
				case cc.TOUCH_CANCELLED:
					res = handler.getDelegate().onTouchesCancelled(mutableTouches, event);
					break;
			}
			
			// 停止事件
			if(res===false)
			{
				break ;
			}
		}
	}

	if (needsMutableSet) {
		mutableTouches = null;
	}

	//
	// Optimization. To prevent a [handlers copy] which is expensive
	// the add/removes/quit is done after the iterations
	//
	this._locked = false;
	if (this._toRemove) {
		this._toRemove = false;
		for (i = 0; i < this._handlersToRemove.length; i++) {
			this.forceRemoveDelegate(this._handlersToRemove[i]);
		}
		this._handlersToRemove.length = 0;
	}

	if (this._toAdd) {
		this._toAdd = false;

		for (i = 0; i < this._handlersToAdd.length; i++) {
			handler = this._handlersToAdd[i];
			if (!handler) {
				break;
			}

			if (handler  instanceof cc.TargetedTouchHandler) {
				this._targetedHandlers = this.forceAddHandler(handler, this._targetedHandlers);
			} else {
				this._standardHandlers = this.forceAddHandler(handler, this._standardHandlers);
			}
		}
		this._handlersToAdd.length = 0;
	}

	if (this._toQuit) {
		this._toQuit = false;
		this.forceRemoveAllDelegates();
	}
}

cc.TouchDispatcher.prototype.touches = yc.cocos2d.patchs.TouchDispatcher.touches ;










/**
 * draw sprite to canvas
 * @param {CanvasContext} ctx 2d context of canvas
 */
cc.Sprite.prototype.draw = function (ctx) {
    //draw for canvas
    //cc.PROFILER_START_CATEGORY(kCCProfilerCategorySprite, "cc.Sprite - draw");
    var context = ctx || cc.renderContext;

    if (this._isLighterMode)
        context.globalCompositeOperation = 'lighter';


    
    // --------------------------------------------
    // context.globalAlpha = this._opacity / 255;
    context.globalAlpha*= this._opacity / 255;
    // --------------------------------------------


    var mpX = 0, mpY = 0;
    if (this._flipX) {
        mpX = 0 | (this._contentSize.width / 2 - this._anchorPointInPoints.x);
        context.translate(mpX, 0);
        context.scale(-1, 1);
    }
    if (this._flipY) {
        mpY = -(0 | (this._contentSize.height / 2 - this._anchorPointInPoints.y));
        context.translate(0, mpY);
        context.scale(1, -1);
    }

    var posX = 0 | ( -this._anchorPointInPoints.x - mpX + this._offsetPosition.x);
    var posY = 0 | ( -this._anchorPointInPoints.y + mpY + this._offsetPosition.y);

    if (this._texture) {
        if (this._texture instanceof HTMLImageElement) {
            if ((this._contentSize.width == 0) && (this._contentSize.height == 0)) {
                this.setContentSize(cc.size(this._texture.width, this._texture.height));
                this._rect.size.width = this._texture.width;
                this._rect.size.height = this._texture.height;
                context.drawImage(this._texture, posX, -(posY + this._texture.height));
            } else {
                context.drawImage(this._texture,
                    this._rect.origin.x, this._rect.origin.y,
                    this._rect.size.width, this._rect.size.height,
                    posX, -(posY + this._rect.size.height),
                    this._rect.size.width, this._rect.size.height);
            }
        } else {
            if ((this._contentSize.width == 0) && (this._contentSize.height == 0)) {
                this.setContentSize(cc.size(this._texture.width, this._texture.height));
                this._rect.size.width = this._texture.width;
                this._rect.size.height = this._texture.height;
                context.drawImage(this._texture, posX, -(posY + this._texture.height));
            } else {
                context.drawImage(this._texture,
                    0, 0,
                    this._rect.size.width, this._rect.size.height,
                    posX, -(posY + this._rect.size.height),
                    this._rect.size.width, this._rect.size.height);
            }
        }
    } else {
        context.fillStyle = "rgba(" + this._color.r + "," + this._color.g + "," + this._color.b + ",1)";
        context.fillRect(posX, posY, this._contentSize.width, this._contentSize.height);
    }

    if (cc.SPRITE_DEBUG_DRAW == 1) {
        // draw bounding box
        context.strokeStyle = "rgba(0,255,0,1)";
        var vertices1 = [cc.p(posX, posY), cc.p(posX + this._rect.size.width, posY), cc.p(posX + this._rect.size.width, posY + this._rect.size.height),
            cc.p(posX, posY + this._rect.size.height)];
        cc.drawingUtil.drawPoly(vertices1, 4, true);
    } else if (cc.SPRITE_DEBUG_DRAW == 2) {
        // draw texture box
        context.strokeStyle = "rgba(0,255,0,1)";
        var drawSize = this._rect.size;
        var offsetPix = this.getOffsetPosition();
        var vertices2 = [cc.p(offsetPix.x, offsetPix.y), cc.p(offsetPix.x + drawSize.width, offsetPix.y),
            cc.p(offsetPix.x + drawSize.width, offsetPix.y + drawSize.height), cc.p(offsetPix.x, offsetPix.y + drawSize.height)];
        cc.drawingUtil.drawPoly(vertices2, 4, true);
    }

    //cc.INCREMENT_GL_DRAWS(1);
    cc.g_NumberOfDraws++;

    //CC_PROFILER_STOP_CATEGORY(kCCProfilerCategorySprite, "CCSprite - draw");
} 
