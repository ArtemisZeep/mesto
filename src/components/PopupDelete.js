import  Popup  from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, { callbackDelete }) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__form_place_delete');
    this._callbackDelete = callbackDelete;
  }
  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }

  deleteItem(){

  }
  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => { evt.preventDefault(); this._callbackDelete(this._cardObject, this._cardId) })
    super.setEventListeners();
  }
}
