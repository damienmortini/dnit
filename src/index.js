import LoopElement from "dlib/dom/LoopElement.js";

import View from "./View.js";

import templateContent from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateContent;

class DnitMain extends LoopElement {
  createdCallback() {
    super.createdCallback();

    Object.assign(this.style, {
      display: "block",
      position: "relative"
    });

    this.canvas = this.shadowRoot.querySelector("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.view = new View(this.canvas);

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    let width = this.canvas.offsetWidth * window.devicePixelRatio;
    let height = this.canvas.offsetHeight * window.devicePixelRatio;
    this.view.resize(width, height);
    this.update();
  }

  update() {
    super.update();
    this.view.update();
  }
}

DnitMain.register("dnit-main", template);
