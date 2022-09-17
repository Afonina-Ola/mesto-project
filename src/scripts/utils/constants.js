export const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_inactive',
  inactiveButtonClass: 'popup__button-close',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active',
  inputErrorClass: 'popup__item_input-error'
}

const TOKEN = '1285a779-c26e-4262-86d9-8ca47136e967'
export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}
