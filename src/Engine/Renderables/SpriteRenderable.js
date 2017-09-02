class SpriteRenderable extends TextureRenderable {
    constructor(myTexture) {
        super(myTexture);
        this.setShader(gEngine.DefaultResources.getSpriteShader());
        this.mTexLeft = 0.0;
        this.mTexRight = 1.0;
        this.mTexTop = 1.0;
        this.mTexBottom = 0.0;
    }

    setElementUVCoordinate(left, right, bottom, top) {
        this.mTexLeft = left;
        this.mTexRight = right;
        this.mTexTop = top;
        this.mTexBottom = bottom;
    }

    setElementPixelPositions(left, right, bottom, top) {
        var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
        var imageW = texInfo.mWidth;
        var imageH = texInfo.mHeight;
        this.mTexLeft = left / imageW;
        this.mTexRight = right / imageW;
        this.mTexTop = top / imageH;
        this.mTexBottom = bottom / imageH;
    }

    getElementUVCoordinateArray() {
        return [
            this.mTexRight, this.mTexTop,
            this.mTexLeft, this.mTexTop,
            this.mTexRight, this.mTexBottom,
            this.mTexLeft, this.mTexBottom
        ];
    }

    draw(pixelColor, vpMatrix) {
        this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
        super.draw(pixelColor, vpMatrix);
    }
}

// the expected texture cooridnate array is an array of 8 floats where:
// [0] [1]: is u/v cooridnate of Top-Right
// [2] [3]: is u/v coordinate of Top-Left
// [4] [5]: is u/v coordinate of Bottom-Right
// [6] [7]: is u/v coordinate of Bottom-Left
SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});