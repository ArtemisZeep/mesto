const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');

console.log(editProfileButton);

editProfileButton.addEventListener('click', function () {
  console.log(editPopup);
  editPopup.classList.add('popup_opened');
});

const closePopupButton = document.querySelector('.popup__close');
console.log(editProfileButton);

closePopupButton.addEventListener('click', function() {
  console.log(editPopup);
  editPopup.classList.remove('popup_opened');
})


let profileName = 'Жак-Ив Кусто';
let profileStatus = 'Исследователь океана';

let profileNameElement= document.querySelector('.profile__name');
profileNameElement.textContent = profileName;
console.log(profileNameElement);

let profileStatusElement = document.querySelector('.profile__status');
profileStatusElement.textContent = profileStatus
console.log(profileStatusElement);





let profileNameInput = document.querySelector('.popup__input-name');
profileNameInput.value = profileName
console.log(profileNameInput);

let profileStatusInput = document.querySelector('.popup__input-status');
profileStatusInput.value = profileStatus
console.log(profileStatusInput);



let formElement = document.querySelector('.popup__form');
console.log(formElement)

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value
  console.log(profileNameInput.value)
  profileStatusElement.textContent = profileStatusInput.value
  console.log(profileStatusInput.value)
}

formElement.addEventListener('submit', handleFormSubmit); 




const submitPopupButton = document.querySelector('.popup__submit-button')
console.log(submitPopupButton)

submitPopupButton.addEventListener('click', function() {
  console.log(editPopup);
  editPopup.classList.remove('popup_opened');

})