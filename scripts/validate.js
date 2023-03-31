const showIputError = (
  errorTextElement,
  validationMessage,
  activeErrorClass
) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
};

const hideIputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.classList.remove(activeErrorClass);
  errorTextElement.textContent = "";
};

const disableButton = (submitButton, invalidSubmitButton) => {
  submitButton.classList.add(invalidSubmitButton);
  submitButton.disabled = true;
  submitButton.setAttribute('disabled', 'disabled')
};

const enableButton = (submitButton, invalidSubmitButton) => {
  submitButton.classList.remove(invalidSubmitButton);
  submitButton.disabled = false;
  submitButton.removeAttribute('disabled', 'disabled')
};

const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );

  if (!input.validity.valid) {
    showIputError(errorTextElement, input.validationMessage, activeErrorClass);
  } else {
    hideIputError(errorTextElement, activeErrorClass);
  }
};

const hasInvalidInput = (nededForm, inputSelector) => {
  console.log(nededForm);
  const neededInputs = nededForm.querySelectorAll(inputSelector);
  return Array.from(neededInputs).some((input) => !input.validity.valid);
};

const toggleButtonState = (
  input,
  errorClassTemplate,
  invalidSubmitButton,
  inputSelector,
  formSelector,
  submitButtonSelector
) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );
  const nededForm = errorTextElement.closest(formSelector);
  const submitButton = nededForm.querySelector(submitButtonSelector);

  console.log(nededForm);
  console.log(submitButton);
  if (hasInvalidInput(nededForm, inputSelector)) {
    disableButton(submitButton, invalidSubmitButton);
  } else {
    enableButton(submitButton, invalidSubmitButton);
  }
};

const setEventListenners = (
  forms,
  errorClassTemplate,
  activeErrorClass,
  invalidSubmitButton,
  inputSelector,
  formSelector,
  submitButtonSelector
) => {
  


  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputFormlists = form.querySelectorAll(inputSelector)
    const submitButton = form.querySelector(submitButtonSelector);
    disableButton(submitButton, invalidSubmitButton);
    
    inputFormlists.forEach((input) => {
      input.addEventListener("input", (evt) => {
        console.log(input)
        checkInputValidity(input, errorClassTemplate, activeErrorClass);
        toggleButtonState(
          input,
          errorClassTemplate,
          invalidSubmitButton,
          inputSelector,
          formSelector,
          submitButtonSelector
        );
      });
    });
  });

  
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
 


  setEventListenners(
    forms,
    config.errorClassTemplate,
    config.activeErrorClass,
    config.invalidSubmitButton,
    config.inputSelector,
    config.formSelector,
    config.submitButtonSelector
  );
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorClassTemplate: ".popup__input-error_type_",
  activeErrorClass: "popup__input-error_active",
  invalidSubmitButton: "popup__submit-button_invalid",
  submitButtonSelector: ".popup__submit-button",
});
