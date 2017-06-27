function MyGame(htmlCanvasID) {
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();
    
    // Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",
        "src/GLSLShaders/SimpleFS.glsl"
    );

    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);    // Top-Left
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);    // Top-Right
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);    // Bottom-Right
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);        
    this.mBLSq = new Renderable(this.mConstColorShader);    // Bottom-Left
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    gl.viewport(
        20,
        40,
        600,
        300
    );
    gl.scissor(
        20,
        40,
        600,
        300
    );
    gl.enable(gl.SCISSOR_TEST);
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
    gl.disable(gl.SCISSOR_TEST);

    // Set up View and Projection matrices
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    mat4.lookAt(viewMatrix, 
        [20, 60, 10],       // camera position
        [20, 60, 0],        // look at position
        [0, 1, 0]           // orientation
    );
    mat4.ortho(projMatrix,
        -10,
        10,
        -5,
        5,
        0,
        1000
    );

    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);

    // Draw the blue square
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2);
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);

    // Draw with the red shader
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // top left
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);

    // top right
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);

    // bottom right
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);

    // bottom left
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
}