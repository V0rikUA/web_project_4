import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   *
   * @param {String} popupSelector selector to manipulate modal window
   * @param {Function} handleFormSubmit a callback function which PopupWithForm calls when the form’s submit event fires
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".form");
  }
  /**
   *collects data from all the input fields and
   * @returns an object with data.
   *
   */
  getInputValues() {
    return Array.from(this._popupElement.querySelectorAll("input")).reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    );
  }

  changeSubmitHandler(newHandler) {
    this._handleFormSubmit = newHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleFormSubmit);
  }

  /**
   * remove "popup_active" class and all event listeners and reset form input fields
   */
  close() {
    super.close();
    this._form.reset();
  }
}
