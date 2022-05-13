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
const newItemButton = document.querySelector(".profile__button-add-contetnt");
const subminNewItemButton = document.querySelector(".form__submit-button_new-gallery-item");
const galleryItemTemplate = document.querySelector("#gallary-list__item__template").content;
const popupCloseButtonNewItem = document.querySelector(".popup__close-button-gallery-item");
const galleryNewItemTitle = document.querySelector(".form__input_type_new-gallery-item-title");
const galleryNewItemLink = document.querySelector(".form__input_type_new-gallery-item-img-link");
const popupNewItem = document.querySelector(".popup_type_new-gallery-item");
const galleryList = document.querySelector(".gallery-list");
const deleteButton = document.querySelector(".gallery-list__delete-button");
const likeButton = document.querySelector(".gallery-list__like-button");
const formNewItem = document.querySelector(".form_type_new-gallery-item");
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

function createNewGalleryItem(item) {
  const newItem = galleryItemTemplate.querySelector(".gallery-list__item").cloneNode(true);
  const galleryImage = newItem.querySelector(".gallery-list__image");
  const galleryImageDescription = newItem.querySelector(".gallery-list__image-description");

  galleryImage.src = item.link;
  galleryImage.alt = item.alt;
  galleryImageDescription.textContent = item.name;

  newItem.querySelector(".gallery-list__like-button").addEventListener("click", (e) => {
    e.target.classList.toggle("gallery-list__like-button-active");
  });

  newItem.querySelector(".gallery-list__delete-button").addEventListener("click", () => {
    newItem.remove();
  });
  galleryImage.addEventListener("click", () => {
    previewPopupImage.src = galleryImage.src;
    previewPopupImage.alt = galleryImage.alt;
    previewPopupDescription.textContent = galleryImageDescription.textContent;

    togglePopup(previewPopup);
  });

  return newItem;
}

function prependNewItem(item) {
  const newGalleryItem = createNewGalleryItem(item);
  galleryList.prepend(newGalleryItem);
}

function submitNewGalleryItem(event) {
  event.preventDefault();
  const newItem = {
    name: galleryNewItemTitle.value,
    link: galleryNewItemLink.value,
  };
  togglePopup(popupNewItem);

  galleryNewItemTitle.value = "";
  galleryNewItemLink.value = "";

  prependNewItem(newItem);
}

function renderInitiateGallery(galleryItems) {
  initialCards.forEach((item) => {
    prependNewItem(item);
  });
}

function togglePopup(element) {
  element.classList.toggle("popup_active");
}

function openProfilePopup() {
  userInputName.value = profileName.textContent;
  userInputProfession.value = profileProfession.textContent;
  togglePopup(popupProfile);
}

function addNewItem(event) {
  event.preventDefault();
  validator.resetValidation(formNewItem);
  togglePopup(popupNewItem);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileProfession.textContent = userInputProfession.value;
  togglePopup(popupProfile);
}

const closeByClickBackground = (event) => {
  const isClosest = event.target.closest(".popup__window");

  popupList.forEach((popupElement) => {
    if (!isClosest && popupElement.classList.contains("popup_active")) {
      togglePopup(popupElement);
    }
  });
};

const togglePopupEventHandler = (event) => {
  const isKeyDownEsc = event.key === "Escape";
  if (isKeyDownEsc) {
    const activePopup = document.querySelector(".popup_active");
    togglePopup(activePopup);
  }
};

renderInitiateGallery(initialCards);
profileEditButton.addEventListener("click", openProfilePopup);
newItemButton.addEventListener("click", addNewItem);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formNewItem.addEventListener("submit", submitNewGalleryItem);
popupCloseButtonProfile.addEventListener("click", () => {
  togglePopup(popupProfile);
});
popupCloseButtonNewItem.addEventListener("click", () => {
  togglePopup(popupNewItem);
});
previewPopupCloseButton.addEventListener("click", () => {
  togglePopup(previewPopup);
});
document.addEventListener(`keydown`, togglePopupEventHandler);
popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", closeByClickBackground);
});

validator.enableValidation();
