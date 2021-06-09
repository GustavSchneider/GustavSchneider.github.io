#version 300 es

#define PI 3.14159

precision highp float;

uniform vec4 color;
uniform float time;
uniform vec2 res;

in vec3 vert_pos;
in vec3 vert_norm;

out vec4 frag_color;


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

float box(vec2 dim, vec2 uv) {
  return clamp(max(abs(uv.x * (1. / dim.x)),
                   abs(uv.y * (1. / dim.y)))*20. - 1., 0., 1.);
}

float ring(vec2 pos) {
  return abs(pow(length(pos), 10.) - 1.);
}

mat2 rot(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

int modPolar(inout vec2 v, float m) {
  float a = atan(v.x, v.y);
  float r = length(v);
  a = mod(a - m / 2., m) - m / 2.;
  v = r * vec2(cos(a), sin(a));

  return int(a / m);
}

void main(void) {
  vec2 uv = gl_FragCoord.xy / res;
  uv = uv * 2. - 1.;

  vec2 muv = uv;
  modPolar(muv, PI / 2.);
  
  float map = pow(box(vec2(5., .2), rot(sin(time) * .2 - .7) * muv + vec2(0., -.2)), 20.);
  map = min(map, pow(ring(uv*15.), 10.));

  muv = uv * 4.;
  int id = modPolar(muv, PI / 4.);
  muv = rot(PI / 2.) * muv;
  muv.x = mod(muv.x, .4) - .2;
  muv.y = mod(muv.y, .2) - .1;

  float s = box(vec2(1.5, .4), muv) * (1. + noise(uv * 20.));
  
  map = pow(s, 20.);

  frag_color = vec4(vec3(map), 1.);

  frag_color = vec4(.3, .7, .3, 1.);  
  float d = max(dot(normalize(vert_norm), normalize(vec3(1, 1, 1))), 0.);
  frag_color *= d;
  frag_color = vec4(vert_norm, 1.);
  //frag_color = vec4(normalize(vert_pos), 1.);
}
