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
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._trashButton = this._element.querySelector('.card__trash-button');
    if (this.checkIsMyLike()) {
      this._likeButton.classList.add('card__like-button_active');
    }
    this._element.querySelector('.card__text').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._trashButton.classList.add(this._userId !== this._ownerId && 'card__trash-button_hidden');
    this._setEventListeners();
    return this._element;
  }

  removeCard() {
    this._card.remove();
  }

  checkIsMyLike() {
    let isLike = false;
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        isLike = true;
      }
    });
    return isLike;
  }

  updateLikes(res) {
    this._likes = res.likes;
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(this);
    });
    this._trashButton.addEventListener('click', (evt) => {
      this._card = evt.target.closest('.card');
      this._handleDeleteIconClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

