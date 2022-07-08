export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    const newElement = this._renderer(this._item);
    this.addItem(newElement);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
