"use strict";

class MyGame extends Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kMinionCollector = "assets/minion_collector.png";
        this.kMinionPortal = "assets/minion_portal.png";
        this.mCamera = null;
        this.mMsg = null;
        this.mCollector = null;
        this.mPortal = null;
    }

    loadScene() {
        gEngine.Textures.loadTexture(this.kMinionSprite);
        gEngine.Textures.loadTexture(this.kMinionCollector);
        gEngine.Textures.loadTexture(this.kMinionPortal);
    }

    unloadScene() {
        gEngine.Textures.unloadTexture(this.kMinionSprite);
        gEngine.Textures.unloadTexture(this.kMinionCollector);
        gEngine.Textures.unloadTexture(this.kMinionPortal);
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(50, 37.5),
            100, [0, 0, 640, 480]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        this.mDyePack = new DyePack(this.kMinionSprite);
        this.mDyePack.setVisibility(false);

        this.mCollector = new TextureObject(this.kMinionCollector, 50, 30, 30, 30);
        this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);

        this.mMsg = new FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(2);
    }

    update() {
        var msg = "No Collision";
        this.mPortal.update(gEngine.Input.keys.W, gEngine.Input.keys.S, gEngine.Input.keys.A, gEngine.Input.keys.D);
        this.mCollector.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down, gEngine.Input.keys.Left, gEngine.Input.keys.Right);
        var h = [];
        if (this.mPortal.pixelTouches(this.mCollector, h)) {
            msg = "Collided!: (" + h[0].toPrecision(4) + " " + h[1].toPrecision(4) + ")";
            this.mDyePack.setVisibility(true);
            this.mDyePack.getXform().setXPos(h[0]);
            this.mDyePack.getXform().setYPos(h[1]);
        } else {
            this.mDyePack.setVisibility(false);
        }
        this.mMsg.setText(msg);
    }

    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();

        this.mCollector.draw(this.mCamera);
        this.mPortal.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }
}