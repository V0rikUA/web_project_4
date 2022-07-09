export default class Section {
  /**
   *
   * @param {Array} items an array that contains items for initial render. By default is set to null.
   * @param {Function} renderer handler to render new items
   * @param {String} containerSelector selector to prepend new items
   */
  constructor({ items = null, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    if (this._items !== null) {
      try {
        items.forEach((item) => {
          this.addItem(item);
        });
      } catch (error) {
        if (error instanceof TypeError) {
          throw "items variable is not of type Array";
        } else {
          throw `${error}`;
        }
      }
    }
  }

  addItem(item) {
    this._newElement = this._renderer(item);
    this._container.prepend(this._newElement);
  }
}
