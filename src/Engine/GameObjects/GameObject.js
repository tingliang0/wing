class GameObject {
    constructor(renderableObj) {
        this.mRenderComponent = renderableObj;
        this.mVisible = true;
        this.mCurrentFrontDir = vec2.fromValues(0, 1);
        this.mSpeed = 0;
    }

    getXform() {
        return this.mRenderComponent.getXform();
    }

    setVisibility(f) {
        this.mVisible = f;
    }

    isVisible() {
        return this.mVisible;
    }

    setSpeed(s) {
        this.mSpeed = s;
    }

    getSpeed() {
        return this.mSpeed;
    }

    incSpeedBy(delta) {
        this.mSpeed += delta;
    }

    setCurrentFrontDir(f) {
        vec2.normalize(this.mCurrentFrontDir, f);
    }

    getCurrentFrontDir() {
        return this.mCurrentFrontDir;
    }

    rotateObjPointTo(p, rate) {
        var dir = [];
        vec2.sub(dir, p, this.getXform().getPosition());
        var len = vec2.len(dir);
        if (len < Number.MIN_VALUE) {
            return;
        }
        vec2.scale(dir, dir, 1 / len);

        // compute the angle to rotate
        var fdir = this.getCurrentFrontDir();
        var cosTheta = vec2.dot(dir, fdir);
        if (cosTheta > 0.999999) { // almost exactly the same direction
            return;
        }
        if (cosTheta > 1) {
            cosTheta = 1;
        }
        if (cosTheta < -1) {
            cosTheta = -1;
        }
        var dir3d = vec3.fromValues(dir[0], dir[1], 0);
        var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
        var r3d = [];
        vec3.cross(r3d, f3d, dir3d);
        var rad = Math.acos(cosTheta);
        if (r3d[2] < 0) {
            rad = -rad;
        }

        rad *= rate;
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
        this.getXform().incRotationByRad(rad);
    }

    update() {
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }

    getRenderable() {
        return this.mRenderComponent;
    }

    getBBox() {
        var xform = this.getXform();
        var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
        return b;
    }

    draw(aCamera) {
        if (this.isVisible()) {
            this.mRenderComponent.draw(aCamera);
        }
    }
}