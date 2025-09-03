import css from "./text-field.css?raw";
import html from "./text-field.html?raw";

class TextField extends HTMLElement {
  static observedAttributes = ["value"];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;

    const inputElement = this._shadow.getElementById("text-field");

    if (inputElement) {
      inputElement.addEventListener("input", (e) => {
        const newValue = e.target.value;
        this.setAttribute("value", newValue);
        this.dispatchEvent(
          new CustomEvent("value-changed", {
            detail: { value: newValue },
            bubbles: true,
            composed: true,
          }),
        );
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const inputElement = this._shadow.getElementById("text-field");

    if (inputElement && inputElement.value !== newValue) {
      inputElement.value = newValue;
      inputElement.setAttribute("value", newValue);
    }
  }
}

export default TextField;
customElements.define("text-field", TextField);
