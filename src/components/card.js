import { closePopup, imageCardPopupOpened, openPopup } from './modal.js'
import { cardDeletePopup } from './index.js'
import { getCards, deleteCard, removeLike, addLike } from './api.js'

const cardTemplate = document.querySelector('#cardMesto').content;
const cardOnline = document.querySelector('.cards');

const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');

const AUTHOR_ID = 'ff2fd85333c77140782d01f0';

// проверить есть ли мой лайк
function checkIsMyLike(likes) {
    let isLike = false;
    likes.forEach((item) => {
        if (item._id === AUTHOR_ID) {
            isLike = true;
        }
    })
    return isLike
}

// поставить и удалить лайк
function toggleLike(id, counter, likeButton) {
    if (likeButton.classList.contains('card__like-button_active')) {
        removeLike(id)
            .then((data) => {
                counter.textContent = data.likes.length;
                likeButton.classList.remove('card__like-button_active');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        addLike(id)
            .then((data) => {
                counter.textContent = data.likes.length;
                likeButton.classList.add('card__like-button_active');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


function createCard(link, name, likes, ownerId, cardId) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    const likeButton = initialCardsElement.querySelector('.card__like-button');
    const counter = initialCardsElement.querySelector('.card__like-counter');
    const cardName = initialCardsElement.querySelector('.card__text')
    const cardImage = initialCardsElement.querySelector('.card__mask-group');

    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;
    counter.textContent = likes.length;

    if (checkIsMyLike(likes)) {
        likeButton.classList.add('card__like-button_active');
    }
    likeButton.addEventListener('click', () => { toggleLike(cardId, counter, likeButton) });
    if (ownerId === AUTHOR_ID) {
        initialCardsElement.querySelector('.card__trash-button').addEventListener('click', () => {
            openPopup(cardDeletePopup);
            cardDeletePopup.addEventListener('submit', () => {
                deleteCard(cardId)
                    .then(() => {
                        removeCards();
                        fetchCards();
                        closePopup(cardDeletePopup);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        });
    }
    else {
        initialCardsElement.querySelector('.card__trash-button').classList.add('card__trash-button_hidden')

    }
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function (evt) {
        openPopup(imageCardPopupOpened);
        imageOpened.src = link;
        imageTextOpened.textContent = name;
        imageOpened.alt = name;
    });
    return initialCardsElement;
}
// удалить карточку
function removeCard(card) {
    card.remove();
}

// удалить все карточки
function removeCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        removeCard(card);
    })
}
// получение и отрисовка карточек
function fetchCards() {
    getCards().then((cards) => {
        cards.forEach(function (card) {
            renderCard(card.link, card.name, card.likes, card.owner._id, card._id)
        });
    })
        .catch((err) => {
            console.log(err);
        });

}

function renderCard(link, name, likes, ownerId, cardId, position = "end") {
    const card = createCard(link, name, likes, ownerId, cardId);
    if (position === 'start') {
        cardOnline.prepend(card);
    } else {
        cardOnline.append(card);
    }
}

export { cardTemplate, cardOnline, imageOpened, imageTextOpened, createCard, renderCard, toggleLike, removeCards, fetchCards } 