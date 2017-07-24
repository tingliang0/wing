attribute vec3 aSquareVertexPosition;   // the xyz position of the vertex
attribute vec2 aTextureCoordinate;      // the uv coordinate of the vertex

// texture coordinate that will map the entrie iamge to the entire square
attribute vec2 vTexCoord;

// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) {
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
    // pass the texture coordinate to the fragment shader
    vTexCoord = aTextureCoordinate;
}