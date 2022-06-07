import {Shader} from "./shader.js";
import {gl} from "./gl.js";

export class ShaderShape extends Shader {
    static FRAGMENT = `#version 300 es
        #define SHADE_POWER .15
    
        in mediump vec2 uv;
        out lowp vec4 color;
        
        uniform sampler2D source;
        uniform mediump float radius;
        uniform mediump float center;
        uniform mediump float thickness;
        uniform lowp vec3 shade;
        
        void main() {
            mediump float r = pow(cos(3.141593 * (pow(1. - uv.x, center) - .5)), thickness) * radius;
            
            if (abs(uv.y - .5) * 2. > r)
                color = vec4(0.);
            else
                color = mix(vec4(shade, 1.), texture(source, uv), pow((r - abs(uv.y - .5) * 2.) / r, SHADE_POWER));
        }`;

    constructor() {
        super(Shader.VERTEX_BLIT, ShaderShape.FRAGMENT);

        this.radius = this.getUniform("radius");
        this.center = this.getUniform("center");
        this.thickness = this.getUniform("thickness");
        this.shade = this.getUniform("shade");
    }

    setRadius(radius) {
        gl.uniform1f(this.radius, radius);
    }

    setCenter(center) {
        gl.uniform1f(this.center, center);
    }

    setThickness(thickness) {
        gl.uniform1f(this.thickness, thickness);
    }

    setShade(shade) {
        gl.uniform3f(this.shade, shade.r, shade.g, shade.b);
    }
}