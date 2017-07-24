function TextureShader(vertexShaderPath, fragmentShaderPath) {
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);

    this.mShaderTextureCoorAttribute = null;

    var gl = gEngine.Core.getGL();
    this.mShaderTextureCoorAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

TextureShader.prototype.activateShader = function(pixelColor, vpMatrix) {
    SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);

    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoorAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoorAttribute, 2, gl.FLOAT, false, 0, 0);
}