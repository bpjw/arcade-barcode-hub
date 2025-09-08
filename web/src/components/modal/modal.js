import css from "./modal.css?raw";
import html from "./modal.html?raw";

class Modal extends HTMLElement {
  static observedAttributes = ["istoggled"];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;

    this.modalBodyContent = this._shadow.getElementById("modalBodyContent");
    this.modalOverlay = this._shadow.getElementById("appModalOverlay");

    this.closeButton = this._shadow.getElementById("closeModalBtn");

    document.body.addEventListener(
      "open-app-modal",
      this.handleOpenModalEvent.bind(this),
    );

    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    this.closeButton.addEventListener("click", () => this.close());
  }

  disconnectedCallback() {
    document.body.removeEventListener(
      "open-app-modal",
      this.handleOpenModalEvent.bind(this),
    );
  }

  handleOpenModalEvent(event) {
    const { id, content } = event.detail;
    this.open(content);
  }

  open(contentHtml) {
    this.modalBodyContent.innerHTML = contentHtml;
    this.modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    this.modalBodyContent.innerHTML = "";
  }
}
export default Modal;
customElements.define("modal-component", Modal);
