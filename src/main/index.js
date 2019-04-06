window.customElements.define("dnit-main", class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        h1 {
          font-size: 32px;
        }
      </style>
      <h1>dnit-main</h1>
    `;
  }
});
