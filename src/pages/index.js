import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import * as constant from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../utils/api.js";
import Popup from "../components/Popup";

//
//                                  Variables
//

const cardConfig = {
  cardTemplateSelector: "#gallary-list__item__template",
  cardSelector: ".gallery-list__item",
  imageSelector: ".gallery-list__image",
  imageDescriptionSelector: ".gallery-list__image-description",
  likeActiveSelector: "gallery-list__like-button-active",
  likeButtonSelector: ".gallery-list__like-container_button",
  likeCounterSelector: ".gallery-list__like-container_counter",
  deleteButtonSelector: ".gallery-list__delete-button",
  previewPopupImageSelector: ".popup__preview-image",
  previewPopupDescriptionSelector: ".popup__description",
  popupDeleteConfirmationButtonSelector: ".popup__delete-card-button",
  previewPopupElement: constant.previewPopupSelector,
  handleCardImageClick: (src, name, description) => {
    popupWithImage.open(src, name, description);
  },
  handleDeleteServerRequest: (cardId) => {
    handleDeleteServerRequest(cardId);
  },
  handleLikeServerRequest: (card) => {
    handleLikeServerRequest(card);
  },
  handleDleteClick: () => {
    popupDeleteConfirmation.open();
  },
  handleDeleteConfirmationSubmit: () => {
    popupDeleteConfirmation.close();
  },
};

//
//                                  Functions
//

function disableLoading() {
  constant.loadingPopup.classList.remove("popup_active");
}

Promise.all([api.getUserInfo(), api.getInitCard()])
  .then(([userData, cards]) => {
    cardConfig.userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    cardRenderer.renderItems(cards);
  })
  .catch((error) => {
    renderDefaultPage();
    alert(error);
  })
  .finally(() => {
    disableLoading();
  });

const renderDefaultPage = () => {
  userInfo.setUserInfo("Jacques Cousteau", "Explorer");
  userInfo.setUserAvatar("../images/profile_avatar.png");
  cardRenderer.renderItems(constant.initialCards);
};

const fillProfileInfo = (info) => {
  constant.userInputName.value = info.userName;
  constant.userInputProfession.value = info.userJob;
};

const handleProfileEditWindow = () => {
  const info = userInfo.getUserInfo();
  fillProfileInfo(info);

  profileFormValidator.resetValidation();
  popupWithFormProfile.open();
};

const handleDeleteServerRequest = (cardId) => {
  api.deleteCard(cardId).catch(console.log);
};

function handleLikeServerRequest(card) {
  card.isLiked()
    ? api
        .removeLike(card.getCardId())
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch(console.log)
    : api
        .addLike(card.getCardId())
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch(console.log);
}

const handleNewItemWindow = () => {
  newCardFormValidator.resetValidation();
  popupWithFormImage.open();
};

const handleProfileFormSubmit = (userInput) => {
  const submitButtonProfile = document.querySelector(
    ".form__submit-button_profile"
  );

  submitButtonProfile.textContent = "Saving...";

  api
    .editProfile(userInput.name, userInput.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      submitButtonProfile.textContent = "Save";
      popupWithFormProfile.close();
    });
};

const handleChangeAvatarSubmit = (userInput) => {
  const submitButtonAvatar = document.querySelector(
    ".form__submit-button_change-avatar"
  );

  submitButtonAvatar.textContent = "Saving...";
  api
    .editAvatar(userInput.avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch((error) => new Error(error))
    .finally(() => {
      popupWithAvatarForm.close();
      submitButtonAvatar.textContent = "Change";
    });
};

const handleNewItemSubmit = (userInput) => {
  const newItemSubmitButton = document.querySelector(
    ".form__submit-button_new-gallery-item"
  );

  newItemSubmitButton.textContent = "Saving...";

  api
    .addCard(userInput.newItemTitle, userInput.newItemImageLink)
    .then((res) => {
      cardRenderer.addItem(res);
    })
    .catch(console.log)
    .finally(() => {
      popupWithFormImage.close();
      newItemSubmitButton.textContent = "Create";
    });
};

const handleProfileAvatrWindow = () => {
  pofileAvatarFormValidation.resetValidation();
  popupWithAvatarForm.open();
};

/**
 *
 * @param {Object} cardItem object that contains name and link of new card
 * @returns an card element
 */
const renderCard = (cardItem) => {
  const card = new Card(cardItem, cardConfig);
  return card.getCard();
};

//
//                                  New instances
//

const userInfo = new UserInfo(
  constant.profileNameSelector,
  constant.profileProfessionSelector,
  constant.profileAvatarSelector
);
const popupWithImage = new PopupWithImage(constant.previewPopupSelector);
const popupWithFormProfile = new PopupWithForm(
  constant.popupProfileSelector,
  handleProfileFormSubmit
);
const popupWithFormImage = new PopupWithForm(
  constant.newItemPopupSelector,
  handleNewItemSubmit
);
const popupWithAvatarForm = new PopupWithForm(
  constant.popupAvatarChangeSelector,
  handleChangeAvatarSubmit
);

const popupDeleteConfirmation = new Popup(
  constant.popupDeleteConfirmationSelector
);

//create form validatian instances to check form input fields
const profileFormValidator = new FormValidator(
  constant.profileFormSelector,
  constant.formValidationConfig
);
const newCardFormValidator = new FormValidator(
  constant.newItemFormSelector,
  constant.formValidationConfig
);
const pofileAvatarFormValidation = new FormValidator(
  constant.avatarFormSelector,
  constant.formValidationConfig
);

//create instance of card renderer to add card to the page
const cardRenderer = new Section(
  { renderer: renderCard },
  constant.galleryItemsListSelector
);

//Add event Listeners to buttons
constant.profileEditButton.addEventListener("click", handleProfileEditWindow);
constant.addGalleryItemButton.addEventListener("click", handleNewItemWindow);
document
  .querySelector(constant.profileAvatarSelector)
  .addEventListener("click", handleProfileAvatrWindow);

//
//
//                        Enable vlidation to forms
//
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
pofileAvatarFormValidation.enableValidation();
