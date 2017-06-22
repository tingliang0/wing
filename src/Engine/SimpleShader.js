function SimpleShader(vertexShaderID, fragmentShaderID) {
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;

    // load and compile vertex and fragment shaders
    var gl = gEngine.Core.getGL();
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

    // link the shaders into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
}

SimpleShader.prototype._loadAndCompileShader = function (id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();

    // get shader source
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // compile
    compiledShader = gl.createShader(shaderType);
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};

SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

SimpleShader.prototype.getShader = function () {
    return this.mCompiledShader;
};