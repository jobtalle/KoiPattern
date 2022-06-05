import {Shader} from "./shader.js";
import {gl} from "./gl.js";

export class ShaderSpots extends Shader {
    static VERTEX = `#version 300 es
        out vec2 uv;
        
        void main() {
            uv = vec2(gl_VertexID & 1, gl_VertexID & 2) * 2. - 1.;
            
            gl_Position = vec4(uv, 0., 1.);
        }`;
    static FRAGMENT = `#version 300 es
        mediump vec4 mod289(mediump vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        mediump vec4 perm(mediump vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

        mediump float random3(mediump vec3 p) {
            mediump vec3 a = floor(p);
            mediump vec3 d = p - a;
            d = d * d * (3.0 - 2.0 * d);
        
            mediump vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
            mediump vec4 k1 = perm(b.xyxy);
            mediump vec4 k2 = perm(k1.xyxy + b.zzww);
        
            mediump vec4 c = k2 + a.zzzz;
            mediump vec4 k3 = perm(c);
            mediump vec4 k4 = perm(c + 1.0);
        
            mediump vec4 o1 = fract(k3 * (1.0 / 41.0));
            mediump vec4 o2 = fract(k4 * (1.0 / 41.0));
        
            mediump vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
            mediump vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
        
            return o4.y * d.y + o4.x * (1.0 - d.y);
        }
        
        mediump float interpolate(mediump float a, mediump float b, mediump float c, mediump float d, mediump float x) {
            mediump float p = (d - c) - (a - b);
            return x * (x * (x * p + ((a - b) - p)) + (c - a)) + b;
        }
    
        mediump float sampleX(mediump vec3 at) {
            mediump float floored = floor(at.x);
            return interpolate(
                random3(vec3(floored - 1.0, at.yz)),
                random3(vec3(floored, at.yz)),
                random3(vec3(floored + 1.0, at.yz)),
                random3(vec3(floored + 2.0, at.yz)),
                at.x - floored) * 0.5 + 0.25;
        }
        
        mediump float sampleY(mediump vec3 at) {
            mediump float floored = floor(at.y);
            return interpolate(
                sampleX(vec3(at.x, floored - 1.0, at.z)),
                sampleX(vec3(at.x, floored, at.z)),
                sampleX(vec3(at.x, floored + 1.0, at.z)),
                sampleX(vec3(at.x, floored + 2.0, at.z)),
                at.y - floored);
        }
        
        mediump float cubicNoise(mediump vec3 at) {
            mediump float floored = floor(at.z);
            return interpolate(
                sampleY(vec3(at.xy, floored - 1.0)),
                sampleY(vec3(at.xy, floored)),
                sampleY(vec3(at.xy, floored + 1.0)),
                sampleY(vec3(at.xy, floored + 2.0)),
                at.z - floored);
        }

        uniform mediump vec2 size;
        uniform mediump float scale;
        uniform mediump float threshold;
        uniform mediump vec3 position;
        
        in mediump vec2 uv;
        out lowp vec4 color;
        
        void main() {
            mediump vec3 samplePosition = position + vec3(uv * scale * size, 0.);
            
            if (cubicNoise(samplePosition) > threshold)
                color = vec4(vec3(1.), 1.);
            else
                color = vec4(vec3(0.), 1.);
        }`;

    constructor() {
        super(ShaderSpots.VERTEX, ShaderSpots.FRAGMENT);

        this.size = this.getUniform("size");
        this.scale = this.getUniform("scale");
        this.threshold = this.getUniform("threshold");
        this.position = this.getUniform("position");
    }

    setSize(width, height) {
        gl.uniform2f(this.size, width, height);
    }

    setScale(scale) {
        gl.uniform1f(this.scale, scale);
    }

    setThreshold(threshold) {
        gl.uniform1f(this.threshold, threshold);
    }

    setPosition(x, y, z) {
        gl.uniform3f(this.position, x, y, z);
    }
}