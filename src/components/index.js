import '../pages/index.css';
import '../components/card.js';
import '../components/modal.js';
import '../components/utils.js';
import '../components/validate.js';

import { openPopup, closePopup } from './modal.js'
import { clearInputs } from './utils.js'
import { renderCard, initialCards } from './card.js'
import { enableValidation, validationSelectors } from './validate.js'

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
    openPopup(cardAddPopup);
});

cardCloseButton.addEventListener('click', function () {
    closePopup(cardAddPopup);
})


function submitMesto(evt) {
    evt.preventDefault();
    renderCard(cardInputHref.value, cardInputMesto.value, 'start');
    closePopup(cardAddPopup);
    clearInputs(cardAddForm);
    cardSubmitButton.classList.add(validationSelectors.inactiveSubmitButtonClass);
}

cardAddForm.addEventListener('submit', submitMesto);

initialCards.forEach(function (element) {
    renderCard(element.link, element.name)
});


enableValidation(validationSelectors);

export {
    profileName, profileEditButton, profileJob, profileAddButton, userEditPopup, userFormElement, userNameInput, userJobInput,
    userCloseButton, cardAddPopup, cardAddForm, cardInputMesto, cardInputHref, cardCloseButton, openUserEditPopup, submitProfileForm, submitMesto
}







