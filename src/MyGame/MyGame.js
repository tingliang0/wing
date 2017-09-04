"use strict";

class MyGame extends Scene {
    constructor() {
        super();
        this.kFontImage = "assets/Consolas-72.png";
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mCamera = null;
        this.mHero = null;
        this.mPortal = null;
        this.mCollector = null;
        this.mFontImage = null;
        //this.mMinion = null;
        this.mRightMinion = null;
        this.mLeftMinion = null;
    }

    loadScene() {
        gEngine.Textures.loadTexture(this.kFontImage);
        gEngine.Textures.loadTexture(this.kMinionSprite);
    }

    unloadScene() {
        gEngine.Textures.unloadTexture(this.kFontImage);
        gEngine.Textures.unloadTexture(this.kMinionSprite);
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(20, 60),
            20, [20, 40, 600, 300]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mPortal = new SpriteRenderable(this.kMinionSprite);
        this.mPortal.setColor([1, 0, 0, 0.2]);
        this.mPortal.getXform().setPosition(25, 60);
        this.mPortal.getXform().setSize(3, 3);
        this.mPortal.setElementPixelPositions(130, 310, 0, 180);

        this.mCollector = new SpriteRenderable(this.kMinionSprite);
        this.mCollector.setColor([0, 0, 0, 0]);
        this.mCollector.getXform().setPosition(15, 60);
        this.mCollector.getXform().setSize(3, 3);
        this.mCollector.setElementPixelPositions(315, 495, 0, 180);

        this.mFontImage = new SpriteRenderable(this.kFontImage);
        this.mFontImage.setColor([1, 1, 1, 0]);
        this.mFontImage.getXform().setPosition(13, 62);
        this.mFontImage.getXform().setSize(4, 4);

        // this.mMinion = new SpriteRenderable(this.kMinionSprite);
        // this.mMinion.setColor([1, 1, 1, 0]);
        // this.mMinion.getXform().setPosition(26, 56);
        // this.mMinion.getXform().setSize(5, 2.5);

        this.mHero = new SpriteRenderable(this.kMinionSprite);
        this.mHero.setColor([1, 1, 1, 0]);
        this.mHero.getXform().setPosition(20, 60);
        this.mHero.getXform().setSize(2, 3);
        this.mHero.setElementPixelPositions(0, 120, 0, 180);

        this.mRightMinion = new SpriteAnimateRenderable(this.kMinionSprite);
        this.mRightMinion.setColor([1, 1, 1, 0]);
        this.mRightMinion.getXform().setPosition(26, 56.5);
        this.mRightMinion.getXform().setSize(4, 3.2);
        this.mRightMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
        this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        this.mRightMinion.setAnimationSpeed(50);

        // the left minion
        this.mLeftMinion = new SpriteAnimateRenderable(this.kMinionSprite);
        this.mLeftMinion.setColor([1, 1, 1, 0]);
        this.mLeftMinion.getXform().setPosition(15, 56.5);
        this.mLeftMinion.getXform().setSize(4, 3.2);
        this.mLeftMinion.setSpriteSequence(348, 0, // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
            204, 164, // widthxheight in pixels
            5, // number of elements in this sequence
            0); // horizontal padding in between
        this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        this.mLeftMinion.setAnimationSpeed(50);
    }

    update() {
        var deltaX = 0.05;
        var xform = this.mHero.getXform();

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) {
                xform.setPosition(12, 60);
            }
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) {
                xform.setXPos(20);
            }
        }

        var c = this.mPortal.getColor();
        var ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;

        var deltaT = 0.001;
        var texCoord = this.mFontImage.getElementUVCoordinateArray();
        var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
        var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] - deltaT;
        if (b > 1.0) {
            b = 0;
        }
        if (r < 0) {
            r = 1.0;
        }
        this.mFontImage.setElementUVCoordinate(
            texCoord[SpriteRenderable.eTexCoordArray.eLeft],
            r,
            b,
            texCoord[SpriteRenderable.eTexCoordArray.eTop]
        );

        this.mRightMinion.updateAnimation();
        this.mLeftMinion.updateAnimation();

        // var texCoord = this.mMinion.getElementUVCoordinateArray();
        // var t = texCoord[SpriteRenderable.eTexCoordArray.eTop] - deltaT;
        // var l = texCoord[SpriteRenderable.eTexCoordArray.eLeft] + deltaT;
        // if (l > 0.5) {
        //     l = 0;
        // }
        // if (t < 0.5) {
        //     t = 1.0;
        // }
        // this.mMinion.setElementUVCoordinate(
        //     l,
        //     texCoord[SpriteRenderable.eTexCoordArray.eRight],
        //     texCoord[SpriteRenderable.eTexCoordArray.eBottom],
        //     t
        // );

        // Animate left on the sprite sheet
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
            this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
            this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
        }

        // swing animation 
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
            this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
            this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        }

        // Animate right on the sprite sheet
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
            this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
            this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        }

        // decrease the duration of showing each sprite element, thereby speeding up the animation
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
            this.mRightMinion.incAnimationSpeed(-2);
            this.mLeftMinion.incAnimationSpeed(-2);
        }

        // increase the duration of showing each sprite element, thereby slowing down the animation
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
            this.mRightMinion.incAnimationSpeed(2);
            this.mLeftMinion.incAnimationSpeed(2);
        }
    }

    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();

        this.mPortal.draw(this.mCamera.getVPMatrix());
        this.mCollector.draw(this.mCamera.getVPMatrix());
        this.mHero.draw(this.mCamera.getVPMatrix());
        this.mFontImage.draw(this.mCamera.getVPMatrix());
        // this.mMinion.draw(this.mCamera.getVPMatrix());
        this.mRightMinion.draw(this.mCamera.getVPMatrix());
        this.mLeftMinion.draw(this.mCamera.getVPMatrix());
    }

}