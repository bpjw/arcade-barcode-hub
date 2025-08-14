import CommunicationClient from "../../services/communication.js";
import css from "./card.css?raw";
import html from "./card.html?raw";
import CardHeader from "../card-header/card-header.js";
import StorageHandler from "../../services/storage-handler.js";
const ipAdressKeyName = "ipAdress";
class CardComponent extends HTMLElement {
  #client;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
    this.storageHandler = new StorageHandler();
    this.getCommunicationClient();
  }
  getCommunicationClient() {
    this.#client = new CommunicationClient(
      `http://${this.storageHandler.getDataFromLocalStorage(ipAdressKeyName)}/api/barcode`,
    );
  }

  setData(dino) {
    this._data = dino;
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${css}</style>${html}`;
    if (this._data) {
      this.render();
      this.addEventListener("click", this.sendCode);
    }
  }
  sendCode() {
    this.#client.sendBarcode(this._data.card_code);
  }
  render() {
    if (!this._data) return;

    const dino = this._data;

    const card = this._shadow.querySelector("#card");
    const existingStats = this.querySelector('[slot="stats"]');
    if (existingStats) existingStats.remove();
    if (this._data.stats?.attack) {
      const statsHeader = document.createElement("card-header");
      statsHeader.setAttribute("slot", "stats");
      statsHeader.setData(this._data.stats);
      this.appendChild(statsHeader);
    }
    if (dino.cardType?.toLowerCase() === "move") {
      card.classList.add("move");
    }
    this._shadow.getElementById("name").textContent = dino.name;
    this._shadow.getElementById("game").textContent =
      dino.compat != "" ? dino.compat : "N/A";
    this._shadow.getElementById("img").setAttribute("src", dino.img_url);
    this._shadow.getElementById("img").setAttribute("alt", dino.name);
    this._shadow.getElementById("img").classList.add(dino.sign);
    this._shadow.getElementById("type").textContent = dino.type;
    this._shadow.getElementById("rock").textContent =
      dino.stats.attack != undefined ? dino.stats.attack.Rock : 0;
    this._shadow.getElementById("paper").textContent =
      dino.stats.attack != undefined ? dino.stats.attack.Paper : 0;
    this._shadow.getElementById("scissors").textContent =
      dino.stats.attack != undefined ? dino.stats.attack.Scissors : 0;
    if (dino.cardCode && dino.cardCode !== "undefined") {
      card.classList.add(dino.cardCode);
    } else {
      card.classList.add("empty-card-code");
    }
  }
}

customElements.define("card-component", CardComponent);
