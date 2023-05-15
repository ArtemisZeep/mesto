const editProfileButton = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_place_profile");
const closeEditPopupButton = document.querySelector(".popup__close_type_edit");
const editPopupStatus = document.querySelector(".popup_place_status");
const profileNameElement = document.querySelector(".profile__name");
const profileStatusElement = document.querySelector(".profile__status");
const profileNameInput = document.querySelector(".popup__input_text_name");
const profileStatusInput = document.querySelector(".popup__input_text_status");
const formElementProfile = document.querySelector(".popup__form_place_profile");

import {FormValidator} from './FormValidator.js'
import {data} from './FormValidator.js'










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

function closePopup (popup) {
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


const formProfileEdit = document.querySelector(".popup__form_place_profile");
let formProfileEditValidation = new FormValidator(data, formProfileEdit)
const disableEditProfileButton = formProfileEditValidation.disableButton

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  closePopup(editPopupStatus)
  disableEditProfileButton()
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






const formElementAdd = document.querySelector(".popup__form_place_add-element");
let formElementAddValidation = new FormValidator(data, formElementAdd)
const disableAddButton = formElementAddValidation.disableButton

const handleFormSubmitElement = (event) => {
  event.preventDefault();
  let elementName = formElementAdd.querySelector(
    ".popup__input_card_name"
  ).value;
  let elementPhoto = formElementAdd.querySelector(
    ".popup__input_card_link"
  ).value;
  let element = {
    name: elementName,
    link: elementPhoto,
  };
  createCard(element);
  insertCard(element)
  formElementAdd.reset();
  closePopup(addCardPopup);
  
  disableAddButton()


};

formElementAdd.addEventListener("submit", handleFormSubmitElement);





import Card from './Card.js';





const createCard = (item, handleCardClick) => {
  const containerSelector = document.querySelector('#elementTemplate').content
  function handleCardClick(name, link) {
    const popupPhotoBlock = document.querySelector(".popup-photo");
    const popupPhoto = document.querySelector(".popup-photo__photo");
    const popupName = document.querySelector(".popup-photo__name");
    popupPhoto.setAttribute("src", link);
    popupPhoto.setAttribute("alt", name);
    popupName.textContent = name
    openPopup(popupPhotoBlock);
  }
  const newCard = new Card(item, handleCardClick, containerSelector)
  const getCard = newCard.getCard()
return getCard
  
  
};
function insertCard (item, handleCardClick){
 const insertCard = createCard(item, handleCardClick)
  elements.prepend(insertCard);
}


initialElements.forEach(createCard);
initialElements.forEach(insertCard);



const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_place_card");

function openPopupAdd() {
  openPopup(addCardPopup);
}
addCardButton.addEventListener("click", openPopupAdd);



