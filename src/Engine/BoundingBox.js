class BoundingBox {
    constructor(centerPos, w, h) {
        this.mLL = vec2.fromValues(0, 0);
        this.setBounds(centerPos, w, h);
    }

    setBounds(centerPos, w, h) {
        this.mWidth = w;
        this.mHeight = h;
        this.mLL[0] = centerPos[0] - (w / 2);
        this.mLL[1] = centerPos[1] - (h / 2);
    }

    containsPoint(x, y) {
        return (x > this.minX()) && (x < this.maxX()) && (y > this.minY()) && (y < this.maxY());
    }

    intersectsBound(otherBound) {
        return (this.minX() < otherBound.maxX()) &&
            (this.maxX() > otherBound.minX()) &&
            (this.minY() < otherBound.maxY()) &&
            (this.maxY() > otherBound.minY())
    }

    boundCollideStatus(otherBound) {
        var status = BoundingBox.eboundCollideStatus.eOutside;
        if (this.intersectsBound(otherBound)) {
            if (otherBound.minX() < this.minX()) {
                status |= BoundingBox.eboundCollideStatus.eCollideLeft;
            }
            if (otherBound.maxX() > this.maxX()) {
                status |= BoundingBox.eboundCollideStatus.eCollideRight;
            }
            if (otherBound.minY() < this.minY()) {
                status |= BoundingBox.eboundCollideStatus.eCollideBottom;
            }
            if (otherBound.maxY() > this.maxY()) {
                status |= BoundingBox.eboundCollideStatus.eCollideTop;
            }
            if (status == BoundingBox.eboundCollideStatus.eOutside) {
                status = BoundingBox.eboundCollideStatus.eInside;
            }
        }
        return status;
    }

    minX() {
        return this.mLL[0];
    }

    maxX() {
        return this.mLL[0] + this.mWidth;
    }

    minY() {
        return this.mLL[1];
    }

    maxY() {
        return this.mLL[1] + this.mHeight;
    }
}

BoundingBox.eboundCollideStatus = Object.freeze({
    eCollideLeft: 1,
    eCollideRight: 2,
    eCollideTop: 4,
    eCollideBottom: 8,
    eInside: 16,
    eOutside: 0
});