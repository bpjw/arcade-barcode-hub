import css from "./options.css?raw";
import html from "./options.html?raw";
import TextField from "../text-field/text-field";
import StorageHandler from "../../services/storage-handler";

const ipKeyName = "ipAdress";

class Options extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
    const ipAdressField = this._shadow.getElementById("ip");

    if (ipAdressField) {
      this.storageHandler = new StorageHandler();
      ipAdressField.setAttribute(
        "value",
        this.storageHandler.getDataFromLocalStorage(ipKeyName),
      );
      ipAdressField.addEventListener("value-changed", (e) => {
        const newValue = e.detail.value;
        this.storageHandler.setDataFromLocalStorage(ipKeyName, newValue);
        this.dispatchEvent(
          new CustomEvent("option-changed", {
            bubbles: true,
            composed: true,
          }),
        );
      });
    }
  }
}

customElements.define("options-component", Options);

export default Options;
