class SceneObject {
    this.onMove = null;
    this.onScale = null;
    this.onRotate = null;
    
    constructor(pos) {
        this.pos = pos;
        this.rotation = Vec3();
    }

    move(delta) {
        if (this.onMove != null) {
            this.onMove();
        }
        this.pos.x = this.pos.x + delta.x;
        this.pos.y = this.pos.y + delta.y;
        this.pos.z = this.pos.z + delta.z;
    }

    moveTo(new_pos) {
        if (this.onMove != null) {
            this.onMove();
        }
        this.pos = new_pos;
    }

    rotate(delta) {
        if (this.onRotate != null) {
            this.onRotate();
        }
        this.rotation.x = this.rotation.x + delta.x;
        this.rotation.y = this.rotation.y + delta.y;
        this.rotation.z = this.rotation.z + delta.z;
    }

    rotateTo(rotation) {
        if (this.onRotate != null) {
            this.onRotate();
        }
        this.rotation = rotation;
    }

    draw() {
        
    }
}
