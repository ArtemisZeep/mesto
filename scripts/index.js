const editProfileButton = document.querySelector('.profile__edit-button');
const editPopupProfile = document.querySelector('.popup_place_profile');
const closeEditPopupButton = document.querySelector('.popup__close_type_edit');
const editPopupStatus = document.querySelector('.popup_place_status');

let profileNameElement= document.querySelector('.profile__name');

let profileStatusElement = document.querySelector('.profile__status');

let profileNameInput = document.querySelector('.popup__input_text_name');

let profileStatusInput = document.querySelector('.popup__input_text_status');

const formElementProfile = document.querySelector('.popup__form_place_profile');

function popupEditOpen () {
  editPopupStatus.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent
  profileStatusInput.value = profileStatusElement.textContent
}

editProfileButton.addEventListener('click', popupEditOpen);

function popupEditClose () {
  editPopupStatus.classList.remove('popup_opened');
}

closeEditPopupButton.addEventListener('click', popupEditClose)

function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value
  profileStatusElement.textContent = profileStatusInput.value
  popupEditClose()
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

const createElement = (element) => {
  const newCardTemplate = document.querySelector('#elementTemplate').content
  const newCard = newCardTemplate.querySelector('.element').cloneNode(true)



  const newCardPopupTemplate = document.querySelector('#photoTemplate').content
  const newCardPopup = newCardPopupTemplate.querySelector('.popup-photo').cloneNode(true)
 


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


  const elementNamePopup = newCardPopup.querySelector('.popup-photo__name')
  elementNamePopup.textContent = element.name

  const elementPhotoPopup = newCardPopup.querySelector('.popup-photo__photo')
  elementPhotoPopup.setAttribute('src', element.link)
  elementPhotoPopup.setAttribute('alt', element.name) 

  elementPhoto.addEventListener('click', function (){
  console.log(newCardPopup)
    newCardPopup.classList.add('popup-photo_opened')
  })

  const closePopupPhoto = newCardPopup.querySelector('.popup-photo__close')
  closePopupPhoto.addEventListener('click', function (){
    console.log(newCardPopup)
      newCardPopup.classList.remove('popup-photo_opened')
    })

  popupPhotos.prepend(newCardPopup)
}


initialElements.forEach(createElement)




const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_place_card');
const closeAddPopupButton = document.querySelector('.popup__close_type_add');

function popupAddOpen () {
  addCardPopup.classList.add('popup_opened');

}
addCardButton.addEventListener('click', popupAddOpen);

function popupAddClose () {
  addCardPopup.classList.remove('popup_opened');
}

closeAddPopupButton.addEventListener('click', popupAddClose)


const formElementAdd = document.querySelector('.popup__form_place_add-element');




let handleFormSubmitElement = (event) => {
  event.preventDefault()
  const formElementAdd = event.target
  const elementName = formElementAdd.querySelector('.popup__input_card_name').value
  const elementPhoto = formElementAdd.querySelector('.popup__input_card_link').value
  const element = {
    name: elementName,
    link: elementPhoto,
  }
  createElement(element)
  popupAddClose()

  
}

formElementAdd.addEventListener('submit',handleFormSubmitElement)

