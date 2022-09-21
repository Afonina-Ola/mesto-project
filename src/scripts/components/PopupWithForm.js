import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this.form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent
  }

  close() {
    super.close();
    this.form.reset();
  }

  // собирает данные всех полей формы
  _getInputValues() {
    const inputValues = {}
    // Находим все поля внутри формы, делаем из них массив
    this._inputList = Array.from(this.form.querySelectorAll('.popup__item'));
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  // Закрытие попапа кликом на оверлей и крестик
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => { this._submitForm(evt, this._getInputValues()) })
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
