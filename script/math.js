class Vec2 {
    constructor(x=0.0, y=0.0) {
        this.x = x;
        this.y = y;
    }

    data() {
        return [this.x, this.y];
    }
}

class Vec3 {
    constructor(x=0.0, y=0.0, z=0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    data() {
        return [this.x, this.y, this.z];
    }
}

class Vec4 {
    constructor(x=0.0, y=0.0, z=0.0, w=0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    data() {
        return [this.x, this.y, this.z, this.w];
    }
}

class Mat4 {
    constructor(data = null) {
        this.matrix = data;
        if (data == null){
            this.matrix = [1., 0., 0., 0.,
                           0., 1., 0., 0.,
                           0., 0., 1., 0.,
                           0., 0., 0., 1.];
        }
    }

    multiply(m2) {
        var new_matrix = new Mat4();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var value = this.get(0, i) * m2.get(j, 0) +
                            this.get(1, i) * m2.get(j, 1) +
                            this.get(2, i) * m2.get(j, 2) +
                            this.get(3, i) * m2.get(j, 3)
                new_matrix.set(j, i,  value);
            };
        };
        //console.log(new_matrix);
        return new_matrix;
    }

    get(i, j) {
        return this.matrix[i + j * 4];
    }

    set(i, j, f) {
        this.matrix[i + j * 4] = f;
    }
    
    data() {
        return this.matrix;
    }
}

function translation_matrix(vec3) {
    //console.log(vec3);
    var mat = new Mat4();
    mat.set(0, 3, vec3.x);
    mat.set(1, 3, vec3.y);
    mat.set(2, 3, vec3.z);
    return mat;
}

function scale_matrix(vec3) {
    var mat = new Mat4();
    mat.set(0, 0, vec3.x);
    mat.set(1, 1, vec3.y);
    mat.set(2, 2, vec3.z);
    return mat;
}

function frustum_matrix(left, right, bottom, top, znear, zfar) {
    var mat = new Mat4();
    mat.set(0, 0, (2 * znear) / (right - left));
    mat.set(1, 1, (2 * znear) / (top - bottom));
    mat.set(2, 0, (right + left) / (right - left));
    mat.set(2, 1, (top + bottom) / (top - bottom));
    mat.set(2, 2, -(znear + znear) / (zfar - znear));
    mat.set(2, 3, -1);
    mat.set(3, 2, -(2 * zfar * znear) / (zfar - znear));

    return mat;
}

function rotation_matrix(vec3) {
    var rotx = new Mat4();
    rotx.set(1, 1,  Math.cos(vec3.x));
    rotx.set(2, 1, -Math.sin(vec3.x));
    rotx.set(1, 2,  Math.sin(vec3.x));
    rotx.set(2, 2,  Math.cos(vec3.x));

    var roty = new Mat4();
    rotx.set(0, 0,  Math.cos(vec3.y));
    rotx.set(0, 2, -Math.sin(vec3.y));
    rotx.set(2, 0,  Math.sin(vec3.y));
    rotx.set(2, 2,  Math.cos(vec3.y));

    var rotz = new Mat4();
    rotx.set(0, 0,  Math.cos(vec3.z));
    rotx.set(1, 0, -Math.sin(vec3.z));
    rotx.set(0, 1,  Math.sin(vec3.z));
    rotx.set(1, 1,  Math.cos(vec3.z));

    var m = rotz.multiply(roty);
    m = m.multiply(rotx);

    return m;
}
