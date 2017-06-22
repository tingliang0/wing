function MyGame(htmlCanvasID) {
    this.mShader = null;
    gEngine.Core.initializeWebGL(htmlCanvasID);
    this.mShader = new SimpleShader("VertexShader", "FragmentShader");
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);
    this.mShader.activateShader();
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}