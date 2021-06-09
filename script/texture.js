class Texture {
    constructor(filename) {
        this.textureID = this.loadTexture(filename);
    }

    loadTexture(filename) {
        var width  = 1;
        var height = 1;
        const internalFormat = gl.RGBA32F;
        const srcFormat = gl.RGBA;
        const srcType = gl.FLOAT
        
        var textureID = gl.createTexture();
        this.textureID = textureID;
        gl.bindTexture(gl.TEXTURE_2D, this.textureID);

        var pixel = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 1, 1, 0,
                      srcFormat, srcType, pixel);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        var image = new Image();
        image.onload = function() {
            console.log(image);
            gl.bindTexture(gl.TEXTURE_2D, textureID);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, image.width, image.height, 0,
                          srcFormat, srcType, image);
                          
            
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            width = image.width;
            height = image.height;
        }
        image.src = filename;

        this.image = image;

        return textureID;
    }

    getDim() {
        //console.log(this.image.width);
        return new Vec2(this.image.width, this.image.height);
    }

    getTextureID() {
        return this.textureID;
    }

    bind(unit) {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this.textureID);
    }
}
