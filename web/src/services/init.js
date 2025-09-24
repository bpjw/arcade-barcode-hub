import DataHandler from "./data-handler";
import StorageHandler from "./storage-handler";

export const initOption = (cardSelection) => {
  document.addEventListener("option-changed", (e) => {
    cardSelection.childNodes.forEach((card) => card.getCommunicationClient());
  });
};
export const initInlineRouter = () => {
  return document.createElement("inline-router-component");
};
export const initFilter = (filterStorage, cardSelection, option, dinos) => {
  document.addEventListener("filter-changed", (e) => {
    if (e.detail != null) {
      filterStorage = { ...filterStorage, ...e.detail.value };
    }
    for (const key in filterStorage) {
      if (filterStorage[key] === "") {
        delete filterStorage[key];
      }
    }

    // Get the hearted dinosaurs first
    const heartedDinoIds = new StorageHandler().getDataFromLocalStorage(
      `dino-collection-${filterStorage["filter_index"]}`,
    );

    // Separate the 'filter_index' key from the others
    const filterKeys = Object.keys(filterStorage).filter(
      (key) => key !== "filter_index",
    );

    let filterdDinos = dinos.filter((dino) => {
      // Condition 1: Check if the current dino is "hearted"
      const isHearted =
        heartedDinoIds && heartedDinoIds.includes(dino.card_code); // Assuming each dino has a unique 'id'

      // Condition 2: Check if the dino matches all the *other* filters
      const matchesOtherFilters = filterKeys.every((key) => {
        if (key === "name") {
          return dino[key]
            .toLowerCase()
            .includes(filterStorage[key].toLowerCase());
        }
        return dino[key].toLowerCase() === filterStorage[key].toLowerCase();
      });

      // A dinosaur is included if it's hearted OR it matches the other filters
      return isHearted || matchesOtherFilters;
    });

    cardSelection.innerHTML = "";
    filterdDinos.forEach((dino) =>
      cardSelection.appendChild(createDinoCard(dino, option)),
    );
  });
};

export const createSidebar = () => {
  const sidebar = document.createElement("sidebar-component");
  return sidebar;
};

export const createModal = () => {
  const modal = document.createElement("modal-component");
  return modal;
};

export const createCardSection = () => {
  const section = document.createElement("section");
  section.setAttribute("id", "card-overview");
  section.setAttribute("class", "card-overview");
  return section;
};

export const createDinoCard = (dino, option) => {
  const card = document.createElement("card-component");
  card.setData(dino);
  return card;
};

export const createFilter = () => {
  const filter = document.createElement("filter-component");
  return filter;
};

export const createDefaultCollection = () => {
  const collection = document.createElement("collection-component");
  return collection;
};

export const init = async () => {
  let dinos;
  let dataHandler;

  dataHandler = new DataHandler("../assets/dino.json");
  await dataHandler.fetchData();
  dinos = dataHandler.getData();
  let filterStorage = {};

  const app = document.getElementById("app");
  const filter = createFilter();
  const cardSelection = createCardSection();
  const option = loadOptions(dataHandler);
  const sidebar = createSidebar();

  const collection = createDefaultCollection();

  app.appendChild(sidebar);
  app.appendChild(filter);
  app.appendChild(collection);

  dinos.forEach((dino) =>
    cardSelection.appendChild(createDinoCard(dino, option)),
  );

  app.appendChild(cardSelection);

  initOption(cardSelection);
  initFilter(filterStorage, cardSelection, option, dinos);

  const modal = createModal();
  app.appendChild(modal);
  filter.setAttribute("filter_index", 0);
};
const loadOptions = () => {
  return new StorageHandler();
};
