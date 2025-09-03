import css from "./filter.css?raw";
import html from "./filter.html?raw";
import TextField from "../text-field/text-field";

class Filter extends HTMLElement {
  #sign = "single-selection-element";
  #compat = "single-selection-game";
  #cardType = "single-selection-card-type";
  #name = "search-name";
  #signComponent;
  #compatComponent;
  #cardTypeComponent;
  #nameComponent;
  static observedAttributes = ["sign", "compat", "card_type"];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;

    this.#signComponent = this._shadow.getElementById(this.#sign);
    this.#compatComponent = this._shadow.getElementById(this.#compat);
    this.#cardTypeComponent = this._shadow.getElementById(this.#cardType);
    this.#nameComponent = this._shadow.getElementById(this.#name);

    this.#compatComponent.addEventListener("change", (event) => {
      this.setAttribute("compat", event.target.value);
      this.#dispatchFilterEvent({ compat: event.target.value });
    });

    this.#signComponent.addEventListener("change", (event) => {
      this.setAttribute("sign", event.target.value);
      this.#dispatchFilterEvent({ sign: event.target.value });
    });

    this.#cardTypeComponent.addEventListener("change", (event) => {
      this.setAttribute("card_type", event.target.value);
      this.#dispatchFilterEvent({ card_type: event.target.value });
    });

    if (this.#nameComponent) {
      console.log(this.#nameComponent);
      this.#nameComponent.addEventListener("value-changed", (event) => {
        this.setAttribute("name", event.detail.value);
        this.#dispatchFilterEvent({ name: event.detail.value });
      });
    }
  }

  #dispatchFilterEvent(value) {
    this.dispatchEvent(
      new CustomEvent("filter-changed", {
        detail: { value: value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

export default Filter;

customElements.define("filter-component", Filter);
