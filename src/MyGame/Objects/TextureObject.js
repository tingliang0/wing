class TextureObject extends GameObject {
    constructor(texture, x, y, w, h) {
        let kDelta = 0.2;
        let mRenderable = new TextureRenderable(texture);
        mRenderable.setColor([1, 1, 1, 0.1]);
        mRenderable.getXform().setPosition(x, y);
        mRenderable.getXform().setSize(w, h);
        super(mRenderable);
        this.kDelta = kDelta;
        this.mRenderable = mRenderable;
    }

    update(up, down, left, right) {
        var xform = this.getXform();
        if (gEngine.Input.isKeyPressed(up)) {
            xform.incYPosBy(this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(down)) {
            xform.incYPosBy(-this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(left)) {
            xform.incXPosBy(-this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(right)) {
            xform.incXPosBy(this.kDelta);
        }
    }
}