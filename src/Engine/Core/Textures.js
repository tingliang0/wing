class TextureInfo {
    constructor(name, w, h, id) {
        this.mName = name;
        this.mWidth = w;
        this.mHeight = h;
        this.mGLTexID = id;
    }
}

var gEngine = gEngine || {};
gEngine.Textures = (function() {

    var loadTexture = function(textureName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(textureName))) {
            var img = new Image();
            gEngine.ResourceMap.asyncLoadRequested(textureName);
            img.onload = function() {
                _processLoadedImage(textureName, img);
            };
            img.src = textureName;
        } else {
            gEngine.ResourceMap.incAssetRefCount(textureName);
        }
    };

    var unloadTexture = function(textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texInfo.mGLTexID);
        gEngine.ResourceMap.unloadAsset(textureName);
    };

    var _processLoadedImage = function(textureName, image) {
        var gl = gEngine.Core.getGL();
        var textureID = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        var texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);
        gEngine.ResourceMap.asyncLoadCompleted(textureName, texInfo);
    };

    var activateTexture = function(textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);

        gl.texParameter()
    }

    var mPublic = {};
    return mPublic;
}());