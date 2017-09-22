class Camera {
    constructor(wcCenter, wcWidth, viewportArray) {
        this.mWCCenter = wcCenter;
        this.mWCWidth = wcWidth;
        this.mViewport = viewportArray; // [x, y, width, height]
        this.mNearPlane = 0;
        this.mFarPlane = 1000;
        // transfomation matrices
        this.mViewMatrix = mat4.create();
        this.mProjMatrix = mat4.create();
        this.mVPMatrix = mat4.create();
        // background color
        this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
    }

    setupViewProjection() {
        var gl = gEngine.Core.getGL();
        // Configue the viewport
        gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
        gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
        gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);
        // define the View-Projection matrix
        mat4.lookAt(this.mViewMatrix, [this.mWCCenter[0], this.mWCCenter[1], 10], [this.mWCCenter[0], this.mWCCenter[1], 0], [0, 1, 0]);
        var halfWCWidth = 0.5 * this.mWCWidth;
        var halfHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
        mat4.ortho(this.mProjMatrix, -halfWCWidth, halfWCWidth, -halfHeight, halfHeight, this.mNearPlane, this.mFarPlane);
        mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    }

    setWCCenter(xPos, yPos) {
        this.mWCCenter[0] = xPos;
        this.mWCCenter[1] = yPos;
    }

    getWCCenter() {
        return this.mWCCenter;
    }

    setViewport(viewportArray) {
        this.mViewport = viewportArray;
    }

    getViewport() {
        return this.mViewport;
    }

    setBackgroundColor(newColor) {
        this.mBgColor = newColor;
    }

    getBackgroundColor() {
        return this.mBgColor;
    }

    setWCWidth(width) {
        this.mWCWidth = width;
    }

    getWCWidth() {
        return this.mWCWidth;
    }

    getWCHeight() {
        return this.mWCWidth * this.mViewport[3] / this.mViewport[2];
    }

    getVPMatrix() {
        return this.mVPMatrix;
    }

    collideWCBound(aXform, zone) {
        var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
        var w = zone * this.getWCWidth();
        var h = zone * this.getWCHeight();
        var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
        return cameraBound.boundCollideStatus(bbox);
    }
};