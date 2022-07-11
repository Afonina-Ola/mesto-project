import { openPopup } from './utils.js'
import { imageCardPopupOpened } from './modal.js'
const cardTemplate = document.querySelector('#cardMesto').content;
const cardOnline = document.querySelector('.cards');
const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');

const initialCards = [
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

function createCard(link, name) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    const cardImage = initialCardsElement.querySelector('.card__mask-group');
    cardImage.src = link;
    cardImage.alt = name;
    initialCardsElement.querySelector('.card__text').textContent = name;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    initialCardsElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function (evt) {
        openPopup(imageCardPopupOpened);        
        imageOpened.src = link;
        imageTextOpened.textContent = name;
        imageOpened.alt = name;
    });   
    return initialCardsElement;
}

function renderCard(link, name, position = "end") {
    const card = createCard(link, name);
    if (position === 'start') {
        cardOnline.prepend(card);
    } else {
        cardOnline.append(card);
    }
}

initialCards.forEach(function (element) {
    renderCard(element.link, element.name)
});

export { cardTemplate, cardOnline, imageOpened, imageTextOpened, initialCards, createCard, renderCard  } 