const editProfileButton = document.querySelector('.profile__edit-button');
const editPopupProfile = document.querySelector('.popup_place_profile');
const closeEditPopupButton = document.querySelector('.popup__close_type_edit');
const editPopupStatus = document.querySelector('.popup_place_status');
const profileNameElement= document.querySelector('.profile__name');

const profileStatusElement = document.querySelector('.profile__status');

const profileNameInput = document.querySelector('.popup__input_text_name');

const profileStatusInput = document.querySelector('.popup__input_text_status');

const formElementProfile = document.querySelector('.popup__form_place_profile');




function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit () { 
  openPopup(editPopupStatus);
  profileNameInput.value = profileNameElement.textContent
  profileStatusInput.value = profileStatusElement.textContent
}

editProfileButton.addEventListener('click', openPopupEdit);


function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value
  profileStatusElement.textContent = profileStatusInput.value
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


const elements = document.querySelector('.elements')
const popupPhotos = document.querySelector('.popup-photos')

const handleDeleteButtonClick = (event) => {
  const button = event.target
  const element = button.closest('.element')
  element.remove()
}

const elementsPhoto = document.querySelectorAll('.element__photo');
const popupPhotoBlock = document.querySelector('.popup-photo');
const popupPhoto = document.querySelector('.popup-photo__photo');
const popupName = document.querySelector('.popup-photo__name');

const clickedPopup = (event) => {
  const clickedElementPhoto = event.target
  const clickedElementDesctiption = clickedElementPhoto.nextElementSibling
  const clickedElementName = clickedElementDesctiption.firstElementChild
  const clickedElementPhotoAttribute = clickedElementPhoto.getAttribute('src')
  const clickedElementNameAttribute = clickedElementPhoto.getAttribute('alt')
  popupPhoto.setAttribute('src', clickedElementPhotoAttribute)
  popupPhoto.setAttribute('alt', clickedElementNameAttribute)
  popupName.textContent = clickedElementName.textContent
  openPopup(popupPhotoBlock);
}


const createElement = (element) => {
  const newCardTemplate = document.querySelector('#elementTemplate').content
  const newCard = newCardTemplate.querySelector('.element').cloneNode(true)



  const elementName = newCard.querySelector('.element__title')
  elementName.textContent = element.name

  const elementPhoto = newCard.querySelector('.element__photo')
  elementPhoto.setAttribute('src', element.link)
  elementPhoto.setAttribute('alt', element.name)

  const deleteElementButton = newCard.querySelector('.element__delete')
  deleteElementButton.addEventListener('click', handleDeleteButtonClick)

  newCard.querySelector('.element__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active')
  })

  elements.prepend(newCard)




  const closeButtons = document.querySelectorAll('.popup__close');
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
 
  const elementsPhoto = document.querySelectorAll('.element__photo');
  elementsPhoto.forEach(element => {
    element.addEventListener('click',clickedPopup)
  })
  
}
initialElements.forEach(createElement)







const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_place_card');

function openPopupAdd () {
  openPopup(addCardPopup);
}
addCardButton.addEventListener('click', openPopupAdd);


const formElementAdd = document.querySelector('.popup__form_place_add-element');




const handleFormSubmitElement = (event) => {
  event.preventDefault()
  const formElementAdd = event.target
  const elementName = formElementAdd.querySelector('.popup__input_card_name').value
  const elementPhoto = formElementAdd.querySelector('.popup__input_card_link').value
  const element = {
    name: elementName,
    link: elementPhoto,
  }
  createElement(element)
  formElementAdd.reset()
}

formElementAdd.addEventListener('submit',handleFormSubmitElement)


const submitFormButtons = document.querySelectorAll('.popup__submit-button');
  
  
function closeSubmitPopup(popup) {
    popup.classList.remove('popup_opened');
  }
  
  submitFormButtons.forEach((submitButton) => {
    const popup = submitButton.closest('.popup');
    submitButton.addEventListener('click', () => closeSubmitPopup(popup));
  });

