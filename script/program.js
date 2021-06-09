class Program {
    constructor(vertex_shader, fragment_shader) {
        this.program = gl.createProgram();
        this.vertex_shader = vertex_shader;
        this.fragment_shader = fragment_shader;
        
        gl.attachShader(this.program, vertex_shader.getShader());
        gl.attachShader(this.program, fragment_shader.getShader());

        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log("Failed to link program:" +
                        "\nvertex shader: " + vertex_shader.filename +
                        "\nfragment shader: " + fragment_shader.filename +
                        gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    getProgram() {
        return this.program;
    }

    use() {
        gl.useProgram(this.program);
    }

    getAttribLocation(name) {
        return gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name) {
        return gl.getUniformLocation(this.program, name);
    }

    uniform1i(name, i) {
        gl.uniform1i(this.getUniformLocation(name), i);
    }

    uniform1f(name, f) {
        gl.uniform1f(this.getUniformLocation(name), f);
    }

    uniform2f(name, vec2) {
        gl.uniform2fv(this.getUniformLocation(name), vec2.data());
    }

    uniform4f(name, vec4) {
        gl.uniform4fv(this.getUniformLocation(name), vec4.data());
    }

    uniformMatrix4f(name, data) {
        gl.uniformMatrix4fv(this.getUniformLocation(name), false, data);
    }
}
