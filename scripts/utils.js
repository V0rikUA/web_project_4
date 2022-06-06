import { validator, renderGalleryItem } from "./index.js";

const inputElementGalleryItemTitle = document.querySelector(".form__input_type_new-gallery-item-title");
const inputElementGalleryItemLink = document.querySelector(".form__input_type_new-gallery-item-img-link");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const galleryItemPopup = document.querySelector(".popup_type_new-gallery-item");
const popupProfile = document.querySelector(".popup_type_profile");
const formAddGalleryItem = document.querySelector(".form_type_new-gallery-item");
const userInputName = document.querySelector(".form__input_type_name");
const userInputProfession = document.querySelector(".form__input_type_title");

const togglePopup = (element) => {
  element.classList.toggle("popup_active");
  const popupState = element.classList.contains("popup_active");

  togglePopupCloseElementsEventListeners(popupState, element);
};

const openProfilePopup = () => {
  fillProfileForm();
  togglePopup(popupProfile);
};

const fillProfileForm = () => {
  userInputName.value = profileName.textContent;
  userInputProfession.value = profileProfession.textContent;
};

const addNewItem = (event) => {
  event.preventDefault();
  resetFormAddGalleryItem();
  togglePopup(galleryItemPopup);
};

const resetFormAddGalleryItem = () => {
  formAddGalleryItem.reset();
  validator.resetValidation(formAddGalleryItem);
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileProfession.textContent = userInputProfession.value;
  togglePopup(popupProfile);
};

const togglePopupCloseElementsEventListeners = (popupState, popupElement) => {
  if (popupState) {
    document.addEventListener(`keydown`, closePopupByEscape);
    popupElement.addEventListener("mousedown", closeByClickBackground);
  } else {
    document.removeEventListener(`keydown`, closePopupByEscape);
    popupElement.removeEventListener("mousedown", closeByClickBackground);
  }
};

const closeByClickBackground = (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(event.target);
  }
};

const closePopupByEscape = (event) => {
  const isKeyDownEsc = event.key === "Escape";
  if (isKeyDownEsc) {
    const activePopup = document.querySelector(".popup_active");
    togglePopup(activePopup);
  }
};

const submitNewGalleryItem = (event) => {
  event.preventDefault();
  const addedItem = {
    name: inputElementGalleryItemTitle.value,
    link: inputElementGalleryItemLink.value,
  };
  togglePopup(galleryItemPopup);

  resetFormAddGalleryItem();

  renderGalleryItem(addedItem);
};

export {
  togglePopup,
  openProfilePopup,
  addNewItem,
  handleProfileFormSubmit,
  submitNewGalleryItem,
  galleryItemPopup,
  popupProfile,
  formAddGalleryItem,
};
