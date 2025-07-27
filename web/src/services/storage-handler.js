class StorageHandler {
  constructor() {
    if (StorageHandler.instace) {
      return StorageHandler.instace;
    }

    this.#loadOptionsFromLocalStorage();
  }

  #loadOptionsFromLocalStorage() {
    for (const key in this) {
      if (
        this.hasOwnProperty(key) &&
        typeof this[key] !== "function" &&
        key !== "status"
      ) {
        this[key] = this.getDataFromLocalStorage(key);
      }
    }
  }

  getDataFromLocalStorage(key) {
    return localStorage.getItem(key);
  }
  setDataFromLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
}
export default StorageHandler;
