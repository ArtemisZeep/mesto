const data = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorClassTemplate: ".popup__input-error_type_",
  activeErrorClass: "popup__input-error_active",
  invalidSubmitButton: "popup__submit-button_invalid",
  submitButtonSelector: ".popup__submit-button",
};

class FormValidator {
  constructor(data, currentForm) {
    this.errorClassTemplate = data.errorClassTemplate;
    this.activeErrorClass = data.activeErrorClass;
    this.invalidSubmitButton = data.invalidSubmitButton;
    this.inputSelector = data.inputSelector;
    this.formSelector = data.formSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.currentForm = currentForm;
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

  _disableButton = (submitButton) => {
    submitButton.classList.add(this.invalidSubmitButton);
    submitButton.disabled = true;
    submitButton.setAttribute("disabled", "disabled");
  };

  _enableButton = (submitButton) => {
    submitButton.classList.remove(this.invalidSubmitButton);
    submitButton.disabled = false;
    submitButton.removeAttribute("disabled", "disabled");
  };

  _hasInvalidInput = (nededForm) => {
    const neededInputs = nededForm.querySelectorAll(this.inputSelector);
    return Array.from(neededInputs).some((input) => !input.validity.valid);
  };

  _toggleButtonState = (input) => {
    const errorTextElement = document.querySelector(
      `${this.errorClassTemplate}${input.name}`
    );
    const nededForm = errorTextElement.closest(this.formSelector);
    const submitButton = nededForm.querySelector(this.submitButtonSelector);

    if (this._hasInvalidInput(nededForm, this.inputSelector)) {
      this._disableButton(submitButton, this.invalidSubmitButton);
    } else {
      this._enableButton(submitButton, this.invalidSubmitButton);
    }
  };

  _setEventListenners = () => {
    this.currentForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputFormlists = this.currentForm.querySelectorAll(
      this.inputSelector
    );
    const submitButton = this.currentForm.querySelector(
      this.submitButtonSelector
    );
    this._disableButton(submitButton, this.invalidSubmitButton);

    inputFormlists.forEach((input) => {
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

function update(data, currentForm) {
  const formValidator = new FormValidator(data, currentForm);
  const enableValidation = formValidator.enableValidation;
  enableValidation();
}

const forms = document.querySelectorAll(data.formSelector);
forms.forEach((form) => {
  const currentForm = form;
  update(data, currentForm);
});
