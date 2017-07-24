class TextureRenderable extends Renderable {
    constructor(myTexture) {
        super();
        this.setColor([1, 1, 1, 0]);
        this.setShader(gEngine.DefaultResources.getTextureShader());
        this.myTexture = myTexture;
    }

    draw(vpMatrix) {
        gEngine.Textures.activateTexture(this.myTexture);
        //Renderable.prototype.draw.call(this, vpMatrix);
        super.draw(vpMatrix);
    }
}