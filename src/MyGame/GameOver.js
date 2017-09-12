class GameOver extends Scene {
    constructor() {
        super();
        this.mCamera = null;
        this.mMsg = null;
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(50, 33),
            100, [0, 0, 600, 400]
        );
        this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
        this.mMsg = new FontRenderable("Game Over!");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(22, 32);
        this.mMsg.setTextHeight(10);
    }

    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();
        this.mMsg.draw(this.mCamera.getVPMatrix());
    }

    update() {
        gEngine.GameLoop.stop();
    }

    unloadScene() {
        gEngine.Core.cleanUp();
    }
}