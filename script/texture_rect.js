var texture_program = null;

class TextureRect extends Rect {
    constructor(texture, pos) {
        super(new Vec2(300, 200), pos);
        if (this.texture_program == null) {
            var texture_shader = new Shader("texture.fs", gl.FRAGMENT_SHADER);
            this.texture_program = new Program(DEFAULT_VERTEX_SHADER, texture_shader);
        }
        super.program = this.texture_program;
        this.texture = texture;
    }

    draw() {
        //this.dim = this.texture.getDim();
        //console.log(super.width);
        this.texture_program.use();
        this.texture.bind(0);
        this.texture_program.uniform1i("mTexture", 0);
        this.texture_program.uniform2f("res", this.dim);
        super.draw();
    }

    setDim(vec2) {
        
    }
}
