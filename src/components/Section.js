export default class Section {
  /**
   *
   * @param {Array} items an array that contains items for initial render. By default is set to null.
   * @param {Function} renderer callback function which fires when new item need to be rendered
   * @param {String} containerSelector selector to prepend new items
   */
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  /**
   * Takes an object of objects and add it to container in reverse order
   *
   * @param {Object} items object of objects that conatains data to add new cards
   */
  renderItems(items) {
    const reversedKeys = Object.keys(items).reverse();
    reversedKeys.forEach((key) => {
      this.addItem(items[key]);
    });
  }

  /**
   *
   * @param {Object} item an object
   */
  addItem(item) {
    const newElement = this._renderer(item);
    this._container.prepend(newElement);
  }
}
