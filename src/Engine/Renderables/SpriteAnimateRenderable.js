class SpriteAnimateRenderable extends SpriteRenderable {
    constructor(myTexture) {
        super(myTexture);
        this.setShader(gEngine.DefaultResources.getSpriteShader());

        // All coordinates are in texture coordinate(UV between 0 to 1)
        this.mFirstElmLeft = 0.0; // 0.0 is left corner of image
        this.mElmTop = 1.0; // 1.0 is top corner of image
        this.mElmWidth = 1.0;
        this.mElmHeight = 1.0;
        this.mWidthPadding = 0.0;
        this.mNumElems = 1; // number of elements in an animation

        this.mAnimationType = SpriteAnimateRenderable.eAnimationType.eAnimateRight;
        this.mUpdateInterval = 1;

        this.mCurrentAnimAdvance = -1;
        this.mCurrentElm = 0;
        this._initAnimation();
    }

    setAnimationType(animationType) {
        this.mAnimationType = animationType;
        this.mCurrentAnimAdvance = -1;
        this.mCurrentElm = 0;
        this._initAnimation();
    }

    _initAnimation() {
        this.mCurrentTick = 0;
        switch (this.mAnimationType) {
            case SpriteAnimateRenderable.eAnimationType.eAnimateRight:
                this.mCurrentElm = 0;
                this.mCurrentAnimAdvance = 1;
                break;
            case SpriteAnimateRenderable.eAnimationType.eAnimateLeft:
                this.mCurrentElm = this.mNumElems - 1;
                this.mCurrentAnimAdvance = -1;
                break;
            case SpriteAnimateRenderable.eAnimationType.eAnimateSwing:
                this.mCurrentAnimAdvance = -1 * this.mCurrentAnimAdvance;
                this.mCurrentElm += 2 * this.mCurrentAnimAdvance;
                break;
            default:
                break;
        }
        this._setSpriteElement();
    }

    _setSpriteElement() {
        var left = this.mFirstElmLeft + (this.mCurrentElm * (this.mElmWidth + this.mWidthPadding));
        this.setElementUVCoordinate(
            left,
            left + this.mElmWidth,
            this.mElmTop - this.mElmHeight,
            this.mElmTop);
    }

    setSpriteSequence(topPixel, rightPixel, elmWidthInPixel, elmHeightInPixel, numElements, wPaddingInPixel) {
        var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
        var imageW = texInfo.mWidth;
        var imageH = texInfo.mHeight;
        this.mNumElems = numElements;
        this.mFirstElmLeft = rightPixel / imageW;
        this.mElmTop = topPixel / imageH;
        this.mElmWidth = elmWidthInPixel / imageW;
        this.mElmHeight = elmHeightInPixel / imageH;
        this.mWidthPadding = wPaddingInPixel / imageW;
        this._initAnimation();
    }

    setAnimationSpeed(tickInterval) {
        this.mUpdateInterval = tickInterval;
    }

    incAnimationSpeed(deltaInterval) {
        this.mUpdateInterval += deltaInterval;
    }

    updateAnimation() {
        this.mCurrentTick++;
        if (this.mCurrentTick >= this.mUpdateInterval) {
            this.mCurrentTick = 0;
            this.mCurrentElm += this.mCurrentAnimAdvance;
            if ((this.mCurrentElm >= 0) && (this.mCurrentElm < this.mNumElems)) {
                this._setSpriteElement();
            } else {
                this._initAnimation();
            }
        }
    }
}

SpriteAnimateRenderable.eAnimationType = Object.freeze({
    eAnimateRight: 0, // Animate from left to right
    eAnimateLeft: 1, // Animate from right to left
    eAnimateSwing: 2 // Animate first left to right, then animates backwards
});