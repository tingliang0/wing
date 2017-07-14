"use strict";

var gEngine = gEngine || {};

gEngine.Core = (function() {
    var mGL = null;
    var getGL = function() {
        return mGL;
    }

    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };

    var startScene = function(myGame) {
        myGame.loadScene.call(myGame);
        gEngine.GameLoop.start(myGame);
    };

    var initializeEngineCore = function(htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();

        gEngine.DefaultResources.initialize(function() {
            startScene(myGame);
        });
    };

    // Clears the draw area and draws one square
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };

    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        startScene: startScene,
        inheritPrototype: inheritPrototype
    };

    return mPublic;
}());