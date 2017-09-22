TextureRenderable.prototype.setColorArray = function() {
    if (this.mColorArray === null) {
        this.mColorArray = gEngine.Textures.getColorArray(this.mTexture);
    }
};

TextureRenderable.prototype.pixelAlphaValue = function(x, y) {
    y += this.mTexBottomIndex;
    x += this.mTexLeftIndex;
    x = x * 4;
    y = y * 4;
    return this.mColorArray[(y * this.mTextureInfo.mWidth) + x + 3];
};

TextureRenderable.prototype.indexToWCPosition = function(returnWCPos, i, j, xDir, yDir) {
    var x = i * this.mXform.getWidth() / (this.mTexWidth - 1);
    var y = j * this.mXform.getHeight() / (this.mTexHeight - 1);

    var xDisp = x - (this.mXform.getWidth() * 0.5);
    var yDisp = y - (this.mXform.getHeight() * 0.5);
    var xDirDisp = [];
    var yDirDisp = [];

    vec2.scale(xDirDisp, xDir, xDisp);
    vec2.scale(yDirDisp, yDir, yDisp);
    vec2.add(returnWCPos, this.mXform.getPosition(), xDirDisp);
    vec2.add(returnWCPos, returnWCPos, yDirDisp);
};

TextureRenderable.prototype.wcPositionToIndex = function(returnIndex, wcPos, xDir, yDir) {
    var delta = [];
    vec2.sub(delta, wcPos, this.mXform.getPosition());
    var xDisp = vec2.dot(delta, xDir);
    var yDisp = vec2.dot(delta, yDir);
    returnIndex[0] = this.mTexWidth * (xDisp / this.mXform.getWidth());
    returnIndex[1] = this.mTexHeight * (yDisp / this.mXform.getHeight());

    returnIndex[0] += this.mTexWidth / 2;
    returnIndex[1] += this.mTexHeight / 2;

    returnIndex[0] = Math.floor(returnIndex[0]);
    returnIndex[1] = Math.floor(returnIndex[1]);
};

TextureRenderable.prototype.pixelTouches = function(other, wcTouchPos) {
    var pixelTouch = false;
    var xIndex = 0,
        yIndex;
    var otherIndex = [0, 0];

    var xDir = [1, 0];
    var yDir = [0, 1];
    var otherXDir = [1, 0];
    var otherYDir = [0, 1];

    vec2.rotate(xDir, xDir, this.mXform.getRotationInRad());
    vec2.rotate(yDir, yDir, this.mXform.getRotationInRad());
    vec2.rotate(otherXDir, otherXDir, this.mXform.getRotationInRad());
    vec2.rotate(otherYDir, otherYDir, this.mXform.getRotationInRad());

    while ((!pixelTouch) && (xIndex < this.mTexWidth)) {
        yIndex = 0;
        while ((!pixelTouch) && (yIndex < this.mTexHeight)) {
            if (this.pixelAlphaValue(xIndex, yIndex) > 0) {
                this.indexToWCPosition(wcTouchPos, xIndex, yIndex, xDir, yDir);
                other.wcPositionToIndex(otherIndex, wcTouchPos, otherXDir, otherYDir);
                if (
                    (otherIndex[0] > 0) &&
                    (otherIndex[0] < other.mTexWidth) &&
                    (otherIndex[1] > 0) &&
                    (otherIndex[1] < other.mTexHeight)) {
                    pixelTouch = other.pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0;
                }
            }
            yIndex++;
        }
        xIndex++;
    }
    return pixelTouch;
};