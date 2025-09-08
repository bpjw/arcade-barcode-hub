import "./components/card/card.js";
import "./components/sidebar/sidebar.js";
import "./components/modal/modal.js";
import "./components/filter/filter.js";
import DataHandler from "./services/data-handler.js";
import StorageHandler from "./services/storage-handler.js";
import * as init from "./services/init.js";
let dinos;
let dataHandler;
document.addEventListener("DOMContentLoaded", async () => {
  dataHandler = new DataHandler("../assets/dino.json");
  await dataHandler.fetchData();
  dinos = dataHandler.getData();
  let filterStorage = {};

  const app = document.getElementById("app");
  const filter = init.createFilter();
  const cardSelection = init.createCardSection();
  const option = loadOptions(dataHandler);
  const sidebar = init.createSidebar();

  app.appendChild(sidebar);
  app.appendChild(filter);
  app.appendChild(cardSelection);

  dinos.forEach((dino) =>
    cardSelection.appendChild(init.createDinoCard(dino, option)),
  );

  init.initOption(cardSelection);
  init.initFilter(filterStorage, cardSelection, option, dinos);

  const modal = init.createModal();
  app.appendChild(modal);
});

const loadOptions = () => {
  return new StorageHandler();
};
