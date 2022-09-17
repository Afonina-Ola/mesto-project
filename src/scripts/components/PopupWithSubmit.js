import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
  }

  setSubmitAction = (callback) => {
    this.form.addEventListener('submit', callback)
  }

  // Закрытие попапа кликом на оверлей и крестик
  setEventListeners() {
    super.setEventListeners();
  }
}
