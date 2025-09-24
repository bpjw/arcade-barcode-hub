import html from "./collection.html?raw";
import css from "./collection.css?raw";

class Collection extends HTMLElement {
  static observedAttributes = ["sign", "compat", "card_type"];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
  }
}

export default Collection;

customElements.define("collection-component", Collection);
