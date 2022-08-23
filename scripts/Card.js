export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(name, link, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    const initialCardsElement = document.querySelector(this._selector).content.cloneNode(true);
    return initialCardsElement;
  }

  generateCard() {
    this._element = this._createCard();
    this._cardImage = this._element.querySelector('.card__mask-group');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    this._element.querySelector('.card__text').textContent = this._name;
    return this._element;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _removeCard(evt) {
    evt.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', (evt) => {
      this._removeCard(evt);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

