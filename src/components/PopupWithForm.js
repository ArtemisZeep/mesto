import  Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
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
    });
  }



  close() {
    super.close();
    this._popupForm.reset();
    
  }
}
