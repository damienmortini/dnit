import TickerElement from "../../node_modules/dlmn/util/TickerElement.js";

import Scene from "./Scene.js";
import Renderer from "./Renderer.js";

window.customElements.define("dnit-main", class extends TickerElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector("canvas");
    this.renderer = new Renderer({ canvas: this.canvas });
    this.scene = new Scene({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));
    this.resize();
    this.play();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._resizeBinded);
    this.pause();
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    this.scene.resize(width, height);
    this.renderer.resize(width, height);
    this.renderer.render({ scene: this.scene });
  }

  update() {
    this.scene.update();
    this.renderer.render({ scene: this.scene });
  }
});
