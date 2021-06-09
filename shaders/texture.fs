#version 300 es
precision highp float;

uniform sampler2D mTexture;
uniform vec2 res;

in vec2 vert_uv;
out vec4 color;

void main() {
  color = texture(mTexture, vert_uv);
}
