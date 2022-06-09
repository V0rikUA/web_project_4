import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import * as utils from "./utils.js";
import * as constant from "./constants.js";

export const formProfileValidationConfig = {
  formSelector: ".form_type_profile",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set-profile",
};

export const formNewCardValidationConfig = {
  formSelector: ".form_type_new-gallery-item",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set-gallery",
};

const profileFormValidator = new FormValidator(formProfileValidationConfig);
const newCardFormValidator = new FormValidator(formNewCardValidationConfig);

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
  previewPopupElement: constant.previewPopupElement,
  togglePopup: utils.togglePopup,
};

function createCard(card) {
  const newCard = new Card(card, cardConfig);
  return newCard.getCard();
}
export const fillProfileForm = () => {
  constant.userInputName.value = constant.profileName.textContent;
  constant.userInputProfession.value = constant.profileProfession.textContent;
};

const addNewItem = (event) => {
  event.preventDefault();
  resetFormAddGalleryItem();
  utils.togglePopup(constant.galleryItemPopup);
};

const resetFormAddGalleryItem = () => {
  constant.formAddGalleryItem.reset();
  newCardFormValidator.resetValidation(constant.formAddGalleryItem);
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  constant.profileName.textContent = constant.userInputName.value;
  constant.profileProfession.textContent = constant.userInputProfession.value;
  utils.togglePopup(constant.popupProfile);
};

const submitNewGalleryItem = (event) => {
  event.preventDefault();
  const addedItem = {
    name: constant.inputElementGalleryItemTitle.value,
    link: constant.inputElementGalleryItemLink.value,
  };
  utils.togglePopup(constant.galleryItemPopup);

  resetFormAddGalleryItem();

  renderGalleryItem(addedItem);
};

const renderGalleryItem = (card) => {
  constant.galleryItemsList.prepend(createCard(card));
};

const renderInitiateGallery = (galleryItems) => {
  galleryItems.forEach(renderGalleryItem);
};

renderInitiateGallery(constant.initialCards);

constant.profileEditButton.addEventListener("click", utils.openProfilePopup);
constant.addGalleryItemButton.addEventListener("click", addNewItem);
constant.formProfile.addEventListener("submit", handleProfileFormSubmit);
constant.formAddGalleryItem.addEventListener("submit", submitNewGalleryItem);
constant.popupCloseButtonProfile.addEventListener("click", () => {
  utils.togglePopup(constant.popupProfile);
});
constant.addGalleryItemPopupCloseButton.addEventListener("click", () => {
  utils.togglePopup(constant.galleryItemPopup);
});
constant.previewPopupCloseButton.addEventListener("click", () => {
  utils.togglePopup(constant.previewPopupElement);
});

//Enable validation for profile and new card fildsets
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
