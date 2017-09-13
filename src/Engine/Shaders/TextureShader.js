class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);
        this.mShaderTextureCoorAttribute = null;

        var gl = gEngine.Core.getGL();
        this.mShaderTextureCoorAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
    }

    activateShader(pixelColor, aCamera) {
        super.activateShader(pixelColor, aCamera.getVPMatrix());
        var gl = gEngine.Core.getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
        gl.enableVertexAttribArray(this.mShaderTextureCoorAttribute);
        gl.vertexAttribPointer(this.mShaderTextureCoorAttribute, 2, gl.FLOAT, false, 0, 0);
    }
}