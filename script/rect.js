const vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
                  -1.0, -1.0, 1.0, -1.0, 1.0, 1.0];
const uv = [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0];

class Rect {
    constructor(dim, pos, program = null, subdivision = 1) {
        this.pos = pos;
        this.dim = dim;
        this.program = program;
        if (program == null)
            this.program = DEFAULT_PROGRAM;
        this.color = new Vec4();

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        
        this.vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);


        this.triangles = 0;

        var vertices = new Array();
        var ddist = 1. / subdivision;
        var to_gl = function(f) { return f * 2. - 1.; }
        for (var i = 0; i < subdivision; i++) {
            for (var j = 0; j < subdivision; j++) {
                var v1 = new Vec2(to_gl(i * ddist), to_gl(j * ddist));
                var v2 = new Vec2(to_gl((i + 1) * ddist), to_gl(j * ddist));
                var v3 = new Vec2(to_gl(i * ddist), to_gl((j + 1) * ddist));
                var v4 = new Vec2(to_gl((i + 1) * ddist), to_gl((j  + 1) * ddist));

                vertices.push(v1.x, v1.y, v2.x, v2.y, v4.x, v4.y,
                              v1.x, v1.y, v4.x, v4.y, v3.x, v3.y);

                this.triangles += 2;
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        this.uv_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uv_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(1);
        
        gl.bindVertexArray(null);
    }

    setColor(color) {
        this.color = color;
    }

    draw() {        
        gl.bindVertexArray(this.vao);
        this.program.use();
        this.program.uniform4f("color", this.color);        
        //distance conversion between pixel space and opengl space 
        // var tm = translation_matrix(new Vec3(
        //     ((this.pos.x + this.dim.x / 2) / window.innerWidth) * 2.0 - 1.0,
        //     -(((this.pos.y + this.dim.y / 2) / window.innerHeight )* 2.0 - 1.0),
        //     0.));

        var tm = translation_matrix(new Vec3(0., -2., 0.));
        
        //the dimensions has to be converted from pixels to opengl coordinate space
        // var sm = scale_matrix(new Vec3(
        //     this.dim.x / window.innerWidth,
        //     this.dim.y / window.innerHeight,
        //     1.));

        var sm = scale_matrix(new Vec3(
            40., 40.,
            1.));

        var rm = rotation_matrix(new Vec3(3.14159 / 2, 0., 0.));

        var frustum = frustum_matrix(-1, 1, -1, 1, 0.5, 10);
        this.program.uniformMatrix4f("frustum", frustum.data());

        this.program.uniformMatrix4f("scale", sm.data());
        this.program.uniformMatrix4f("translation", tm.data());
        this.program.uniformMatrix4f("rotation", rm.data());       
        
        gl.drawArrays(gl.TRIANGLES, 0, this.triangles * 3);
    }

    setPosition(vec2) {
        this.pos = vec2;
    }
}
