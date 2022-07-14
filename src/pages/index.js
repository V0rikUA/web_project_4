import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import * as constant from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";

const formProfileValidationConfig = {
  formSelector: ".form_type_profile",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set-profile",
};

const formNewCardValidationConfig = {
  formSelector: ".form_type_new-gallery-item",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set-gallery",
};

const handleProfileEditWindow = () => {
  const info = userInfo.getUserInfo();
  constant.userInputName.value = info.userName;
  constant.userInputProfession.value = info.userJob;
  popupWithFormProfile.open();
};

const handleNewItemWindow = () => {
  newCardFormValidator.resetValidation();
  popupWithFormImage.open();
};

const handleProfileFormSubmit = (event, userInput) => {
  event.preventDefault();
  userInfo.setUserInfo(userInput.name, userInput.about);
  popupWithFormProfile.close();
};

const handleNewItemSubmit = (event, userInput) => {
  event.preventDefault();
  const newItem = {
    name: userInput.newItemTitle,
    link: userInput.newItemImageLink,
  };

  popupWithFormImage.close();

  cardRenderer.addItem(newItem);
};

const userInfo = new UserInfo(constant.profileNameSelector, constant.profileProfessionSelector);
const popupWithImage = new PopupWithImage(constant.previewPopupSelector);
const popupWithFormProfile = new PopupWithForm(constant.popupProfileSelector, handleProfileFormSubmit);
const popupWithFormImage = new PopupWithForm(constant.newItemPopupSelector, handleNewItemSubmit);

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
  previewPopupElement: constant.previewPopupSelector,
  handleCardImageClick: (src, name, description) => {
    popupWithImage.open(src, name, description);
  },
};

//create form validatian instances to check form input fields
const profileFormValidator = new FormValidator(formProfileValidationConfig);
const newCardFormValidator = new FormValidator(formNewCardValidationConfig);

/**
 *
 * @param {Object} cardItem object that contains name and link of new card
 * @returns an card element
 */
const renderCard = (cardItem) => {
  const card = new Card(cardItem, cardConfig);
  return card.getCard();
};

//create instance of card renderer to add card to the page
const cardRenderer = new Section({ items: constant.initialCards, renderer: renderCard }, constant.galleryItemsListSelector);
cardRenderer.renderer();

//Set event Listeners to modal windows
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormImage.setEventListeners();

//Add event Listeners to buttons
constant.profileEditButton.addEventListener("click", handleProfileEditWindow);
constant.addGalleryItemButton.addEventListener("click", handleNewItemWindow);

// Enable vlidation to forms
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
