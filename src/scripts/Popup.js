export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа нажатием на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Закрытие попапа кликом на оверлей и крестик
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__button-close')) {
        this.close()
      }
    })
  }
}
