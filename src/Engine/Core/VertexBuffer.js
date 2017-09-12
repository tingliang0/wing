//  The gEngine.VertexBuffer object implements the geometry subsystem.
"use strict";

var gEngine = gEngine || {};

gEngine.VertexBuffer = (function() {
    var mSquareVertexBuffer = null;
    var mTextureCoordBuffer = null;

    // define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // define the corresponding texture cooridnates
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    var getGLVertexRef = function() {
        return mSquareVertexBuffer;
    };

    var getGLTexCoordRef = function() {
        return mTextureCoordBuffer;
    };

    var initialize = function() {
        var gl = gEngine.Core.getGL();
        // Allocate and store vertex positions into the WebGL context
        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

        // Allocate and store texture coordinates as a WebGL buffer
        mTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    };

    var cleanUp = function() {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mSquareVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTexCoordRef: getGLTexCoordRef,
        cleanUp: cleanUp
    };

    return mPublic;
}());