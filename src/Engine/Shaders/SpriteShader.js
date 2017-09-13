class SpriteShader extends TextureShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);
        this.mTexCoordBuffer = null;
        var initTexCoord = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        var gl = gEngine.Core.getGL();
        this.mTexCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
    }

    setTextureCoordinate(texCoord) {
        var gl = gEngine.Core.getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
    }

    activateShader(pixelColor, aCamera) {
        super.activateShader(pixelColor, aCamera.getVPMatrix());
        var gl = gEngine.Core.getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.vertexAttribPointer(this.mShaderTextureCoorAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mShaderTextureCoorAttribute);
    }

    cleanUp() {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(this.mTexCoordBuffer);
        super.cleanUp();
    }
}