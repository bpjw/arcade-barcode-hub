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

      // Ein Custom Event dispatchen, das von einem zentralen Modal-Manager gehört wird
      const event = new CustomEvent("open-app-modal", {
        bubbles: true, // Event blubbert nach oben im DOM
        composed: true, // Event kann Shadow DOM-Grenzen durchqueren
        detail: {
          id: modalId,
          content: modalContent,
          // Füge hier beliebige weitere Daten hinzu, die das Modal benötigt
        },
      });
      console.log(
        `Custom event 'open-app-modal' dispatched for modal ID: ${modalId}`,
      );
      this.dispatchEvent(event);
    });
  }
}
export default MenuButton;
customElements.define("menu-button-component", MenuButton);
