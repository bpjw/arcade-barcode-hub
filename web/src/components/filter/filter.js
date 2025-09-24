import css from "./filter.css?raw";
import html from "./filter.html?raw";
import TextField from "../text-field/text-field";
import StorageHandler from "../../services/storage-handler";
class Filter extends HTMLElement {
  #sign = "single-selection-element";
  #compat = "single-selection-game";
  #cardType = "single-selection-card-type";
  #name = "search-name";
  #signComponent;
  #compatComponent;
  #cardTypeComponent;
  #nameComponent;
  #storageHandler;
  #filterIndex;
  static observedAttributes = [
    "sign",
    "compat",
    "card_type",
    "name",
    "filter_index",
  ];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this.#storageHandler = new StorageHandler();
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
      this.#nameComponent.addEventListener("value-changed", (event) => {
        this.setAttribute("name", event.detail.value);
        this.#dispatchFilterEvent({ name: event.detail.value });
      });
    }
    this.#filterIndex = this.#filterIndex ?? 0; // Kürzere Syntax für die Null-Prüfung

    let storage = JSON.parse(
      this.#storageHandler.getDataFromLocalStorage(this.#filterIndex),
    );

    if (storage) {
      if (this.#signComponent && storage.sign) {
        this.#signComponent.value = storage.sign;
      }
      if (this.#compatComponent && storage.compat) {
        this.#compatComponent.value = storage.compat;
      }
      if (this.#cardTypeComponent && storage.card_type) {
        this.#cardTypeComponent.value = storage.card_type;
      }
      if (this.#nameComponent && storage.name) {
        this.#nameComponent.setAttribute("value", storage.name);
      }
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.#filterIndex = this.getAttribute("filter_index");
    let storage = JSON.parse(
      this.#storageHandler.getDataFromLocalStorage(this.#filterIndex),
    );
    if (storage == null) {
      storage = {};
    }
    Filter.observedAttributes.forEach((element) => {
      if (storage[element])
        this.#dispatchFilterEvent({ [element]: storage[element] });
    });

    storage[name] = newValue;
    this.#storageHandler.setDataFromLocalStorage(
      this.#filterIndex,
      JSON.stringify(storage),
    );
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
