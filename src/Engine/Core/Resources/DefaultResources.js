var gEngine = gEngine || {};

gEngine.DefaultResources = (function () {

    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";

    var mConstColorShader = null;

    var getConstColorShader = function () {
        return mConstColorShader;
    };

    var _createShaders = function (callbackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callbackFunction();
    };

    var initialize = function (callbackFunction) {
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callbackFunction);
        });
    };

    var mPublic = {
        initialize : initialize,
        getConstColorShader: getConstColorShader
    };

    return mPublic;
}());

