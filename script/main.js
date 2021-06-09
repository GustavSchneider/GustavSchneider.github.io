//
// start here
//
function main() {
    console.log("Welcome to my personal WebGL website");

    window.onresize = function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }


    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    var me = new Texture("./images/me.jpg");
    var vs = new Shader("simple.vs", gl.VERTEX_SHADER);
    var fs = new Shader("demo.fs", gl.FRAGMENT_SHADER);
    var program = new Program(vs, fs);    
    console.log(me, new Vec2(100, 100));
    //var rect = new TextureRect(me);
    var res = new Vec2(1000., 1000.);
    var rect = new Rect(res, new Vec2(0., 0.), program, 200);

    var t0 = Date.now();
    draw_scene = function() {
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.enable(gl.DEPTH_TEST);
        //rect.setPosition(new Vec2(0., 0.), 0));

        program.use()
        var time = (Date.now() - t0) / 1000.;
        program.uniform1f("time", time);
        program.uniform2f("res", res);
        rect.draw();
    }

    rect.setColor(new Vec4(0.0, 0.0, 1.0, 1.0));
    draw_scene();
    window.setInterval(draw_scene, 1000 / 60);
}
