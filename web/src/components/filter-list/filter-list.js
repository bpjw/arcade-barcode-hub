import StorageHandler from "../../services/storage-handler";
import css from "./filter-list.css?raw";
import html from "./filter-list.html?raw";
import TextField from "../text-field/text-field";
const defaultName = "default";
class FilterList extends HTMLElement {
  static observedAttributes = ["collections"];
  #STORAGE_KEY = "collection";
  #storageHandler;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
    this.#storageHandler = new StorageHandler();
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
    let elementJSON = JSON.parse(this.#get());

    if (elementJSON == null || elementJSON.length <= 0) {
      this.#save([defaultName]);
      elementJSON = JSON.parse(this.#get());
    }
    this.#createFilterList(elementJSON);
    const button = this._shadow.getElementById("create-collection");
    button.addEventListener("click", () => {
      this._shadow.getElementById("inline-router").innerHTML = "";
      this.#createFilterList([...elementJSON, "new"]);
    });
    const defaultActiveFilter = this._shadow.querySelector(".filter-wrapper");
    defaultActiveFilter.setAttribute("class", "filter-wrapper active");

    this.addEventListener("active-filter", (e) => {
      const activeFilter = this._shadow.querySelector(".active");
      if (activeFilter != null) {
        activeFilter.setAttribute("class", "filter-wrapper");
      }
      const filters = this._shadow.querySelectorAll(".filter-wrapper");
      filters[e.detail.value].setAttribute("class", "filter-wrapper active");

      this.setAttribute("active-filter", e.detail.value);
    });
  }
  attributeChangedCallback(name, oldValue, newValue) {}

  #createFilterList(elements) {
    elements.forEach((element, index) => {
      const div = document.createElement("div");
      const text = document.createElement("text-field");
      div.setAttribute("class", "filter-wrapper");
      text.setAttribute("class", "filter-name");
      text.setAttribute("data-id", index);
      div.appendChild(text);
      this._shadow.getElementById("inline-router").appendChild(div);

      text.addEventListener("value-changed", (e) => {
        const newValue = e.detail.value;
        elements[text.dataset.id] = newValue;
        this.#save([...elements]);
        this.setAttribute("collections", [...elements]);
      });

      text.setAttribute("value", element);
      this.setAttribute("collections", [...elements]);
      div.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("active-filter", {
            detail: { value: index },
            bubbles: true,
            composed: true,
          }),
        );
      });
    });
  }

  #save(elements) {
    console.log("#save", elements);
    this.#storageHandler.setDataFromLocalStorage(
      this.#STORAGE_KEY,
      JSON.stringify(elements),
    );
  }
  #get() {
    return this.#storageHandler.getDataFromLocalStorage(this.#STORAGE_KEY);
  }
}

export default FilterList;

customElements.define("inline-router-component", FilterList);
