//import { fillProfileForm } from "./index.js";
import * as constant from "./constants.js";

const togglePopup = (element) => {
  element.classList.toggle("popup_active");
  const popupState = element.classList.contains("popup_active");

  togglePopupCloseElementsEventListeners(popupState, element);
};

const openProfilePopup = () => {
  fillProfileForm();
  togglePopup(constant.popupProfileSelector);
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

export { togglePopup, openProfilePopup };
