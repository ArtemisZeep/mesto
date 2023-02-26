const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');


editProfileButton.addEventListener('click', function () {
  editPopup.classList.add('popup_opened');
});

const closePopupButton = document.querySelector('.popup__close');

closePopupButton.addEventListener('click', function() {
  editPopup.classList.remove('popup_opened');
})


let profileName = 'Жак-Ив Кусто';
let profileStatus = 'Исследователь океана';

let profileNameElement= document.querySelector('.profile__name');
profileNameElement.textContent = profileName;

let profileStatusElement = document.querySelector('.profile__status');
profileStatusElement.textContent = profileStatus



let profileNameInput = document.querySelector('.popup__input-name');
profileNameInput.value = profileName

let profileStatusInput = document.querySelector('.popup__input-status');
profileStatusInput.value = profileStatus



let formElement = document.querySelector('.popup__form');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value
  profileStatusElement.textContent = profileStatusInput.value
}

formElement.addEventListener('submit', handleFormSubmit); 




const submitPopupButton = document.querySelector('.popup__submit-button')

submitPopupButton.addEventListener('click', function() {
  editPopup.classList.remove('popup_opened');

})