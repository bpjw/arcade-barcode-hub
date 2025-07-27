class DataHandler {
  #url;
  #data;
  constructor(url) {
    this.#url = url;

  }

  async fetchData() {

    const res = await fetch(this.#url)
    this.#data = await res.json();
    document.dispatchEvent(new Event('data-loaded'));

  }

  filterData(filter) {
    if (this.#data != undefined) {
      this.#data = this.#data.filter(filter);
    }
  }

  getData() {
    return this.#data;
  }

  update(filter) {
    this.filterData(filter);
  }
}
export default DataHandler;
