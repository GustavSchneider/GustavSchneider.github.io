#version 300 es
precision highp float;

layout (location = 0) in vec3 position;
layout (location = 1) in vec2 uv;
uniform mat4 scale;
uniform mat4 translation;
uniform mat4 rotation;
uniform mat4 frustum;
uniform float time;

out vec2 vert_uv;
out vec3 vert_pos;
out vec3 vert_norm;

float hash(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise( vec2 p ) {
    vec2 i = floor( p );
    vec2 f = fract( p );	
	vec2 u = f*f*(3.0-2.0*f);
    return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

vec3 normal(vec2 p) {
  vec2 e = vec2(0, 0.01);
  return normalize(vec3(noise(p + e.yx) - noise(p - e.yx),
                        noise(p + e.xy) - noise(p - e.xy),
                        );
}


void main(void) {
  vert_uv = uv;
  vec4 p = scale * rotation * vec4(position, 1.);
  vert_norm = normal(p.xz);
  p += vec4(0, noise(p.xz * 10.), 0, 0);

  vec3 normal = vec3(0, 0, 1);
  
  vec4 pos = vec4((translation * p).xyz, 1.);
  vert_pos = (frustum * pos).xyz;
  gl_Position = frustum * pos;
}
