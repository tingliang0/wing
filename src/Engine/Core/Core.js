"use strict";

var gEngine = gEngine || {};

gEngine.Core = (function() {
    var mGL = null;
    var getGL = function() {
        return mGL;
    }

    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // binds webgl to the Canvas on the web-page to the variable mGL
        mGL = canvas.getContext("webgl", {
            alpha: false
        }) || canvas.getContext("experimental-webgl", {
            alpha: false
        });

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }

        // Allow transperency with textures
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        // Set images to flip the y axis to match the texture coordinate space.
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true); //  defines the origin of the uv coordinate to be at the lower-left corner.
    };

    var startScene = function(myGame) {
        myGame.loadScene.call(myGame);
        gEngine.GameLoop.start(myGame);
    };

    var initializeEngineCore = function(htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();

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

    var cleanUp = function() {
        gEngine.VertexBuffer.cleanUp();
        gEngine.DefaultResources.cleanUp();
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        startScene: startScene,
        inheritPrototype: inheritPrototype,
        cleanUp: cleanUp
    };

    return mPublic;
}());