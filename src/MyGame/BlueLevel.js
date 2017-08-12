class BlueLevel {
    constructor() {
        this.kSceneFile = "assets/BlueLevel.xml";
        this.kBgClip = "assets/sounds/BGClip.mp3";
        this.kCue = "assets/sounds/BlueLevel_cue.wav";
        this.kPortal = "assets/minion_portal.jpg";
        this.kCollector = "assets/minion_collector.jpg";
        this.mSqSet = [];
        this.mCamera;
    }
    initialize() {
        let sceneParser = new SceneFileParser(this.kSceneFile);
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.mSqSet);
        gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
        sceneParser.parseTextureSquares(this.mSqSet);
    }
    update() {
        var xform = this.mSqSet[0].getXform();
        var deltaX = 0.05;
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) {
                xform.setPosition(12, 60);
            }
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) {
                gEngine.GameLoop.stop();
            }
        }
        var c = this.mSqSet[1].getColor();
        var ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }
    draw() {
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setupViewProjection();
        var i;
        for (i = 0; i < this.mSqSet.length; i++) {
            this.mSqSet[i].draw(this.mCamera.getVPMatrix());
        }
    }
    loadScene() {
        gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
        // gEngine.AudioClips.loadAudio(this.kBgClip);
        // gEngine.AudioClips.loadAudio(this.kCue);
        // gEngine.Textures.loadTexture(this.kPortal);
        // gEngine.Textures.loadTexture(this.kCollector);
    }
    unloadScene() {
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.unloadAudio(this.kBgClip);
        gEngine.AudioClips.unloadAudio(this.kCue);
        gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
        gEngine.Textures.unloadTexture(this.kPortal);
        gEngine.Textures.unloadTexture(this.kCollector);
        var nextLevel = new MyGame();
        gEngine.Core.startScene(nextLevel);
    }
}

// gEngine.Core.inheritPrototype(BlueLevel, Scene);