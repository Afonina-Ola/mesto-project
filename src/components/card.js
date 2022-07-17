import { closePopup, imageCardPopupOpened, openPopup } from './modal.js'
import { cardDeletePopup } from './index.js'
import { getCards, deleteCard, removeLike, addLike } from './api.js'

const cardTemplate = document.querySelector('#cardMesto').content;
const cardOnline = document.querySelector('.cards');

const cardDeleteSubmitButton = document.querySelector('#cardDeleteSubmitButton');

const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');


// id карточки, которую нужно удалить
let targetCardToDelete;

// проверить есть ли мой лайк
function checkIsMyLike(likes, userId) {
    let isLike = false;
    likes.forEach((item) => {
        if (item._id === userId) {
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

// удаление карточки после подтвержения
function confirmDeletionCard(cardId) {
    cardDeleteSubmitButton.textContent = 'Удаление...';
    deleteCard(cardId)
            .then(() => {
            closePopup(cardDeletePopup);
            const card = document.getElementById(cardId).parentElement;
            card.remove();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            cardDeleteSubmitButton.textContent = 'Удалено';
        })
}


function createCard(link, name, likes, ownerId, cardId, userId) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    const likeButton = initialCardsElement.querySelector('.card__like-button');
    const counter = initialCardsElement.querySelector('.card__like-counter');
    const cardName = initialCardsElement.querySelector('.card__text')
    const cardImage = initialCardsElement.querySelector('.card__mask-group');

    // картинке назначим id карточки, полученный с сервера
    cardImage.id = cardId;

    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;
    counter.textContent = likes.length;

    if (checkIsMyLike(likes, userId)) {
        likeButton.classList.add('card__like-button_active');
    }
    likeButton.addEventListener('click', () => { toggleLike(cardId, counter, likeButton) });
    if (ownerId === userId) {
        initialCardsElement.querySelector('.card__trash-button').addEventListener('click', () => {
            targetCardToDelete = null;
            cardDeleteSubmitButton.textContent = 'Да';
            openPopup(cardDeletePopup);
            targetCardToDelete = cardId;
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

// получение и отрисовка карточек
function fetchCards(userId) {
    getCards().then((cards) => {
        cards.forEach(function (card) {
            renderCard(card.link, card.name, card.likes, card.owner._id, card._id, userId)
        });
    })
        .catch((err) => {
            console.log(err);
        });

}

function renderCard(link, name, likes, ownerId, cardId, userId, position = "end") {
    const card = createCard(link, name, likes, ownerId, cardId, userId);
    if (position === 'start') {
        cardOnline.prepend(card);
    } else {
        cardOnline.append(card);
    }
}

export { cardTemplate, cardOnline, imageOpened, imageTextOpened, createCard, renderCard, toggleLike, fetchCards, confirmDeletionCard, targetCardToDelete } 