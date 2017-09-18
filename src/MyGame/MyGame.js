"use strict";

class MyGame extends Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mCamera = null;
        this.mHero = null;
        this.mMsg = null;
        this.mBrain = null;
        this.mMode = 'H';
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
            100, [0, 0, 640, 480]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        this.mBrain = new Brain(this.kMinionSprite);
        this.mHero = new Hero(this.kMinionSprite);
        this.mMsg = new FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(2);
    }

    update() {
        var msg = "Brain modes [H:keys, J:immediate, K:gradual]: ";
        var rate = 1;
        this.mHero.update();

        var hBox = this.mHero.getBBox();
        var bBox = this.mBrain.getBBox();

        switch (this.mMode) {
            case 'H':
                this.mBrain.update();
                break;
            case 'K':
                rate = 0.02;
            case 'J':
                //this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
                //super.update();
                if (!hBox.intersectsBound(bBox)) {
                    this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
                    //super.update();
                    GameObject.prototype.update.call(this.mBrain);
                }
                break;
        }

        var status = this.mCamera.collideWCBound(this.mHero.getXform(), 0.8);

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
            this.mMode = 'H';
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
            this.mMode = 'J';
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
            this.mMode = 'K';
        }
        this.mMsg.setText(msg + this.mMode + " [Hero bound=" + status + "]");
    }

    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();

        this.mHero.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }
}