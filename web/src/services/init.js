export const initOption = (cardSelection) => {
  document.addEventListener("option-changed", (e) => {
    cardSelection.childNodes.forEach((card) => card.getCommunicationClient());
  });
};

export const initFilter = (filterStorage, cardSelection, option, dinos) => {
  document.addEventListener("filter-changed", (e) => {
    filterStorage = { ...filterStorage, ...e.detail.value };
    for (const key in filterStorage) {
      if (filterStorage[key] === "") {
        delete filterStorage[key];
      }
    }
    cardSelection.innerHTML = "";

    let filterKeys = Object.keys(filterStorage);
    let filterdDinos = dinos.filter((dino) => {
      return filterKeys.every((key) => {
        if (key != "name") {
          return dino[key].toLowerCase() === filterStorage[key].toLowerCase();
        }
        return dino[key]
          .toLowerCase()
          .includes(filterStorage[key].toLowerCase());
      });
    });
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
