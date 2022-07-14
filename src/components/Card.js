export class Card {
  /**
   *
   *@param {Function} config.togglePopup requieres function to be passed
   */
  constructor(card, config) {
    this._name = card.name;
    this._link = card.link;

    this._cardTemplateSelector = config.cardTemplateSelector;
    this._cardSelector = config.cardSelector;
    this._imageSelector = config.imageSelector;
    this._imageDescriptionSelector = config.imageDescriptionSelector;
    this._likeButtonSelector = config.likeButtonSelector;
    this._likeActiveSelector = config.likeActiveSelector;
    this._deleteButtonSelector = config.deleteButtonSelector;
    this._previewPopupImageSelector = config.previewPopupImageSelector;
    this._previewPopupDescriptionSelector = config.previewPopupDescriptionSelector;
    this._handleCardImageClick = config.handleCardImageClick;
    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
  }

  _getCardElement() {
    return this._cardTemplate.content.querySelector(this._cardSelector).cloneNode(true);
  }

  _populateCardInfo() {
    const cardTitleElement = this._cardElement.querySelector(this._imageDescriptionSelector);
    const cardImageElement = this._cardElement.querySelector(this._imageSelector);
    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle(this._likeActiveSelector);
  }

  _handleDeleteButtonClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(this._likeButtonSelector);
    this._likeButton.addEventListener("click", () => this._handleLikeButtonClick());

    const deleteButton = this._cardElement.querySelector(this._deleteButtonSelector);
    deleteButton.addEventListener("click", () => this._handleDeleteButtonClick());

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", () => {
      this._handleCardImageClick(this._link, this._name, this._name);
    });
  }

  /**
   * return an card element
   */

  getCard() {
    this._cardElement = this._getCardElement();
    this._populateCardInfo();
    this._setEventListeners();
    return this._cardElement;
  }
}
