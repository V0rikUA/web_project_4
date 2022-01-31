let profileEditButton = document.querySelector(".profile__button-edit");
let popupCloseButton = document.querySelector(".popup__close-button");
let userInputName = document.querySelector(".form__input_type_name");
let userInputProfession = document.querySelector(".form__input_type_title");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let submitButton = document.querySelector(".form__submit-button");
let popup = document.querySelector(".popup");
let form = document.querySelector(".form");

function risePopup() {
  popup.classList.toggle("popup_active");
}

function editProfileButtonHandler() {
  userInputName.value = profileName.textContent;
  userInputProfession.value = profileProfession.textContent;
  risePopup();
}

function submitProfileButtonHandler(event) {
  event.preventDefault();
  profileName.textContent = userInputName.value;
  profileProfession.textContent = userInputProfession.value;
  risePopup();
}

profileEditButton.addEventListener("click", editProfileButtonHandler);
form.addEventListener("submit", submitProfileButtonHandler);
popupCloseButton.addEventListener("click", risePopup);
