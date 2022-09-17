export class Card {
  constructor({ name, link, likes, owner, userId, cardId, handleCardClick, handleDeleteIconClick, handleLikeClick }, selector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._selector = selector;
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
    if (this._checkIsMyLike()) {
      this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
    }
    this._element.querySelector('.card__text').textContent = this._name;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    this._element.querySelector('.card__trash-button').classList.add(this._userId !== this._ownerId && 'card__trash-button_hidden');
    return this._element;
  }

  removeCard() {
    this._card.remove();
  }

  _checkIsMyLike() {
    let isLike = false;
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        isLike = true;
      }
    });
    return isLike;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._card = evt.target.closest('.card');
      this._handleLikeClick(this._card);
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', (evt) => {
      this._card = evt.target.closest('.card');
      this._handleDeleteIconClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

