export default class Card {
  constructor(item, handleCardActions, containerSelector, userId, userData) {
    this._item = item;
    this.name = item.name;
    this.link = item.link;
    this._handleCardActions = handleCardActions;
    this._container = document.querySelector(containerSelector);
    this._userId = userId;
    this._cardId = userData.cardId;
    this._userCardID = userData.cardId;
    this._authorId = userData.authorId;
    this._likes = userData.likes;
    this._cardPhotoZoom = handleCardActions.popupZoomPhoto;
    this._cardDelete = handleCardActions.handleCardDelete;
    this._like = handleCardActions.like;
    this._likeLoad = handleCardActions.likeLoad
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._elementPhoto.addEventListener("click", () =>
      this._cardPhotoZoom(this.name, this.link)
    );
    if (this._userId === this._authorId) {
      this._deleteButton.addEventListener("click", () =>
        this._cardDelete(this, this._cardId)
      );
    } else {
      this._deleteButton.remove();
    }
  };

  createCard() {
    this._card = this._container.content.cloneNode(true).children[0];
    this._elementName = this._card.querySelector(".element__title");
    this._elementPhoto = this._card.querySelector(".element__photo");
    this._likeButton = this._card.querySelector(".element__like");
    this.likeCounterElement = this._card.querySelector(
      ".element__like-counter"
    );
    this._deleteButton = this._card.querySelector(".element__delete");
    this._elementName.textContent = this.name;
    this._elementPhoto.setAttribute("src", this.link);
    this._elementPhoto.setAttribute("alt", this.name);
    this.likeCounterElement.textContent = this._likes.length;
    this._handleLikeClickLoad()
    this._setEventListeners();
    
  }
  getCard() {
    this.createCard();

    return this._card;
  }

  _handleLikeClick = () => {
    console.log(this._like);
    this._like(this._cardId);
  };

  _handleLikeClickLoad = () => {
    console.log(this._like);
    this._likeLoad(this._cardId);
  };

  addLike = (likes) => {
    this._likes = likes;
    this._likeButton.classList.add("element__like_active");
    this.likeCounterElement.textContent = likes.length;
  };

  removeLike = (likes) => {
    this._likes = likes;
    this._likeButton.classList.remove("element__like_active");
    this.likeCounterElement.textContent = likes.length;
  };



  findMyLikes() {
    return this._likes.some((user) => user._id === this._userId);
  }

  _checkIsLike() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._likeButton.classList.add("element__like-button_active");
        return;
      }
    });
  }
}
