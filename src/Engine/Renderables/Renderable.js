class Renderable {
    constructor() {
        this.mShader = gEngine.DefaultResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1]; // Color for fragment shader
        this.mXform = new Transform(); // transform operator for the object
    }

    draw(aCamera) {
        var gl = gEngine.Core.getGL();
        this.mShader.activateShader(this.mColor, aCamera);
        this.mShader.loadObjectTransform(this.mXform.getXform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setShader(shader) {
        this.mShader = shader;
    }

    setColor(color) {
        this.mColor = color;
    }

    getColor() {
        return this.mColor;
    }

    getXform() {
        return this.mXform;
    }
}