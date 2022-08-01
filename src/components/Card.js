export class Card {
  constructor(data, cardTemplateSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt !== undefined ? data.alt : data.name;
    this._cardId = data._id;
    this._likes = data.likes;

    this._userId = userId;
    this._ownerId = data.owner._id;

    this._cardTemplate = document.querySelector(cardTemplateSelector);
  }

  //                            General
  //
  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  //                              Likes
  //
  toggleLikeButton() {
    this._likeButton.classList.toggle("gallery-list__like-button-active");
  }

  isOwner() {
    return this._ownerId === this._userId;
  }
  setLikes(likes) {
    this._likes = likes;
    const likesCounterElement = this._cardElement.querySelector(
      "#template__like-counter"
    );
    likesCounterElement.textContent = this._likes.length;
  }

  setEventListeners(callbacks) {
    this._likeButton.addEventListener("click", () => {
      callbacks
        .handleLikeButtonClick
        // this.setLikes,
        // this.toggleLikeButton,
        // this._cardId,
        // this.isLiked
        ();
    });
    this._cardImageElement.addEventListener("click", () => {
      callbacks.handleCardImageClick();
    });
    if (this.isOwner()) {
      this._deleteCardButton.addEventListener("click", () => {
        callbacks.handleDeleteButtonClick(this /*this.removeCard*/);
      });
    }
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
      .querySelector("#template__card")
      .cloneNode(true);
    if (!this.isOwner()) {
      cardTemplate.querySelector("#template__delete-button").remove();
    }
    return cardTemplate;
  }

  getCardId() {
    return this._cardId;
  }

  /**
   * Fill up element with data{name, link, alt description}
   */
  _populateCardInfo() {
    const cardTitleElement = this._cardElement.querySelector(
      "#template__image-description"
    );
    this._cardImageElement =
      this._cardElement.querySelector("#template__image");
    cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._alt;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  /**
   * @return an card element fiiled up with data
   */

  createCard() {
    this._cardElement = this._getCardElement();
    this._populateCardInfo();

    this._likeButton = this._cardElement.querySelector(
      "#template__like-button"
    );
    this._deleteCardButton = this._cardElement.querySelector(
      "#template__delete-button"
    );
  }

  getCard() {
    return this._cardElement;
  }
}
