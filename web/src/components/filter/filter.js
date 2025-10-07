import css from "./filter.css?raw";
import html from "./filter.html?raw";
import TextField from "../text-field/text-field";
import StorageHandler from "../../services/storage-handler";
class Filter extends HTMLElement {
  #sign = "single-selection-element";
  #compat = "single-selection-game";
  #cardType = "single-selection-card-type";
  #name = "search-name";
  #isHearted = "isHearted";
  #signComponent;
  #compatComponent;
  #cardTypeComponent;
  #nameComponent;
  #isHeartedComponent;
  #storageHandler;
  #filterIndex;
  static observedAttributes = [
    "sign",
    "compat",
    "card_type",
    "name",
    "filter_index",
    "isHearted",
  ];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    console.log("connected Callback");
    this.#storageHandler = new StorageHandler();
    this._shadow.innerHTML = `<style>${css}</style>${html}`;

    this.#signComponent = this._shadow.getElementById(this.#sign);
    this.#compatComponent = this._shadow.getElementById(this.#compat);
    this.#cardTypeComponent = this._shadow.getElementById(this.#cardType);
    this.#nameComponent = this._shadow.getElementById(this.#name);
    this.#isHeartedComponent = this._shadow.getElementById(this.#isHearted);
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
    this.#isHeartedComponent.addEventListener("change", (event) => {
      this.setAttribute("isHearted", event.target.checked);
      this.#dispatchFilterEvent({ isHearted: event.target.checked });
    });
    if (this.#nameComponent) {
      this.#nameComponent.addEventListener("value-changed", (event) => {
        this.setAttribute("name", event.detail.value);
        this.#dispatchFilterEvent({ name: event.detail.value });
      });
    }

    this.#filterIndex = this.getAttribute("filter_index") ?? 0;

    let storage = JSON.parse(
      this.#storageHandler.getDataFromLocalStorage(this.#filterIndex),
    );

    if (storage) {
      if (this.#signComponent && storage.sign) {
        this.#signComponent.value = storage.sign;
        this.setAttribute("sign", storage.sign);
      }
      if (this.#compatComponent && storage.compat) {
        this.#compatComponent.value = storage.compat;
        this.setAttribute("compat", storage.compat);
      }
      if (this.#cardTypeComponent && storage.card_type) {
        this.#cardTypeComponent.value = storage.card_type;
        this.setAttribute("card_type", storage.card_type);
      }
      if (this.#isHeartedComponent && storage.isHearted) {
        this.#isHeartedComponent.checked = storage.isHearted;
        this.setAttribute("isHearted", storage.isHearted);
      }
      if (this.#nameComponent && storage.name) {
        this.#nameComponent.setAttribute("name", storage.name);
        this.setAttribute("name", storage.name);
      }
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} : ${oldValue} => ${newValue}`);
    if (oldValue === newValue) return;

    this.#filterIndex = this.getAttribute("filter_index") ?? 0;

    // Read the current storage state for this index
    let storage = JSON.parse(
      this.#storageHandler.getDataFromLocalStorage(this.#filterIndex),
    );

    if (storage === null) {
      storage = {};
    }

    // Update the UI component when the attribute changes externally
    if (name === "filter_index") {
      // When index changes, force re-read and update all components
      if (this.#signComponent && storage.sign)
        this.#signComponent.value = storage.sign;
      else if (this.#signComponent) this.#signComponent.value = "";

      if (this.#compatComponent && storage.compat)
        this.#compatComponent.value = storage.compat;
      else if (this.#compatComponent) this.#compatComponent.value = "";

      if (this.#cardTypeComponent && storage.card_type)
        this.#cardTypeComponent.value = storage.card_type;
      else if (this.#cardTypeComponent) this.#cardTypeComponent.value = "";
      if (this.#isHeartedComponent && storage.isHearted)
        this.#isHeartedComponent.checked = storage.isHearted;
      else if (this.#isHeartedComponent)
        this.#isHeartedComponent.checked = false;

      if (this.#nameComponent && storage.name)
        this.#nameComponent.setAttribute("name", storage.name);
      else if (this.#nameComponent)
        this.#nameComponent.setAttribute("name", "");

      this.#dispatchFilterEvent({ filter_index: newValue });
      // Don't save storage yet, as the index change itself doesn't change the data *content*.
      return;
    }

    // Update the specific component's value if the change came externally
    if (name === "sign" && this.#signComponent) {
      this.#signComponent.value = newValue;

      this.#dispatchFilterEvent({ sign: newValue });
    }
    if (name === "compat" && this.#compatComponent) {
      this.#compatComponent.value = newValue;
      this.#dispatchFilterEvent({ compat: newValue });
    }
    if (name === "card_type" && this.#cardTypeComponent) {
      this.#cardTypeComponent.value = newValue;
      this.#dispatchFilterEvent({ card_type: newValue });
    }
    if (name === "isHearted" && this.#isHeartedComponent) {
      this.#isHeartedComponent.checked = newValue;
      this.#dispatchFilterEvent({ isHearted: newValue });
    }
    if (name === "name" && this.#nameComponent) {
      this.#nameComponent.setAttribute("value", newValue);
      this.#dispatchFilterEvent({ name: newValue });
    }

    // Update the specific attribute in the storage object
    storage[name] = newValue;

    this.#dispatchFilterEvent({});
    // Save the updated storage object
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
