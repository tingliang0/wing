function BlueLevel() {
    this.kSceneFile = "assets/BlueLevel.xml";
    this.mSqSet = [];
    this.mCamera;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);


BlueLevel.prototype.initialize = function() {
    let sceneParser = new SceneFileParser(this.kSceneFile);
    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
};

BlueLevel.prototype.update = function() {
    var xform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (xform.getXPos() > 30) {
            xform.setPosition(10, 60);
        }
        xform.incXPosBy(deltaX);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        xform.incRotationByDegree(1);
    }
    xform = this.mSqSet[1].getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (xform.getWidth() > 5) {
            xform.setSize(2, 2);
        }
        xform.incSizeBy(0.05);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) {
            gEngine.GameLoop.stop();
        }
    }
};

BlueLevel.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

BlueLevel.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueLevel.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};