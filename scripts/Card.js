export default class Card {
  _containerSelector = document.querySelector('#elementTemplate').content
 
 
   constructor(item){
     this.name = item.name
     this.link = item.link
   }
 
   _handleDeleteButtonClick = () => {
     this._card.remove();
   }
   
   _likeCard = () => {
     this._likeButton.classList.toggle("element__like_active");
   } 
   _openPhotoPopup = (popupPhotoBlock) => {
     popupPhotoBlock.classList.add("popup_opened");
     this._closePhotoPopupByEscape = (event) => {
       if (event.key === "Escape") {
         popupPhotoBlock.classList.remove("popup_opened");
         document.removeEventListener("keydown", this._closePhotoPopupByEscape);
       }
     };
   
   
     document.addEventListener("keydown",this._closePhotoPopupByEscape);
   }
 
 
   
 
   _editAndOpenImagePopup = () => {
     const popupPhotoBlock = document.querySelector(".popup-photo");
     const popupPhoto = document.querySelector(".popup-photo__photo");
     const popupName = document.querySelector(".popup-photo__name");
     popupPhoto.setAttribute("src", this.link);
     popupPhoto.setAttribute("alt", this.name);
     popupName.textContent = this.name
     this._openPhotoPopup(popupPhotoBlock);
   };
 
   _createCard(){
     this._card = this._containerSelector.cloneNode(true).children[0];
     this.elementName = this._card.querySelector(".element__title");
     this.elementPhoto = this._card.querySelector(".element__photo");
     this._likeButton = this._card.querySelector('.element__like');
     this.elementName.textContent = this.name;
     this.elementPhoto.setAttribute('src', this.link);
     this.elementPhoto.setAttribute('alt', this.name);
     this._card.querySelector('.element__delete').addEventListener('click', this._handleDeleteButtonClick)
     this._likeButton.addEventListener('click', this._likeCard)
     this.elementPhoto.addEventListener("click", this._editAndOpenImagePopup);
     
     
   }
   getCard(){
     this._createCard();
     return this._card
   }
 
   
 }


 
