class Minion extends GameObject {
    constructor(spriteTexture, atY) {
        let kDelta = 0.2;
        let mMinion = new SpriteAnimateRenderable(spriteTexture);
        mMinion.setColor([1, 1, 1, 0]);
        mMinion.getXform().setPosition(Math.random() * 100, atY);
        mMinion.getXform().setSize(12, 9.6);
        mMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
        mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        mMinion.setAnimationSpeed(15);
        super(mMinion);

        this.kDelta = kDelta;
        this.mMinion = mMinion;
    }

    update() {
        this.mMinion.updateAnimation();
        var xform = this.getXform();
        xform.incXPosBy(-this.kDelta);
        if (xform.getXPos() < 0) {
            xform.setXPos(100);
            xform.setYPos(65 * Math.random());
        }
    }
}