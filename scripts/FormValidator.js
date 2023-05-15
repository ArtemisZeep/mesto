 const data = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorClassTemplate: ".popup__input-error_type_",
  activeErrorClass: "popup__input-error_active",
  invalidSubmitButton: "popup__submit-button_invalid",
  submitButtonSelector: ".popup__submit-button",
};

export {data}

export class FormValidator {
  constructor(data, form) {
    this.errorClassTemplate = data.errorClassTemplate;
    this.activeErrorClass = data.activeErrorClass;
    this.invalidSubmitButton = data.invalidSubmitButton;
    this.inputSelector = data.inputSelector;
    this.formSelector = data.formSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.currentForm = form;
    this.submitButton = this.currentForm.querySelector(this.submitButtonSelector)
    this.inputFormlist = this.currentForm.querySelectorAll(this.inputSelector)
  }

  _showIputError = (errorTextElement, validationMessage) => {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(this.activeErrorClass);
  };

  _hideIputError = (errorTextElement) => {
    errorTextElement.classList.remove(this.activeErrorClass);
    errorTextElement.textContent = "";
  };

  _checkInputValidity = (input) => {
    const errorTextElement = document.querySelector(
      `${this.errorClassTemplate}${input.name}`
    );

    if (!input.validity.valid) {
      this._showIputError(
        errorTextElement,
        input.validationMessage,
        this.activeErrorClass
      );
    } else {
      this._hideIputError(errorTextElement, this.activeErrorClass);
    }
  };

  disableButton = () => {
    this.submitButton.classList.add(this.invalidSubmitButton);
    this.submitButton.disabled = true;
    this.submitButton.setAttribute("disabled", "disabled");
  };

  _enableButton = () => {
    this.submitButton.classList.remove(this.invalidSubmitButton);
    this.submitButton.disabled = false;
    this.submitButton.removeAttribute("disabled", "disabled");
  };

  _hasInvalidInput = () => {
   
    return Array.from(this.inputFormlist).some((input) => !input.validity.valid);
  };

  _toggleButtonState = (input) => {
    const errorTextElement = document.querySelector(
      `${this.errorClassTemplate}${input.name}`
    );
    
    

    if (this._hasInvalidInput(this.currentForm, this.inputSelector)) {
      this.disableButton(this.submitButton, this.invalidSubmitButton);
    } else {
      this._enableButton(this.submitButton, this.invalidSubmitButton);
    }
  };

  _setEventListenners = () => {
    this.currentForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

  
    this.disableButton(this.submitButton, this.invalidSubmitButton);

    this.inputFormlist.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(input);
        this._toggleButtonState(input);
      });
    });
  };

  enableValidation = () => {
    this._setEventListenners();
  };
}




const forms = document.querySelectorAll(data.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(data, form);
  const enableValidation = formValidator.enableValidation;
  enableValidation();
});
