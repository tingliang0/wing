"use strict";

class MyGame extends Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kMinionPortal = "assets/minion_portal.png";
        this.mCamera = null;
        this.mMsg = null;

        this.mHero = null;
        this.mBrain = null;
        this.mPortalHit = null;
        this.mHeroHit = null;

        this.mPortal = null;
        this.mLMinion = null;
        this.mRMinion = null;

        this.mCollide = null;
        this.mChoice = 'H';
    }

    loadScene() {
        gEngine.Textures.loadTexture(this.kMinionSprite);
        gEngine.Textures.loadTexture(this.kMinionPortal);
    }

    unloadScene() {
        gEngine.Textures.unloadTexture(this.kMinionSprite);
        gEngine.Textures.unloadTexture(this.kMinionPortal);
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(50, 37.5),
            100, [0, 0, 640, 480]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mBrain = new Brain(this.kMinionSprite);
        this.mHero = new Hero(this.kMinionSprite);

        this.mPortalHit = new DyePack(this.kMinionSprite);
        this.mPortalHit.setVisibility(false);
        this.mHeroHit = new DyePack(this.kMinionSprite);
        this.mHeroHit.setVisibility(false);

        this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);
        this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
        this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

        this.mMsg = new FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);

        this.mCollide = this.mHero;
    }

    update() {
        var msg = "L/R: Left or Right Minion; H: Dye; B: Brain]: ";

        this.mLMinion.update();
        this.mRMinion.update();
        this.mHero.update();

        this.mPortal.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down, gEngine.Input.keys.Left, gEngine.Input.keys.Right, gEngine.Input.keys.P);

        var h = [];
        if (this.mPortal.pixelTouches(this.mCollide, h)) {
            this.mPortalHit.setVisibility(true);
            this.mPortalHit.getXform().setPosition(h[0], h[1]);
        } else {
            this.mPortalHit.setVisibility(false);
        }

        if (!this.mHero.pixelTouches(this.mBrain, h)) {
            this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);
            GameObject.prototype.update.call(this.mBrain);
            this.mHeroHit.setVisibility(false);
        } else {
            this.mHeroHit.setVisibility(true);
            this.mHeroHit.getXform().setPosition(h[0], h[1]);
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
            this.mCollide = this.mLMinion;
            this.mChoice = 'L';
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
            this.mCollide = this.mRMinion;
            this.mChoice = 'R';
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
            this.mCollide = this.mBrain;
            this.mChoice = 'B';
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
            this.mCollide = this.mHero;
            this.mChoice = 'H';
        }

        this.mMsg.setText(msg + this.mChoice);
    }

    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();

        this.mHero.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mPortal.draw(this.mCamera);
        this.mLMinion.draw(this.mCamera);
        this.mRMinion.draw(this.mCamera);
        this.mPortalHit.draw(this.mCamera);
        this.mHeroHit.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }
}