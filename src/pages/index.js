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
    alert(error);
  })
  .finally(() => {
    disableLoading();
  });

const renderDefaultPage = () => {
  userInfo.setUserInfo("Jacques Cousteau", "Explorer");
  userInfo.setUserAvatar("../images/profile_avatar.png");
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
  newCardFormValidator.resetValidation();
  popupWithFormImage.open();
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  const userInput = popupWithFormProfile.getInputValues();

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

const handleChangeAvatarSubmit = (event) => {
  event.preventDefault();
  const userInput = popupWithAvatarForm.getInputValues();
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

const handleNewItemSubmit = (event) => {
  event.preventDefault();
  const userInput = popupWithFormImage.getInputValues();
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

const handleDeleteButtonClick = (card) => {
  popupDeleteConfirmation.changeSubmitHandler((event) => {
    event.preventDefault();
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.removeCard();
      })
      .catch(console.log)
      .finally(() => {
        popupDeleteConfirmation.close();
      });
  });
  popupDeleteConfirmation.open();
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

//
//
//                        Enable vlidation to forms
//
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
pofileAvatarFormValidation.enableValidation();
