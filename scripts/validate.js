const showIputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage
  errorTextElement.classList.add(activeErrorClass)
}

const hideIputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.classList.remove(activeErrorClass)
  errorTextElement.textContent = ""
}

const disableButton = (submitButton, invalidSubmitButton) => {
  submitButton.classList.add(invalidSubmitButton);
  submitButton.disabled = true;

}

const enableButton = (submitButton, invalidSubmitButton) => {
  submitButton.classList.remove(invalidSubmitButton);
  submitButton.disabled = false;
}


const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  
  if(!input.validity.valid) {
    showIputError(errorTextElement, input.validationMessage, activeErrorClass)
  } 
  else { 
    hideIputError(errorTextElement, activeErrorClass)
  }
}


const hasInvalidInput = (nededForm, inputSelector) => {
  console.log(nededForm)
  const neededInputs = nededForm.querySelectorAll(inputSelector)
  return Array.from(neededInputs).some((input) =>  !input.validity.valid)
}

const toggleButtonState = (input, errorClassTemplate,  invalidSubmitButton, inputSelector) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  const nededForm = errorTextElement.closest('.popup__form')
  const submitButton = nededForm.querySelector('.popup__submit-button')

  console.log(nededForm)
  console.log(submitButton)
  if (hasInvalidInput(nededForm, inputSelector)) {
    disableButton(submitButton, invalidSubmitButton)
  } else {
    enableButton(submitButton, invalidSubmitButton)
  }

}




const setEventListenners = (form, inputList, errorClassTemplate, activeErrorClass, invalidSubmitButton, inputSelector) => {
  form.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      });
  })
  
  
    inputList.forEach((input) => {
    input.addEventListener('input', (evt) =>{
      checkInputValidity(input, errorClassTemplate, activeErrorClass)
      toggleButtonState(input, errorClassTemplate, invalidSubmitButton, inputSelector)
    })
    });
}








const enableValidation = (config) => {
  const form = document.querySelectorAll(config.formSelector)
  const inputList = document.querySelectorAll(config.inputSelector)

  

  setEventListenners(form, inputList, config.errorClassTemplate, config.activeErrorClass, config.invalidSubmitButton, config.inputSelector)

}; 


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_active',
  invalidSubmitButton: 'popup__submit-button_invalid'
})


