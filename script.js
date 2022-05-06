const EditUserButton = document.querySelector('.profile__stilus');
const EditUserPopup = document.querySelector('#userInfo');
const formElement = document.querySelector('#userForm');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#userjob');
const profileAuthor = document.querySelector('.profile__author');
const profileJob = document.querySelector('.profile__about-the-author');
const popupCardOpened = document.querySelector('#cardOpened');
const popupImageOpened = document.querySelector('.popup__image');
const popupImageTextOpened = document.querySelector('.popup__image-text');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#cardInfo');

function openEditUserPopup() {
    EditUserPopup.classList.add('popup_opened');
    nameInput.value = profileAuthor.textContent;
    jobInput.value = profileJob.textContent;
}

EditUserButton.addEventListener('click', openEditUserPopup);
const closeUserButton = document.querySelector('#userInfoClose');
function closeUserEditPopup() {
    EditUserPopup.classList.remove('popup_opened');
}
closeUserButton.addEventListener('click', closeUserEditPopup);
function submitFormHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeUserEditPopup();
}
formElement.addEventListener('submit', submitFormHandler);



function openAddCardPopup() {
    addCardPopup.classList.add('popup_opened');
}
addCardButton.addEventListener('click', openAddCardPopup);
const closeCardButton = document.querySelector('#cardInfoClose');
function closeCardPopup() {
    addCardPopup.classList.remove('popup_opened');
}
closeCardButton.addEventListener('click', closeCardPopup);


const cardTemplate = document.querySelector('#cardMesto').content;
const cardOnline = document.querySelector('.cards');

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

initialCards.forEach(function (element) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    initialCardsElement.querySelector('.card__mask-group').src = element.link;

    initialCardsElement.querySelector('.card__text').textContent = element.name;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    initialCardsElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function (evt) {
        popupCardOpened.classList.add('popup_opened');
        console.log(evt.target.currentSrc);
        popupImageOpened.src=evt.target.currentSrc;
        console.log(evt.target.closest('.card').querySelector('.card__text').textContent);
        popupImageTextOpened.textContent = evt.target.closest('.card').querySelector('.card__text').textContent;
    });
    cardOnline.append(initialCardsElement);
});

const inputMesto = document.querySelector('#mesto');
const inputHref = document.querySelector('#mestoHref');
const addMestoForm = document.querySelector('#cardInfoSubmit');
function submitMesto(evt) {
    evt.preventDefault();
    const initialCardsElement = cardTemplate.cloneNode(true);
    initialCardsElement.querySelector('.card__mask-group').src = inputHref.value;
    initialCardsElement.querySelector('.card__text').textContent = inputMesto.value;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    initialCardsElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function () {
        popupCardOpened.classList.add('popup_opened');
    });
    cardOnline.prepend(initialCardsElement);
    closeCardPopup();
}
addMestoForm.addEventListener('submit', submitMesto);

const cardClosePopupButton = document.querySelector('#cardClose');
function closeCardImagePopup() {
    popupCardOpened.classList.remove('popup_opened');
}
cardClosePopupButton.addEventListener('click', closeCardImagePopup);


