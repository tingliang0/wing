var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;

    // Step A: Get the shader source from index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // Step B: Create the shader based on the source type: vertex or fragment
    compiledShader = gGL.createShader(shaderType);

    // Step C: Compile the created shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);

    // Step D: check for error and return result
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
        alert("A shader compiling error occured: " + gGL.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

// Loads/compiles/links shader programs to gGL context
function initSimpleShader(vertexShaderID, fragmentShaderID) {
    // Step A: load and compile the vertex and fragment shaders
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

    // Step B: Create and link the shaders into a program.
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);

    // Step C: check for error
    if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
        alert("Error linking shader");
    }

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");

    // Step E: Activates the vertex buffer loaded in VertexBuffer.js
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    // Step F: Describe the characteristic of the vertex position attribute
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
        3,
        gGL.FLOAT,
        false,
        0,
        0);
}