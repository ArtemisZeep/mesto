const editProfileButton = document.querySelector('.profile__edit-button');
const editPopupProfile = document.querySelector('.popup_place_profile');
const closeEditPopupButton = document.querySelector('.popup__close_type_edit');
const editPopupStatus = document.querySelector('.popup_place_status');
const profileNameElement = document.querySelector('.profile__name');
const profileStatusElement = document.querySelector('.profile__status');
const profileNameInput = document.querySelector('.popup__input_text_name');
const profileStatusInput = document.querySelector('.popup__input_text_status');
const formElementProfile = document.querySelector('.popup__form_place_profile');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit () {
  openPopup(editPopupStatus);
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
}

editProfileButton.addEventListener('click', openPopupEdit);

const closeButtons = document.querySelectorAll('.popup__close');

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  closePopup(editPopupStatus);
}
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');

const handleDeleteButtonClick = (event) => {
  const button = event.target;
  const element = button.closest('.element');
  element.remove();
}

const popupPhotoBlock = document.querySelector('.popup-photo');
const popupPhoto = document.querySelector('.popup-photo__photo');
const popupName = document.querySelector('.popup-photo__name');

const openImagePopup = (event) => {
  popupPhoto.setAttribute('src', event.target.getAttribute('src'));
  popupPhoto.setAttribute('alt', event.target.getAttribute('alt'));
  popupName.textContent = event.target.nextElementSibling.firstElementChild.textContent;
  openPopup(popupPhotoBlock);
};

const getCard = (item) => {
  const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
  const elementName = cardElement.querySelector('.element__title');
  const elementPhoto = cardElement.querySelector('.element__photo');
  const deleteElementButton = cardElement.querySelector('.element__delete');

  elementName.textContent = item.name;
  elementPhoto.setAttribute('src', item.link);
  elementPhoto.setAttribute('alt', item.name);

  deleteElementButton.addEventListener('click', handleDeleteButtonClick);
  cardElement.querySelector('.element__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  });
  elementPhoto.addEventListener('click', openImagePopup)
  return cardElement;
};

const createElement = (item) => {
  const newCard = getCard(item);
  elements.prepend(newCard);
};

initialElements.forEach(createElement);

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_place_card');

function openPopupAdd () {
  openPopup(addCardPopup);
}
addCardButton.addEventListener('click', openPopupAdd);

const formElementAdd = document.querySelector('.popup__form_place_add-element');

const handleFormSubmitElement = (event) => {
  event.preventDefault();
  const formElementAdd = event.target;
  const elementName = formElementAdd.querySelector('.popup__input_card_name').value;
  const elementPhoto = formElementAdd.querySelector('.popup__input_card_link').value;
  const element = {
    name: elementName,
    link: elementPhoto,
  };
  createElement(element);
  formElementAdd.reset();
  closePopup(addCardPopup);
};

formElementAdd.addEventListener('submit', handleFormSubmitElement);

