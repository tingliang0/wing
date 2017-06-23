function Renderable(shader) {
    this.mShader = shader;              // the shader for shading this object
    this.mColor = [1, 1, 1, 1];         // Color for fragment shader
}

Renderable.prototype.draw = function () {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

Renderable.prototype.setColor = function (color) {
    this.mColor = color;
}

Renderable.prototype.getColor = function () {
    return this.mColor;
}