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
    this._form = this._popupElement.querySelector("form");

    this._handleSubmitButton = this._handleSubmitButton.bind(this);
  }
  /**
   *collects data from all the input fields and
   * @returns an object with data.
   *
   */
  _getInputValues() {
    return Array.from(this._popupElement.querySelectorAll("input")).reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    );
  }

  _handleSubmitButton(event) {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitButton);
  }

  /**
   * remove "popup_active" class and all event listeners and reset form input fields
   */
  close() {
    super.close();
    this._form.removeEventListener("submit", this._handleSubmitButton);
    setTimeout(() => this._form.reset(), 700);
  }
}
