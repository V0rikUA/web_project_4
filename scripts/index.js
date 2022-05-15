import { FormValidator } from "./validate.js";

export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type_error",
  submitButtonSelector: ".form__submit-button",
  fieldSelector: ".form__set",
};

const validator = new FormValidator(config);
const popupList = Array.from(document.querySelectorAll(".popup"));

//credentialss variables
const profileEditButton = document.querySelector(".profile__button-edit");
const popupCloseButtonProfile = document.querySelector(".popup__close-button-profile");
const userInputName = document.querySelector(".form__input_type_name");
const userInputProfession = document.querySelector(".form__input_type_title");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupProfile = document.querySelector(".popup_type_profile");
const formProfile = document.querySelector(".form_type_profile");

//NewItem variables
const addGalleryItemButton = document.querySelector(".profile__button-add-contetnt");
const galleryItemTemplate = document.querySelector("#gallary-list__item__template").content;
const addGalleryItemPopupCloseButton = document.querySelector(".popup__close-button-gallery-item");
const inputElementGalleryItemTitle = document.querySelector(".form__input_type_new-gallery-item-title");
const inputElementGalleryItemLink = document.querySelector(".form__input_type_new-gallery-item-img-link");
const galleryItemPopup = document.querySelector(".popup_type_new-gallery-item");
const galleryItemsList = document.querySelector(".gallery-list");
const formAddGalleryItem = document.querySelector(".form_type_new-gallery-item");
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
const previewPopup = document.querySelector(".popup_type_preview");
const previewPopupImage = document.querySelector(".popup__preview-image");
const previewPopupCloseButton = document.querySelector(".popup__close-button-preview");
const previewPopupDescription = document.querySelector(".popup__description");

const createNewGalleryItem = (item) => {
  const addedItem = galleryItemTemplate.querySelector(".gallery-list__item").cloneNode(true);
  const galleryImage = addedItem.querySelector(".gallery-list__image");
  const galleryImageDescription = addedItem.querySelector(".gallery-list__image-description");

  galleryImage.src = item.link;
  galleryImage.alt = item.alt;
  galleryImageDescription.textContent = item.name;

  const galleryItemLikebutton = addedItem.querySelector(".gallery-list__like-button");
  galleryItemLikebutton.addEventListener("click", (e) => {
    e.target.classList.toggle("gallery-list__like-button-active");
  });

  addedItem.querySelector(".gallery-list__delete-button").addEventListener("click", () => {
    addedItem.remove();
  });
  galleryImage.addEventListener("click", () => {
    previewPopupImage.src = galleryImage.src;
    previewPopupImage.alt = galleryImage.alt;
    previewPopupDescription.textContent = galleryImageDescription.textContent;

    togglePopup(previewPopup);
  });

  return addedItem;
};

const renderGalleryItem = (item) => {
  const newGalleryItem = createNewGalleryItem(item);
  galleryItemsList.prepend(newGalleryItem);
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

const renderInitiateGallery = (galleryItems) => {
  galleryItems.forEach(renderGalleryItem);
};

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

renderInitiateGallery(initialCards);

profileEditButton.addEventListener("click", openProfilePopup);
addGalleryItemButton.addEventListener("click", addNewItem);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddGalleryItem.addEventListener("submit", submitNewGalleryItem);
popupCloseButtonProfile.addEventListener("click", () => {
  togglePopup(popupProfile);
});
addGalleryItemPopupCloseButton.addEventListener("click", () => {
  togglePopup(galleryItemPopup);
});
previewPopupCloseButton.addEventListener("click", () => {
  togglePopup(previewPopup);
});

validator.enableValidation();
