// Constructor and object definition
"use strict"; // Operate in Strict mode such that variables must be declared before used!

class TextureRenderable extends Renderable {
    constructor(myTexture) {
        super();
        this.setColor([1, 1, 1, 0]);
        this.setShader(gEngine.DefaultResources.getTextureShader());
        this.mTexture = null; // texture for this object, cannot be a "null"
        this.mTextureInfo = null;
        this.mColorArray = null;
        this.mTexWidth = 0;
        this.mTexHeight = 0;
        this.mTexLeftIndex = 0;
        this.mTexBottomIndex = 0;
        this.setTexture(myTexture);
    }
    draw(aCamera) {
        gEngine.Textures.activateTexture(this.mTexture);
        super.draw(aCamera);
    }
    getTexture() {
        return this.mTexture;
    }
    setTexture(newTexture) {
        this.mTexture = newTexture;
        this.mTextureInfo = gEngine.Textures.getTextureInfo(newTexture);
        this.mColorArray = null;
        this.mTexWidth = this.mTextureInfo.mWidth;
        this.mTexHeight = this.mTextureInfo.mHeight;
        this.mTexLeftIndex = 0;
        this.mTexBottomIndex = 0;
    }
}