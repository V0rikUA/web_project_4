import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import * as utils from "./utils.js";

export const formValidationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set",
};

export const validator = new FormValidator(formValidationConfig);

//credentialss variables
const profileEditButton = document.querySelector(".profile__button-edit");
const popupCloseButtonProfile = document.querySelector(".popup__close-button-profile");
const formProfile = document.querySelector(".form_type_profile");

//NewItem variables
const addGalleryItemButton = document.querySelector(".profile__button-add-contetnt");
const addGalleryItemPopupCloseButton = document.querySelector(".popup__close-button-gallery-item");
const galleryItemsList = document.querySelector(".gallery-list");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt: "the view of the river surrounded by trees in front of mountains",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt: "the view of lake between two mountains",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt: "the view of sunset upon the mountains",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt: "the view of mountains at night under the bright stars",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt: "lake view in the mountains",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt: "the view of the boats at mountain lake near the pier",
  },
];

//Prewiev variables
const previewPopupElement = document.querySelector(".popup_type_preview");
const previewPopupCloseButton = document.querySelector(".popup__close-button-preview");

const cardConfig = {
  cardTemplateSelector: "#gallary-list__item__template",
  cardSelector: ".gallery-list__item",
  imageSelector: ".gallery-list__image",
  imageDescriptionSelector: ".gallery-list__image-description",
  likeActiveSelector: "gallery-list__like-button-active",
  likeButtonSelector: ".gallery-list__like-button",
  deleteButtonSelector: ".gallery-list__delete-button",
  previewPopupImageSelector: ".popup__preview-image",
  previewPopupDescriptionSelector: ".popup__description",
  previewPopupElement: previewPopupElement,
  togglePopup: utils.togglePopup,
};

function createCard(card) {
  const newCard = new Card(card, cardConfig);
  return newCard.getCard();
}

export const renderGalleryItem = (card) => {
  galleryItemsList.prepend(createCard(card));
};

const renderInitiateGallery = (galleryItems) => {
  galleryItems.forEach(renderGalleryItem);
};

renderInitiateGallery(initialCards);

profileEditButton.addEventListener("click", utils.openProfilePopup);
addGalleryItemButton.addEventListener("click", utils.addNewItem);
formProfile.addEventListener("submit", utils.handleProfileFormSubmit);
utils.formAddGalleryItem.addEventListener("submit", utils.submitNewGalleryItem);
popupCloseButtonProfile.addEventListener("click", () => {
  utils.togglePopup(utils.popupProfile);
});
addGalleryItemPopupCloseButton.addEventListener("click", () => {
  utils.togglePopup(utils.galleryItemPopup);
});
previewPopupCloseButton.addEventListener("click", () => {
  utils.togglePopup(previewPopupElement);
});

validator.enableValidation();
