class FontRenderable {
    constructor(aString) {
        this.mFont = gEngine.DefaultResources.getDefaultFont();
        this.mOneChar = new SpriteRenderable(this.mFont + ".png");
        this.mXform = new Transform();
        this.mText = aString;
    }

    draw(vpMatrix) {
        var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
        var heightOfOneChar = this.mXform.getHeight();
        var yPos = this.mXform.getYPos();
        var xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
        var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
        for (charIndex = 0; charIndex < this.mText.length; charIndex++) {
            aChar = this.mText.charCodeAt(charIndex);
            charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);
            this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, charInfo.mTexCoordRight, charInfo.mTexCoordBottom, charInfo.mTexCoordTop);
            xSize = widthOfOneChar * charInfo.mCharWidth;
            ySize = widthOfOneChar * charInfo.mCharHeight;
            this.mOneChar.getXform().setSize(xSize, ySize);

            xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
            yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
            this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);
            this.mOneChar.draw(vpMatrix);
            xPos += widthOfOneChar;
        }
    }

    getXform() {
        return this.mXform;
    }

    getText() {
        return this.mText;
    }

    setText(text) {
        this.mText = text;
        this.setTextHeight(this.getXform().getHeight());
    }

    getFont() {
        return this.mFont;
    }

    setFont(font) {
        this.mFont = font;
        this.mOneChar.setTexture(this.mFont + ".png");
    }

    setColor(c) {
        this.mOneChar.setColor(c);
    }

    getColor() {
        return this.mOneChar.getColor();
    }

    setTextHeight(h) {
        var charInfo = gEngine.Fonts.getCharInfo(this.mFont, "A".charCodeAt(0));
        var w = h * charInfo.mCharAspectRatio;
        this.getXform().setSize(w * this.mText.length, h);
    }
}