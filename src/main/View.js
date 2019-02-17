import Camera from "../../node_modules/dlib/3d/Camera.js";
import GLBoxObject from "../../node_modules/dlib/gl/objects/GLBoxObject.js";
import TrackballController from "../../node_modules/dlib/3d/controllers/TrackballController.js";

export default class View {
  constructor({
    canvas = undefined,
  } = {}) {
    this.canvas = canvas;

    const webGLOptions = {
      depth: true,
      alpha: false,
      antialias: true,
    };

    if (!/\bforcewebgl1\b/.test(window.location.search)) {
      this.gl = this.canvas.getContext("webgl2", webGLOptions);
    }
    if (!this.gl) {
      this.gl = this.canvas.getContext("webgl", webGLOptions) || this.canvas.getContext("experimental-webgl", webGLOptions);
    }

    this.camera = new Camera();

    this.cameraController = new TrackballController({
      matrix: this.camera.transform,
      distance: 5,
    });

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.object = new GLBoxObject({
      gl: this.gl,
      width: 1,
      height: 1,
      shaders: [{
        fragmentShaderChunks: [
          ["end", `
            fragColor = vec4(vNormal * .5 + .5, 1.);
          `],
        ],
      }],
    });
  }

  resize(width, height) {
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.camera.aspectRatio = width / height;
    this.update();
  }

  update() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.cameraController.update();

    this.object.draw({
      uniforms: {
        projectionView: this.camera.projectionView,
      },
    });
  }
}
