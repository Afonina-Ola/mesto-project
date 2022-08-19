import '../pages/index.css';
import './Card.js';
import '../components/modal.js';
import '../components/utils.js';
import './FormValidator.js';

import { openPopup, closePopup } from './modal.js'
import { clearInputs } from './utils.js'
import { Card, initialCards } from './Card.js'
import { FormValidator, validationSelectors } from './FormValidator.js'

// профайл
const profileName = document.querySelector('.profile__author');
const profileEditButton = document.querySelector('.profile__stilus');
const profileJob = document.querySelector('.profile__about-the-author');
const profileAddButton = document.querySelector('.profile__add-button');
// окно заполнения данных о пользователе
const userEditPopup = document.querySelector('#userInfo');
const userFormElement = document.querySelector('#userForm');
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');
const userCloseButton = document.querySelector('#userInfoClose');
// окно добавления карточки
const cardAddPopup = document.querySelector('#cardInfo');
const cardAddForm = document.querySelector('#cardInfoSubmit');
const cardInputMesto = document.querySelector('#mesto');
const cardInputHref = document.querySelector('#mestoHref');
const cardCloseButton = document.querySelector('#cardInfoClose');
const cardSubmitButton = document.querySelector('#cardSubmitButton');


function openUserEditPopup() {
    userNameInput.value = profileName.textContent;
    userJobInput.value = profileJob.textContent;
    openPopup(userEditPopup);
}

profileEditButton.addEventListener('click', openUserEditPopup);
userCloseButton.addEventListener('click', function () {
    closePopup(userEditPopup);
})

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = userNameInput.value;
    profileJob.textContent = userJobInput.value;
    closePopup(userEditPopup);
}
userFormElement.addEventListener('submit', submitProfileForm);

profileAddButton.addEventListener('click', function () {
    clearInputs(cardAddForm);
    openPopup(cardAddPopup);
});

cardCloseButton.addEventListener('click', function () {
    closePopup(cardAddPopup);
})


function submitMesto(evt) {
    evt.preventDefault();
    renderCard(cardInputHref.value, cardInputMesto.value, 'start');
    closePopup(cardAddPopup);
    cardSubmitButton.classList.add(validationSelectors.inactiveSubmitButtonClass);
}

cardAddForm.addEventListener('submit', submitMesto);

function renderCard(link, name, position = "end") {
    const card = new Card(name, link, '#cardMesto');
    const cardOnline = document.querySelector('.cards');
    const cardNew = card.generateCard();
    if (position === 'start') {
        cardOnline.prepend(cardNew);
    } else {
        cardOnline.append(cardNew);
    }
}

initialCards.forEach(function (element) {
    renderCard(element.link, element.name)
});

// Найдём все формы с указанным классом в DOM,
// сделаем из них массив методом Array.from
const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));

// Переберём полученную коллекцию и добавим валидацию
formList.forEach((formElement) => {
    formElement = new FormValidator(validationSelectors, formElement);
    formElement.enableValidation();
});











