import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import * as constant from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../utils/api.js";

let userId;

//
//                                  Functions
//

function disableLoading() {
  constant.loadingPopup.classList.remove("popup_active");
}

Promise.all([api.getUserInfo(), api.getInitCard()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    cardRenderer.renderItems(cards);
  })
  .catch((error) => {
    renderDefaultPage();
    console.log(error);
  })
  .finally(() => {
    disableLoading();
  });

const renderDefaultPage = () => {
  userInfo.setUserInfo("Jacques Cousteau", "Explorer");
  userInfo.setUserAvatar("../images/profile_avatar.png");
};

const handleProfileEditWindow = () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());

  formValidators["profileEditForm"].resetValidation();

  popupWithFormProfile.open();
};

function handleLikeButtonClick(card) {
  card.isLiked()
    ? api
        .removeLike(card.getCardId())
        .then((res) => {
          card.setLikes(res.likes);
          card.toggleLikeButton();
        })
        .catch(console.log)
    : api
        .addLike(card.getCardId())
        .then((res) => {
          card.setLikes(res.likes);
          card.toggleLikeButton();
        })
        .catch(console.log);
}

const handleNewItemWindow = () => {
  formValidators["newGalleryItemForm"].resetValidation();
  popupWithFormImage.open();
};

const handleProfileFormSubmit = (event) => {
  popupWithFormProfile.disableSbmitBtn(true);
  event.preventDefault();
  const userInput = popupWithFormProfile.getInputValues();

  popupWithFormProfile.renderLoading(true);
  api
    .editProfile(userInput.name, userInput.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupWithFormProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
      popupWithFormProfile.disableSbmitBtn(false);
    });
};

const handleChangeAvatarSubmit = (event) => {
  popupWithAvatarForm.disableSbmitBtn(true);

  event.preventDefault();
  const userInput = popupWithAvatarForm.getInputValues();

  popupWithAvatarForm.renderLoading(true);

  api
    .editAvatar(userInput.avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupWithAvatarForm.close();
    })
    .catch(console.log)
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
      popupWithAvatarForm.disableSbmitBtn(false);
    });
};

const handleNewItemSubmit = (event) => {
  popupWithFormImage.disableSbmitBtn(true);

  event.preventDefault();
  const userInput = popupWithFormImage.getInputValues();

  popupWithFormImage.renderLoading(true);

  api
    .addCard(userInput.newItemTitle, userInput.newItemImageLink)
    .then((res) => {
      cardRenderer.addItem(res);
      popupWithFormImage.close();
    })
    .catch(console.log)
    .finally(() => {
      popupWithFormImage.renderLoading(false);
      popupWithFormImage.disableSbmitBtn(false);
    });
};

const handleDeleteButtonClick = (card) => {
  popupDeleteConfirmation.changeSubmitHandler((event) => {
    popupDeleteConfirmation.disableSbmitBtn(true);
    event.preventDefault();
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.removeCard();
        popupDeleteConfirmation.close();
      })
      .catch(console.log)
      .finally(() => {
        popupDeleteConfirmation.disableSbmitBtn(false);
      });
  });
  popupDeleteConfirmation.open();
};

const handleProfileAvatrWindow = () => {
  formValidators["changeAvatarForm"].resetValidation();
  popupWithAvatarForm.open();
};

/**
 *
 * @param {Object} cardItem object that contains name and link of new card
 * @returns an card element
 */
const renderCard = (cardItem) => {
  const card = new Card(cardItem, constant.cardTemplateSelector, userId);
  card.createCard();
  card.setLikes(cardItem.likes);
  if (card.isLiked()) {
    card.toggleLikeButton();
  }
  card.setEventListeners({
    handleLikeButtonClick: () => {
      handleLikeButtonClick(card);
    },
    handleDeleteButtonClick: () => {
      handleDeleteButtonClick(card);
    },
    handleCardImageClick: () =>
      popupWithImage.open(cardItem.link, cardItem.name, cardItem.name),
  });
  return card.getCard();
};

//
//                                  New instances
//

const formValidators = {};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(constant.formValidationConfig);

//create instance of card renderer to add card to the page
const cardRenderer = new Section(
  { renderer: renderCard },
  constant.galleryItemsListSelector
);

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

const popupDeleteConfirmation = new PopupWithForm(
  constant.popupDeleteConfirmationSelector,
  handleDeleteButtonClick
);

//Add event Listeners to buttons
constant.profileEditButton.addEventListener("click", handleProfileEditWindow);
constant.addGalleryItemButton.addEventListener("click", handleNewItemWindow);
document
  .querySelector(constant.profileAvatarSelector)
  .addEventListener("click", handleProfileAvatrWindow);
