export default class Popup {
  /**
   *
   * @param {string} popupSelector selector to manipulate modal window
   */
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close-button");
    this._popupActiveToggleSelector = "popup_active";

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBackgroundClickClose = this._handleBackgroundClickClose.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * add "popup_active" class to modal window tag to rise it up
   */
  open() {
    this._popupElement.classList.add(this._popupActiveToggleSelector);
    this.setEventListeners();
  }

  /**
   * remove "popup_active" class and all event listeners
   */
  close() {
    this._popupElement.classList.remove(this._popupActiveToggleSelector);
    this.removeEventListeners();
  }

  /**
   * handle close modal window when Escape is down
   */
  _handleEscClose(event) {
    const isKeyDownEsc = event.key === "Escape";
    if (isKeyDownEsc) {
      this.close();
    }
  }

  /**
   * handle close modal window when mousedown outside the modal window
   */
  _handleBackgroundClickClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * set event listeners to close button click, close on Esc down and when mousedown outside the modal window
   */
  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this.close);
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleBackgroundClickClose);
  }

  removeEventListeners() {
    document.removeEventListener(`keydown`, this._handleEscClose);
    this._popupElement.removeEventListener("mousedown", this._handleBackgroundClickClose);
  }
}
