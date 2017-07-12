class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0);
        this.mScale = vec2.fromValues(1, 1);
        this.mRotationInRad = 0.0;
    }
    setPosition(xPos, yPos) {
        this.setXPos(xPos);
        this.setYPos(yPos);
    }
    getPosition() {
        return this.mPosition;
    }
    getXPos() {
        return this.mPosition[0];
    }
    setXPos(xPos) {
        this.mPosition[0] = xPos;
    }
    getYPos() {
        return this.mPosition[1];
    }
    setYPos(yPos) {
        this.mPosition[1] = yPos;
    }
    incXPosBy(delta) {
        this.mPosition[0] += delta;
    }
    incYPosBy(delta) {
        this.mPosition[1] += delta;
    }
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    getSize() {
        return this.mScale;
    }
    incSizeBy(delta) {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    }
    setWidth(width) {
        this.mScale[0] = width;
    }
    getWidth() {
        return this.mScale[0];
    }
    setHeight(height) {
        this.mScale[1] = height;
    }
    getHeight() {
        return this.mScale[1];
    }
    incWidthBy(delta) {
        this.mScale[0] += delta;
    }
    incHeightBy(delta) {
        this.mScale[1] += delta;
    }
    setRotationInRad(rotationInRadians) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }
    getRotationInRad() {
        return this.mRotationInRad;
    }
    incRotationByRad(deltaRad) {
        this.setRotationInRad(this.mRotationInRad + deltaRad);
    }
    setRotationInDegree(rotationInDegree) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
    }
    getRotationInDegree() {
        return this.mRotationInRad * 180.0 / Math.PI;
    }
    incRotationByDegree(deltaDegree) {
        this.incRotationByRad(deltaDegree * Math.PI / 180.0);
    }
    getXform() {
        var matrix = mat4.create();
        mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
        mat4.rotateZ(matrix, matrix, this.getRotationInRad());
        mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
        return matrix;
    }
}




