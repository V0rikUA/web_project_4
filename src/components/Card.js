export class Card {
  /**
   *
   *
   */
  constructor({ name, link, alt = null, _id, owner, likes }, config) {
    this._name = name;
    this._link = link;
    this._alt = alt !== null ? alt : name;
    this._cardId = _id;
    this._likes = likes;

    this._userId = config.userId;
    this._cardOwnerId = owner._id;

    this._cardTemplateSelector = config.cardTemplateSelector;
    this._cardSelector = config.cardSelector;
    this._imageSelector = config.imageSelector;
    this._imageDescriptionSelector = config.imageDescriptionSelector;
    this._likeButtonSelector = config.likeButtonSelector;
    this._likeActiveSelector = config.likeActiveSelector;
    this._likeCounterSelector = config.likeCounterSelector;
    this._deleteButtonSelector = config.deleteButtonSelector;
    this._previewPopupImageSelector = config.previewPopupImageSelector;
    this._previewPopupDescriptionSelector =
      config.previewPopupDescriptionSelector;
    this._handleCardImageClick = config.handleCardImageClick;
    this._cardTemplate = document.querySelector(this._cardTemplateSelector);
    this._handleDeleteServerRequest = config.handleDeleteServerRequest;
    this._handleLikeServerRequest = config.handleLikeServerRequest;
    this._handleDleteClick = config.handleDleteClick;
    this._popupDeleteButtonElement = document.querySelector(
      config.popupDeleteConfirmationButtonSelector
    );
    this._handleDeleteConfirmationSubmit =
      config.handleDeleteConfirmationSubmit;
  }

  //                                Like Handler
  //

  _initiateLikes() {
    this.setLikes(this._likes);
    if (this.isLiked()) {
      this._toggleLikeButton();
    }
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  _toggleLikeButton() {
    this._likeButton.classList.toggle(this._likeActiveSelector);
  }

  setLikes(likes) {
    this._likes = likes;
    const likeCounterElemnt = this._cardElement.querySelector(
      this._likeCounterSelector
    );
    likeCounterElemnt.textContent = this._likes.length;
  }

  getCardId() {
    return this._cardId;
  }

  _handleLikeButtonClick() {
    this._handleLikeServerRequest(this);
    this._toggleLikeButton();
  }

  //                                Delete handler
  //
  _handleDeleteButtonClick() {
    this._handleDleteClick();
    this._popupDeleteButtonElement.addEventListener("click", () => {
      this._handleConfirmedDeleteClick();
    });
  }
  _handleConfirmedDeleteClick() {
    this._removeCardLocal();
    this._handleDeleteServerRequest(this._cardId);
    this._handleDeleteConfirmationSubmit();
  }

  _removeCardLocal() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _isOwner(id) {
    return this._userId === id ? true : false;
  }

  //                                  Events
  //
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    if (this._isOwner(this._cardOwnerId)) {
      const deleteButton = this._cardElement.querySelector(
        this._deleteButtonSelector
      );
      deleteButton.addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    }

    const image = this._cardElement.querySelector(this._imageSelector);
    image.addEventListener("click", () => {
      this._handleCardImageClick(this._link, this._name, this._alt);
    });
  }

  //                            Card Element
  //
  /**
   *  Clones template element and remove delete button if card wa created not by user
   *
   * @returns card template element
   */
  _getCardElement() {
    const cardTemplate = this._cardTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    if (!this._isOwner(this._cardOwnerId)) {
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

  /**
   * @return an card element fiiled up with data
   */
  getCard() {
    this._cardElement = this._getCardElement();
    this._populateCardInfo();
    this._setEventListeners();
    this._initiateLikes();
    return this._cardElement;
  }
}
