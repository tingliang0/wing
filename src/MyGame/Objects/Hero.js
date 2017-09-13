class Hero extends GameObject {
    constructor(spriteTexture) {
        let kDelta = 0.3;
        let mDye = new SpriteRenderable(spriteTexture);
        mDye.setColor([1, 1, 1, 0]);
        mDye.getXform().setPosition(35, 50);
        mDye.getXform().setSize(9, 12);
        mDye.setElementPixelPositions(0, 120, 0, 180);
        super(mDye);

        this.kDelta = kDelta;
        this.mDye = mDye;
    }

    update() {
        var xform = this.getXform();
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            xform.incYPosBy(this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            xform.incYPosBy(-this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            xform.incXPosBy(-this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            xform.incXPosBy(this.kDelta);
        }
    }
}