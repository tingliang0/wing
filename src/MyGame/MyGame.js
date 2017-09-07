"use strict";

class MyGame extends Scene {
    constructor() {
        super();

        this.mCamera = null;
        this.mTextSysFont = null;
        this.mTextToWork = null;
        this.kFontCon16 = "assets/fonts/Consolas-16"; // notice font names do not need extensions!
        this.kFontCon24 = "assets/fonts/Consolas-24";
        this.kFontCon32 = "assets/fonts/Consolas-32"; // this is also the default system font
        this.kFontCon72 = "assets/fonts/Consolas-72";
        this.kFontSeg96 = "assets/fonts/Segment7-96";
    }

    loadScene() {
        gEngine.Fonts.loadFont(this.kFontCon16);
        gEngine.Fonts.loadFont(this.kFontCon24);
        gEngine.Fonts.loadFont(this.kFontCon32);
        gEngine.Fonts.loadFont(this.kFontCon72);
        gEngine.Fonts.loadFont(this.kFontCon96);
    }

    unloadScene() {
        gEngine.Fonts.unloadFont(this.kFontCon16);
        gEngine.Fonts.unloadFont(this.kFontCon24);
        gEngine.Fonts.unloadFont(this.kFontCon32);
        gEngine.Fonts.unloadFont(this.kFontCon72);
        gEngine.Fonts.unloadFont(this.kFontCon96);
    }

    _initText(font, posX, posY, color, textH) {
        font.setColor(color);
        font.getXform().setPosition(posX, posY);
        font.setTextHeight(textH);
    }

    initialize() {
        this.mCamera = new Camera(
            vec2.fromValues(50, 33),
            20, [20, 40, 600, 300]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mTextSysFont = new FontRenderable("System Font: in Red");
        this._initText(this.mTextSysFont, 50, 60, [1, 0, 0, 1], 3);

        this.mTextCon16 = new FontRenderable("Consolas 16: in black");
        this.mTextCon16.setFont(this.kFontCon16);
        this._initText(this.mTextCon16, 50, 55, [0, 0, 0, 1], 2);

        this.mTextCon24 = new FontRenderable("Consolas 24: in black");
        this.mTextCon24.setFont(this.kFontCon24);
        this._initText(this.mTextCon24, 50, 50, [0, 0, 0, 1], 3);

        this.mTextCon32 = new FontRenderable("Consolas 32: in white");
        this.mTextCon32.setFont(this.kFontCon32);
        this._initText(this.mTextCon32, 40, 40, [1, 1, 1, 1], 4);

        this.mTextCon72 = new FontRenderable("Consolas 72: in blue");
        this.mTextCon72.setFont(this.kFontCon72);
        this._initText(this.mTextCon72, 30, 30, [0, 0, 1, 1], 6);

        this.mTextSeg96 = new FontRenderable("Segment7-92");
        this.mTextSeg96.setFont(this.kFontSeg96);
        this._initText(this.mTextSeg96, 30, 15, [1, 1, 0, 1], 7);
    }

    update() {
        // choose which text to work on
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)) {
            this.mTextToWork = this.mTextCon16;
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
            this.mTextToWork = this.mTextCon24;
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
            this.mTextToWork = this.mTextCon32;
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
            this.mTextToWork = this.mTextCon72;
        }
    }

    draw() {
        gEngine.Core.clearCanvas([0.5, 0.5, 0.5, 1.0]);
        this.mCamera.setupViewProjection();
        console.log('1111111');
        // drawing the text output
        this.mTextSysFont.draw(this.mCamera.getVPMatrix());
        this.mTextCon16.draw(this.mCamera.getVPMatrix());
        this.mTextCon24.draw(this.mCamera.getVPMatrix());
        this.mTextCon32.draw(this.mCamera.getVPMatrix());
        this.mTextCon72.draw(this.mCamera.getVPMatrix());
        this.mTextSeg96.draw(this.mCamera.getVPMatrix());
    }

}