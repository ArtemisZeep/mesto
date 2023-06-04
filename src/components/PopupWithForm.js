import  Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
    this._waitButton = this._popup.querySelector('.popup__submit-button');
    this.__waitButtonText = this._waitButton.textContent;
  }

  _getInputValues() {
    const formValues = [];
    
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
    this._callbackFormSubmit(this._getInputValues());
    event.preventDefault();
    console.log(this._popup)
    });
  }

  waitingText() {
    this._waitButton.textContent = 'Сохранение...';
  }
  returnWaitingText() {
    this._waitButton.textContent = this.__waitButtonText;
  }

  close() {
    super.close();
    this._popupForm.reset();
    
  }


}
