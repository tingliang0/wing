class Renderable {
    constructor(shader) {
        this.mShader = shader; // the shader for shading this object
        this.mColor = [1, 1, 1, 1]; // Color for fragment shader
        this.mXform = new Transform(); // transform operator for the object
    }
    draw(vpMatrix) {
        var gl = gEngine.Core.getGL();
        this.mShader.activateShader(this.mColor, vpMatrix);
        this.mShader.loadObjectTransform(this.mXform.getXform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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




