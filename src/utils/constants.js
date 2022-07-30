//credentialss variables
export const profileEditButton = document.querySelector(
  ".profile__button-edit"
); //
export const profileNameSelector = ".profile__name"; //
export const profileProfessionSelector = ".profile__profession"; //
export const profileAvatarSelector = ".profile__avatar";
export const popupAvatarChangeSelector = ".popup_type_change-avatar";
export const popupProfileSelector = ".popup_type_profile"; //
export const userInputName = document.querySelector(".form__input_type_name"); //
export const userInputProfession = document.querySelector(
  ".form__input_type_title"
); //
export const newItemFormSelector = ".form_type_new-gallery-item";
export const profileFormSelector = ".form_type_profile";
export const avatarFormSelector = ".form_type_change-avatar";

//NewCard variables
export const addGalleryItemButton = document.querySelector(
  ".profile__button-add-contetnt"
); //
export const galleryItemsListSelector = ".gallery-list"; //
export const newItemPopupSelector = ".popup_type_new-gallery-item"; //
export const formAddGalleryItem = document.querySelector(
  ".form_type_new-gallery-item"
);

export const initialCards = [
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

//Prewiev variable
export const previewPopupSelector = ".popup_type_preview";

//loading animation
export const loadingPopup = document.querySelector(".popup__loading");

//configs
export const formValidationConfig = {
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set",
};
