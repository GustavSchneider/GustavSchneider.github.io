class Shader {
    constructor(filename, type) {
        this.filename = filename;
        this.type = type;
        this.src = this.load_shader_src(filename);
        this.compile();
    }

    compile() {
        this.shader = gl.createShader(this.type);
        gl.shaderSource(this.shader, this.src);
        gl.compileShader(this.shader);

        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            console.log("Failed to compile shader: " + this.filename +
                        "\n" + gl.getShaderInfoLog(this.shader));
            gl.deleteShader(this.shader);
            this.shader = null;
        }
    }

    load_shader_src(filename) {
        var src = "not-loaded";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                src = this.responseText;
            }
        }
        xhttp.overrideMimeType("text/plain");
        xhttp.open("GET", "shaders/" + filename, false);
        xhttp.send();
        return src;
    }

    getShader() {
        return this.shader;
    }
};
