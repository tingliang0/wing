// Constructor and object definition
"use strict"; // Operate in Strict mode such that variables must be declared before used!

class TextureRenderable extends Renderable {
    constructor(myTexture) {
        super();
        this.setColor([1, 1, 1, 0]);
        this.setShader(gEngine.DefaultResources.getTextureShader());
        this.mTexture = myTexture; // texture for this object, cannot be a "null"
    }
    draw(vpMatrix) {
        gEngine.Textures.activateTexture(this.mTexture);
        super.draw(vpMatrix);
    }
    getTexture() {
        return this.mTexture;
    }
    setTexture(t) {
        this.mTexture = t;
    }
}