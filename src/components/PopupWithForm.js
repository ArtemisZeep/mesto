import  Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });


    if (this._popup.classList.contains('popup_place_card')) {
      const name = "name";
    
      Object.defineProperty(formValues,name,
         Object.getOwnPropertyDescriptor(formValues, "card-name"));

      const link = "link";
    
      Object.defineProperty(formValues, link,
          Object.getOwnPropertyDescriptor(formValues, "card-link"));
    
      delete formValues["card-name"];

      delete formValues["card-link"];
    }


    if (this._popup.classList.contains('popup_place_status')) {
      const profileName = "profileName";
    
      Object.defineProperty(formValues,profileName,
         Object.getOwnPropertyDescriptor(formValues, "text-name"));

      const profileStatus = "profileStatus";
    
      Object.defineProperty(formValues, profileStatus,
          Object.getOwnPropertyDescriptor(formValues, "text-status"));
    
      delete formValues["text-name"];

      delete formValues["text-status"];
      }

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
    if (this._popup.classList.contains('popup_place_card')) {
    this._popupForm.reset();
    }
    
  }
}
