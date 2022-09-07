import { Popup } from './Popup.js'
// окно картинки в увеличении

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageOpened = this._popup.querySelector('.popup__image');
    this.imageTextOpened = this._popup.querySelector('.popup__image-text');
  }

  open(name, link) {
    super.open();
    this.imageOpened.src = link;
    this.imageTextOpened.textContent = name;
    this.imageOpened.alt = name;
  }
}
