import {Shader} from "./shader.js";

export class ShaderBlit extends Shader {
    static VERTEX = `#version 300 es
        out vec2 uv;
        
        void main() {
            uv = vec2(gl_VertexID & 1, (gl_VertexID & 2) >> 1);
            
            gl_Position = vec4(uv * 2. - 1., 0., 1.);
        }`;
    static FRAGMENT = `#version 300 es
        in mediump vec2 uv;
        out lowp vec4 color;
        
        uniform sampler2D source;
        
        void main() {
            color = texture(source, uv);
        }`;

    constructor() {
        super(ShaderBlit.VERTEX, ShaderBlit.FRAGMENT);
    }
}