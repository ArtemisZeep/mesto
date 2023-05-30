export default class Card {
  constructor(item, handleCardClick, containerSelector) {
    this.name = item.name;
    this.link = item.link;
    this._handleCardClick = handleCardClick;
    this._containerSelector = containerSelector;
  }

  _handleDeleteButtonClick = () => {
    this._card.remove();
  };

  _likeCard = () => {
    this._likeButton.classList.toggle("element__like_active");
  };

  _setEventListeners = () => {
    this._card
      .querySelector(".element__delete")
      .addEventListener("click", this._handleDeleteButtonClick);
    this._likeButton.addEventListener("click", this._likeCard);
    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });
  };

  createCard() {
    this._card = this._containerSelector.content.cloneNode(true).children[0];
    this._elementName = this._card.querySelector(".element__title");
    this._elementPhoto = this._card.querySelector(".element__photo");
    this._likeButton = this._card.querySelector(".element__like");
    this._elementName.textContent = this.name;
    this._elementPhoto.setAttribute("src", this.link);
    this._elementPhoto.setAttribute("alt", this.name);
    this._setEventListeners();
  }
  getCard() {
    this.createCard();

    return this._card;
  }
}













