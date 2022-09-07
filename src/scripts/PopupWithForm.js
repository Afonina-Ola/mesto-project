import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this.form = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close();
    this.form.reset();
  }

  // собирает данные всех полей формы
  _getInputValues() {
    const inputValues = {}
    // Находим все поля внутри формы, делаем из них массив
    const inputFormList = Array.from(this.form.querySelectorAll('.popup__item'));
    inputFormList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  // Закрытие попапа кликом на оверлей и крестик
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => { this._submitForm(evt, this._getInputValues()) })
  }
}
