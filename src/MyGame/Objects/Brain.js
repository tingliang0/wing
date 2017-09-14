class Brain extends GameObject {
    constructor(spriteTexture) {
        var kDeltaDegree = 1;
        var kDeltaRad = Math.PI * this.kDeltaDegree / 180;
        var kDeltaSpeed = 0.01;
        var mBrain = new SpriteRenderable(spriteTexture);
        mBrain.setColor([1, 1, 1, 0]);
        mBrain.getXform().setPosition(50, 10);
        mBrain.getXform().setSize(3, 5.4);
        mBrain.setElementPixelPositions(600, 700, 0, 180);
        super(mBrain);
        this.kDeltaDegree = kDeltaDegree;
        this.kDeltaRad = kDeltaRad;
        this.kDeltaSpeed = kDeltaSpeed;
        this.mBrain = mBrain;
        this.setSpeed(0.05);
    }

    update() {
        super();
        var xf = this.getXform();
        var fdir = this.getCurrentFrontDir();
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            xf.incRotationByDegree(this.kDeltaDegree);
            vec2.rotate(fdir, fdir, this.kDeltaRad);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            xf.incRotationByRad(-this.kDeltaRad);
            vec2.rotate(fdir, fdir, -this.kDeltaRad);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
            this.incSpeedBy(this.kDeltaSpeed);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
            this.incSpeedBy(-this.kDeltaSpeed);
        }
    }
}