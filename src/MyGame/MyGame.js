"use strict";

class MyGame extends Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mCamera = null;
        this.mHero = null;
        this.mMsg = null;
        this.mMinionset = null;
        this.mDyePack = null;
    }

    loadScene() {
        gEngine.Textures.loadTexture(this.kMinionSprite);
    }

    unloadScene() {
        gEngine.Textures.unloadTexture(this.kMinionSprite);
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(50, 37.5),
            100, [0, 0, 600, 480]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mDyePack = new DyePack(this.kMinionSprite);
        this.mMinionset = new GameObjectSet();
        var i, randomY, aMinion;
        for (i = 0; i < 5; i++) {
            randomY = Math.random() * 65;
            aMinion = new Minion(this.kMinionSprite, randomY);
            this.mMinionset.addToSet(aMinion);
        }

        this.mHero = new Hero(this.kMinionSprite);
        this.mMsg = new FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
    }

    update() {
        this.mHero.update();
        this.mMinionset.update();
        this.mDyePack.update();
    }

    draw() {
        gEngine.Core.clearCanvas([0.5, 0.5, 0.5, 1.0]);
        this.mCamera.setupViewProjection();

        this.mHero.draw(this.mCamera);
        this.mMinionset.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }

}