import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitAction = this._submitAction.bind(this);

  }

  setSubmitAction = (callback) => {
    this._submitActionCallback = callback;
  }

  _submitAction() {
    this._submitActionCallback();
  }

  // Закрытие попапа кликом на оверлей и крестик
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitAction)
  }
}
