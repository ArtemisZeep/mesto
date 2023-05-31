import  {FormValidator}  from '../components/FormValidator.js';
import { data } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';



const editProfileButton = document.querySelector(".profile__edit-button");
const editPopupStatus = document.querySelector(".popup_place_status");
const profileNameElement = document.querySelector(".profile__name");
const profileStatusElement = document.querySelector(".profile__status");
const profileNameInput = document.querySelector(".popup__input_text_name");
const profileStatusInput = document.querySelector(".popup__input_text_status");
const formElementProfile = document.querySelector(".popup__form_place_profile");
const formElementAdd = document.querySelector(".popup__form_place_add-element");
const containerElementAdd = document.querySelector(".popup_place_card")
const closeButtons = document.querySelectorAll(".popup__close");

const formAddCardValidation = new FormValidator(data, formElementAdd);
const enableAddCarValidation = formAddCardValidation.enableValidation;
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
const containerSelector = document.querySelector("#elementTemplate").content;
const containerSelectorElement = document.querySelector("#elementTemplate");
const addCardButton = document.querySelector(".profile__add-button");


const popupZoomPhoto = new PopupWithImage(popupPhotoBlock);
popupZoomPhoto.setEventListeners();
const handleCardClick = function (name, link) {
  popupZoomPhoto.open(name, link);
}

const renderCard = function (item) {
  const renderCard = new Card(item, handleCardClick, containerSelectorElement);
  return renderCard.getCard();
}

const renderInitialCards = new Section({items: initialElements,
   renderer: (item) => {
    renderInitialCards.addItem(renderCard(item));}
},
elements);

renderInitialCards.renderItems();



const popupAddCard = new PopupWithForm(containerElementAdd, {
  callbackFormSubmit: (formValues) => {
    renderInitialCards.addItem(renderCard({
      name: formValues["card-name"],
      link: formValues["card-link"]
    }));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners()

function openPopupAdd() {
  popupAddCard.open()
}
addCardButton.addEventListener("click", openPopupAdd);





const userInfo = new UserInfo({profileNameElement, profileStatusElement});

const popupEditProfile = new PopupWithForm(editPopupStatus, {
  callbackFormSubmit: (formValues) => {
    userInfo.setUserInfo(formValues);

    popupEditProfile.close();
    disableEditProfileButton();
  }
});
popupEditProfile.setEventListeners();

const openEditPopup = () => {
  popupEditProfile.open();
  const actualUserInfo = userInfo.getUserInfo();
  profileNameInput.value = actualUserInfo.profileName;
  profileStatusInput.value = actualUserInfo.profileStatus;
}
editProfileButton.addEventListener('click', openEditPopup);

