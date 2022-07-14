import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   *
   * @param {String} popupSelector  selector to manipulate modal window
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._previewPopupImage = document.querySelector(".popup__preview-image");
    this._previewPopupDescription = document.querySelector(".popup__description");
  }

  /**
   *
   * open modal window and fill field with provided strings
   *
   * @param {String} src link to image to display
   * @param {String} name name of the image
   * @param {String} description description to the image
   */
  open(src, name, description) {
    this._previewPopupImage.src = src;
    this._previewPopupImage.alt = name;
    this._previewPopupDescription.textContent = description;
    super.open();
  }
}
