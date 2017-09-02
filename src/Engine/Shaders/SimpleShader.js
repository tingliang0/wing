"use strict";

class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.mCompiledShader = null;
        this.mShaderVertexPositionAttribute = null;
        this.mPixelColor = null;
        this.mModelTransform = null;
        this.mViewProjTransform = null;
        // load and compile vertex and fragment shaders
        var gl = gEngine.Core.getGL();
        var vertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
        var fragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
        console.log(vertexShaderPath, fragmentShaderPath);
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
        this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
        this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
        this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    }

    _compileShader(filePath, shaderType) {
        var gl = gEngine.Core.getGL();
        var shaderSource = null,
            compiledShader = null;
        shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);
        if (shaderSource === null) {
            alert("WARNING: Loading of: " + filePath + " Failed!");
            return null;
        }
        // compile
        compiledShader = gl.createShader(shaderType);
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("A shader compiling error occurred, path: " + filePath + " error " + gl.getShaderInfoLog(compiledShader));
        }
        return compiledShader;
    }

    loadObjectTransform(modelTransform) {
        var gl = gEngine.Core.getGL();
        gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
    }

    activateShader(pixelColor, vpMatrix) {
        var gl = gEngine.Core.getGL();
        gl.useProgram(this.mCompiledShader);
        gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
        gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
        gl.uniform4fv(this.mPixelColor, pixelColor);
    }

    getShader() {
        return this.mCompiledShader;
    }
}