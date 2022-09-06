import { Popup } from './Popup.js'
// окно картинки в увеличении
export const imageOpened = document.querySelector('.popup__image');
export const imageTextOpened = document.querySelector('.popup__image-text');

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  openPopup(name, link) {
    super.openPopup();
    imageOpened.src = link;
    imageTextOpened.textContent = name;
    imageOpened.alt = name;
  }
}
