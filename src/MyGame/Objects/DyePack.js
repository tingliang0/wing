class DyePack extends GameObject {
    constructor(spriteTexture) {
        let kRefWidth = 80;
        let kRefHeight = 130;
        let mDyePack = new SpriteRenderable(spriteTexture);
        mDyePack.setColor([1, 1, 1, 0.1]);
        mDyePack.getXform().setPosition(50, 33);
        mDyePack.getXform().setSize(kRefWidth / 50, kRefHeight / 50);
        mDyePack.setElementPixelPositions(510, 595, 23, 153);
        super(mDyePack);

        this.kRefWidth = kRefWidth;
        this.kRefHeight = kRefHeight;
        this.mDyePack = mDyePack;
    }
}