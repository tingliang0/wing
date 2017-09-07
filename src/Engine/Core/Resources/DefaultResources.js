var gEngine = gEngine || {};

gEngine.DefaultResources = (function() {

    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";
    var kDefaultFont = "assets/fonts/system-default-font";

    var mConstColorShader = null;
    var mTextureShader = null;
    var mSpriteShader = null;

    var getConstColorShader = function() {
        return mConstColorShader;
    };

    var getTextureShader = function() {
        return mTextureShader;
    };

    var getSpriteShader = function() {
        return mSpriteShader;
    };

    var getDefaultFont = function() {
        return kDefaultFont;
    };

    var _createShaders = function(callbackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
        callbackFunction();
    };

    var initialize = function(callbackFunction) {
        // constant color shader
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shader
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // font
        gEngine.Fonts.loadFont(kDefaultFont);

        gEngine.ResourceMap.setLoadCompleteCallback(function() {
            _createShaders(callbackFunction);
        });
    };

    var cleanUp = function() {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);

        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);

        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        cleanUp: cleanUp
    };

    return mPublic;
}());