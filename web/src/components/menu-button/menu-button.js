import css from "./menu-button.css?raw";
import html from "./menu-button.html?raw";
class MenuButton extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
    this.addEventListenerToOpenModal();
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  addEventListenerToOpenModal() {
    this.addEventListener("click", (e) => {
      const modalId = this.dataset.modalId || "default-modal";
      const modalContent =
        this.dataset.modalContent || "Standardinhalt für das Modal.";

      const event = new CustomEvent("open-app-modal", {
        bubbles: true,
        composed: true,
        detail: {
          id: modalId,
          content: modalContent,
        },
      });
      this.dispatchEvent(event);
    });
  }
}
export default MenuButton;
customElements.define("menu-button-component", MenuButton);
