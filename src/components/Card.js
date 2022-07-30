export class Card {
  /**
   *
   *@param {Function} config.togglePopup requieres function to be passed
   */
  constructor({ name, link, alt = null, _id, owner }, config) {
    this._name = name;
    this._link = link;
    this._alt = alt !== null ? alt : name;
    this._cardId = _id;

    this._isOwner = config.userId === owner._id ? true : false;

    this._cardTemplateSelector = config.cardTemplateSelector;
    this._cardSelector = config.cardSelector;
    this._imageSelector = config.imageSelector;
    this._imageDescriptionSelector = config.imageDescriptionSelector;
    this._likeButtonSelector = config.likeButtonSelector;
    this._likeActiveSelector = config.likeActiveSelector;
    this._deleteButtonSelector = config.deleteButtonSelector;
    this._previewPopupImageSelector = config.previewPopupImageSelector;
    this._previewPopupDescriptionSelector =
      config.previewPopupDescriptionSelector;
    this._handleCardImageClick = config.handleCardImageClick;
    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
    this._handleDeleteButtonClickRemote = config.handleDeleteButtonClick;
    this._handleLikeButtonRemote = config.handleLikeButtonClick;
  }

  /**
   *  Clones template element and remove delete button if card wa created not by user
   *
   * @returns card template element
   */
  _getCardElement() {
    const cardTemplate = this._cardTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    if (!this._isOwner) {
      cardTemplate.querySelector(this._deleteButtonSelector).remove();
    }
    return cardTemplate;
  }

  /**
   * Fill up element with data{name, link, alt description}
   */
  _populateCardInfo() {
    const cardTitleElement = this._cardElement.querySelector(
      this._imageDescriptionSelector
    );
    const cardImageElement = this._cardElement.querySelector(
      this._imageSelector
    );
    cardTitleElement.textContent = this._name;
    cardImageElement.src = this._link;
    cardImageElement.alt = this._alt;
  }

  _handleLikeButtonClickLocal() {
    this._likeButton.classList.toggle(this._likeActiveSelector);
  }

  _handleDeleteButtonClickLocal() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClickLocal();
      this._handleLikeButtonRemote(this._cardId);
    });

    if (this._isOwner) {
      const deleteButton = this._cardElement.querySelector(
        this._deleteButtonSelector
      );
      deleteButton.addEventListener("click", () => {
        this._handleDeleteButtonClickRemote(this._cardId);
        this._handleDeleteButtonClickLocal();
      });
    }

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", () => {
      this._handleCardImageClick(this._link, this._name, this._alt);
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
