const editProfileButton = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_place_profile");
const closeEditPopupButton = document.querySelector(".popup__close_type_edit");
const editPopupStatus = document.querySelector(".popup_place_status");
const profileNameElement = document.querySelector(".profile__name");
const profileStatusElement = document.querySelector(".profile__status");
const profileNameInput = document.querySelector(".popup__input_text_name");
const profileStatusInput = document.querySelector(".popup__input_text_status");
const formElementProfile = document.querySelector(".popup__form_place_profile");
const formElementAdd = document.querySelector(".popup__form_place_add-element");
const elementName = formElementAdd.querySelector(".popup__input_card_name");
const elementPhoto = formElementAdd.querySelector(".popup__input_card_link");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");

const formAddCardValidation = new FormValidator(data, formElementAdd);
const enableAddCarValidation = formAddCardValidation.enableValidation;
const disableAddCardButton = formAddCardValidation.disableButton;
enableAddCarValidation();

const formProfileEditValidation = new FormValidator(data, formElementProfile);
const disableEditProfileButton = formProfileEditValidation.disableButton;
const enableEditProfileValidation = formProfileEditValidation.enableValidation;
enableEditProfileValidation();

const initialElements = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elements = document.querySelector(".elements");
const popupPhotoBlock = document.querySelector(".popup-photo");
const popupPhoto = document.querySelector(".popup-photo__photo");
const popupName = document.querySelector(".popup-photo__name");
const containerSelector = document.querySelector("#elementTemplate").content;
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_place_card");

import { FormValidator } from "./FormValidator.js";
import { data } from "./FormValidator.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function openPopupEdit() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  openPopup(editPopupStatus);
}

editProfileButton.addEventListener("click", openPopupEdit);

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeByEscape);
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  closePopup(editPopupStatus);
  disableEditProfileButton();
}
formElementProfile.addEventListener("submit", handleFormSubmitProfile);

const handleFormSubmitElement = (event) => {
  event.preventDefault();

  const element = {
    name: elementName.value,
    link: elementPhoto.value,
  };
  // Значение (Value) каждый раз перезаписывается, если мы вынесем за функцию, то ничего работать не будет

  createCard(element);
  insertCard(element);
  formElementAdd.reset();
  closePopup(addCardPopup);

  disableAddCardButton();
};

formElementAdd.addEventListener("submit", handleFormSubmitElement);

import Card from "./Card.js";

const createCard = (item, handleCardClick) => {
  function handleCardClick(name, link) {
    popupPhoto.setAttribute("src", link);
    popupPhoto.setAttribute("alt", name);
    popupName.textContent = name;
    openPopup(popupPhotoBlock);
  }
  const newCard = new Card(item, handleCardClick, containerSelector);
  const getCard = newCard.getCard();
  return getCard;
};
function insertCard(item, handleCardClick) {
  const insertCard = createCard(item, handleCardClick);
  elements.prepend(insertCard);
}

initialElements.forEach(createCard);
initialElements.forEach(insertCard);

function openPopupAdd() {
  openPopup(addCardPopup);
}
addCardButton.addEventListener("click", openPopupAdd);
