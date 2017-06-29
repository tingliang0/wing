function MyGame(htmlCanvasID) {
    this.mCamera = null;
    this.mConstColorShader = null;
    this.mWhiteSq = null;
    this.mRedSq = null;

    gEngine.Core.initializeWebGL(htmlCanvasID);
    this.initialize();
};

MyGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",
        "src/GLSLShaders/SimpleFS.glsl"
    );

    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2);
    this.mWhiteSq.getXform().setSize(5, 5);

    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);

    gEngine.GameLoop.start(this);
};

MyGame.prototype.update = function () {
    var whiteform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    if (whiteform.getXPos() > 30) {
        whiteform.setPosition(10, 60);
    }
    whiteform.incXPosBy(deltaX);
    whiteform.incRotationByDegree(1);

    var redXform = this.mRedSq.getXform();
    if (redXform.getWidth() > 5) {
        redXform.setSize(2, 2);
    }
    redXform.incSizeBy(0.05);
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};