import {gl} from "./gl.js";

export class Mesh {
    static SEGMENTS = 10;

    constructor() {
        this.buffer = gl.createBuffer();
        this.mirror = new Float32Array(Mesh.SEGMENTS << 3);
    }

    update() {

    }

    draw(time) {

    }
}