const editProfileButton = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_place_profile");
const closeEditPopupButton = document.querySelector(".popup__close_type_edit");
const editPopupStatus = document.querySelector(".popup_place_status");
const profileNameElement = document.querySelector(".profile__name");
const profileStatusElement = document.querySelector(".profile__status");
const profileNameInput = document.querySelector(".popup__input_text_name");
const profileStatusInput = document.querySelector(".popup__input_text_status");
const formElementProfile = document.querySelector(".popup__form_place_profile");

import Card from './Card.js';










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

const closeButtons = document.querySelectorAll(".popup__close");

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

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

const popups = document.querySelectorAll(".popup");

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
  const submitButton = formElementProfile.querySelector(
    ".popup__submit-button"
  );
  submitButton.classList.add("popup__submit-button_invalid");
  submitButton.setAttribute("disabled", "disabled");
}
formElementProfile.addEventListener("submit", handleFormSubmitProfile);

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




const createElement = (item) => {
  const newCard = new Card(item)
  const getCard = newCard.getCard()
  elements.prepend(getCard);
};


initialElements.forEach(createElement);

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_place_card");

function openPopupAdd() {
  openPopup(addCardPopup);
}
addCardButton.addEventListener("click", openPopupAdd);

const formElementAdd = document.querySelector(".popup__form_place_add-element");

const handleFormSubmitElement = (event) => {
  event.preventDefault();
  const formElementAdd = event.target;
  const elementName = formElementAdd.querySelector(
    ".popup__input_card_name"
  ).value;
  const elementPhoto = formElementAdd.querySelector(
    ".popup__input_card_link"
  ).value;
  const element = {
    name: elementName,
    link: elementPhoto,
  };
  createElement(element);
  formElementAdd.reset();
  closePopup(addCardPopup);
  const submitButton = formElementAdd.querySelector(".popup__submit-button");
  submitButton.classList.add("popup__submit-button_invalid");
  submitButton.setAttribute("disabled", "disabled");
};

formElementAdd.addEventListener("submit", handleFormSubmitElement);
