//credentialss variables
const profileEditButton = document.querySelector(".profile__button-edit");
const popupCloseButtonProfile = document.querySelector(".popup__close-button-profile");
const userInputName = document.querySelector(".form__input_type_name");
const userInputProfession = document.querySelector(".form__input_type_title");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const submitButton = document.querySelector(".form__submit-button");
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
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//Prewiev variables
const previewPopup = document.querySelector(".popup_type_preview");
const previewPopupImage = document.querySelector(".popup__preview-image");
const previewPopupCloseButton = document.querySelector(".popup__close-button-preview");
const previewPopupDescription = document.querySelector(".popup__description");

function newGalleryItem(item) {
  const newItem = galleryItemTemplate.querySelector(".gallery-list__item").cloneNode(true);

  newItem.querySelector(".gallery-list__image-description").textContent = item.name;

  newItem.querySelector(".gallery-list__image").src = item.link;

  newItem.querySelector(".gallery-list__like-button").addEventListener("click", (e) => {
    e.target.classList.toggle("gallery-list__like-button-active");
  });

  newItem.querySelector(".gallery-list__delete-button").addEventListener("click", () => {
    newItem.remove();
  });

  const galleryImage = newItem.querySelector(".gallery-list__image");
  const galleryImageDescription = newItem.querySelector(".gallery-list__image-description");
  galleryImage.alt = galleryImageDescription.textContent;
  galleryImage.addEventListener("click", handleImageClick);

  galleryList.prepend(newItem);
}

function handleImageClick(event) {
  previewPopupImage.src = event.target.src;
  previewPopupDescription.textContent = event.target.alt;
  risePopup(previewPopup);
}

function submitNewGalleryItem(event) {
  event.preventDefault();
  const newItem = {
    name: galleryNewItemTitle.value,
    link: galleryNewItemLink.value,
  };
  risePopup(popupNewItem);
  newGalleryItem(newItem);
}

function renderInitiateGallery(galleryItems) {
  initialCards.forEach((item) => {
    newGalleryItem(item);
  });
}

function risePopup(element) {
  element.classList.toggle("popup_active");
}

function editProfileButtonHandler() {
  userInputName.value = profileName.textContent;
  userInputProfession.value = profileProfession.textContent;
  risePopup(popupProfile);
}

function addNewItem(event) {
  event.preventDefault();
  galleryNewItemTitle.textContent = "";
  galleryNewItemLink.textContent = "";
  risePopup(popupNewItem);
}

function submitProfileButtonHandler(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileProfession.textContent = userInputProfession.value;
  risePopup(popupProfile);
}

renderInitiateGallery(initialCards);
profileEditButton.addEventListener("click", editProfileButtonHandler);
newItemButton.addEventListener("click", addNewItem);
formProfile.addEventListener("submit", submitProfileButtonHandler);
formNewItem.addEventListener("submit", submitNewGalleryItem);
popupCloseButtonProfile.addEventListener("click", () => {
  risePopup(popupProfile);
});
popupCloseButtonNewItem.addEventListener("click", () => {
  risePopup(popupNewItem);
});
previewPopupCloseButton.addEventListener("click", () => {
  risePopup(previewPopup);
});
