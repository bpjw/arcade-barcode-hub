import css from "./sidebar.css?raw";
import html from "./sidebar.html?raw";
import MenuButton from "../menu-button/menu-button.js";
import Options from "../options/options.js";
class Sidebar extends HTMLElement {
  static observedAttributes = ["istoggled"];
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }
  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `attributeChangedCallback ausgelöst! ${name}: ${oldValue} => ${newValue}`,
    );
  }
}

export default Sidebar;
customElements.define("sidebar-component", Sidebar);
