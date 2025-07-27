import  html  from './card-header.html?raw';
import  css  from './card-header.css?raw';
class CardHeader extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: "closed" });
  }
  setData(stats) {
    this._data = stats;
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
      this.render();
  }

  render() {
    if(!this._data) return;
    this._shadow.getElementById("strength").textContent = this._data.strength != '' ? this._data.strength : 0;
    this._shadow.getElementById("tech").textContent = this._data.tech != '' ? this._data.tech : 0;
  }
}
export default CardHeader;
customElements.define("card-header", CardHeader);
