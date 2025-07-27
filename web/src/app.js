import "./components/card/card.js";
import "./components/sidebar/sidebar.js";
import "./components/modal/modal.js";
import DataHandler from "./services/data-handler.js";
import StorageHandler from "./services/storage-handler.js";

let dinos;
let dataHandler;
document.addEventListener("DOMContentLoaded", async () => {
  console.log("App gestartet!");

  dataHandler = new DataHandler("../assets/dino.json");
  await dataHandler.fetchData();
  dinos = dataHandler.getData();

  const app = document.getElementById("app");
  const cardSelection = createCardSection();
  const option = loadOptions(dataHandler);
  const sidebar = createSidebar();
  app.appendChild(sidebar);
  app.appendChild(cardSelection);
  dinos.forEach((dino) =>
    cardSelection.appendChild(createDinoCard(dino, option)),
  );
  const modal = createModal();
  app.appendChild(modal);
});

const loadOptions = () => {
  return new StorageHandler();
};
const createSidebar = () => {
  const sidebar = document.createElement("sidebar-component");
  return sidebar;
};
const createModal = () => {
  const modal = document.createElement("modal-component");
  return modal;
};

const createCardSection = () => {
  const section = document.createElement("section");
  section.setAttribute("id", "card-overview");
  section.setAttribute("class", "card-overview");
  return section;
};

const createDinoCard = (dino, option) => {
  const card = document.createElement("card-component");
  card.setData(dino);
  card.addEventListener("value-changed", (e) => {
    console.log("card", e.value);
  });
  return card;
};
