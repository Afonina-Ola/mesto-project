import { imageCardPopupOpened, openPopup } from './index.js'

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
    constructor(name, link, selector) {
        this._name = name;
        this._link = link;
        this._selector = selector;
    }

    _createCard() {
        const initialCardsElement = document.querySelector(this._selector).content.cloneNode(true);
        return initialCardsElement;
    }

    generateCard() {
        this._element = this._createCard();
        this._setEventListeners();
        const cardImage = this._element.querySelector('.card__mask-group');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.card__text').textContent = this._name;
        return this._element;
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }

    _removeCard(evt) {
        evt.target.closest('.card').remove();
    }

    _maximiseCard() {
        const imageOpened = document.querySelector('.popup__image');
        const imageTextOpened = document.querySelector('.popup__image-text');
        openPopup(imageCardPopupOpened);
        imageOpened.src = this._link;
        imageTextOpened.textContent = this._name;
        imageOpened.alt = this._name;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.card__trash-button').addEventListener('click', (evt) => {
            this._removeCard(evt);
        });
        this._element.querySelector('.card__mask-group').addEventListener('click', () => {
            this._maximiseCard();
        });
    }
}

