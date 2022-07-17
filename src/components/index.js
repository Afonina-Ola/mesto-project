import '../pages/index.css';
import '../components/card.js';
import '../components/modal.js';
import '../components/utils.js';
import '../components/validate.js';
import '../components/api.js';

import { openPopup, closePopup } from './modal.js'
import { clearInputs } from './utils.js'
import { fetchCards, removeCards } from './card.js'
import { enableValidation, validationSelectors } from './validate.js'
import { getUser, editUser, addCard, editAvatar } from './api.js'

// профайл
const profileName = document.querySelector('.profile__author');
const profileEditButton = document.querySelector('.profile__stilus');
const profileJob = document.querySelector('.profile__about-the-author');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
// окно заполнения данных о пользователе
const userEditPopup = document.querySelector('#userInfo');
const userFormElement = document.querySelector('#userForm');
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');
const userCloseButton = document.querySelector('#userInfoClose');
const userSubmitButton = document.querySelector('#userSubmitButton');
// окно добавления карточки
const cardAddPopup = document.querySelector('#cardInfo');
const cardAddForm = document.querySelector('#cardInfoSubmit');
const cardInputMesto = document.querySelector('#mesto');
const cardInputHref = document.querySelector('#mestoHref');
const cardCloseButton = document.querySelector('#cardInfoClose');
const cardSubmitButton = document.querySelector('#cardSubmitButton');
// окно обновления аватара
const avatarUser = document.querySelector('.profile__container-avatar ');
const avatarUserPopup = document.querySelector('#editAvatar');
const avatarCloseButton = document.querySelector('#avatarClose');
const avatarEditForm = document.querySelector('#formAvatarEdit');
const avatarHrefInput = document.querySelector('#avatarHref');
const avatarSubmitButton = document.querySelector('#avatarSubmitButton');
// окно удаления карточки
const cardDeletePopup = document.querySelector('#deleteCard');
const cardDeleteFormClose = document.querySelector('#cardDeleteFormClose');

function openUserEditPopup() {
    userNameInput.value = profileName.textContent;
    userJobInput.value = profileJob.textContent;
    openPopup(userEditPopup);
}

profileEditButton.addEventListener('click', openUserEditPopup);
userCloseButton.addEventListener('click', function () {
    closePopup(userEditPopup);
})

avatarUser.addEventListener('click', function () {
    openPopup(avatarUserPopup);
});
avatarCloseButton.addEventListener('click', function () {
    closePopup(avatarUserPopup);
    clearInputs(avatarEditForm);
});

cardDeleteFormClose.addEventListener('click', function () {
    closePopup(cardDeletePopup);
});

// редактирование(обновление) профиля
function submitProfileForm(evt) {
    evt.preventDefault();
    userSubmitButton.textContent = 'Сохранение...';    
    editUser(userNameInput.value, userJobInput.value)
        .then(() => {
            //если данные удачно отправлены на сервер, то повторить загрузку с сервера            
            getUser().then((user) => {
                profileName.textContent = user.name;
                profileJob.textContent = user.about;
            })
            closePopup(userEditPopup);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            userSubmitButton.textContent = 'Сохранить';
        })
}
// обновление аватара
function submitAvatarForm(evt) {
    evt.preventDefault();
    avatarSubmitButton.textContent = 'Сохранение...';
    editAvatar(avatarHrefInput.value)
        .then(() => {
            //если данные удачно отправлены на сервер, то повторить загрузку с сервера            
            getUser().then((user) => {
                profileAvatar.src = user.avatar;
            })
            closePopup(avatarUserPopup);
            clearInputs(avatarEditForm);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            avatarSubmitButton.textContent = 'Сохранить';
        })
}

avatarEditForm.addEventListener('submit', submitAvatarForm);

userFormElement.addEventListener('submit', submitProfileForm);

profileAddButton.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

cardCloseButton.addEventListener('click', function () {
    closePopup(cardAddPopup);
})

//добавление новой карточки 
function submitMesto(evt) {
    evt.preventDefault();
    cardSubmitButton.textContent = 'Сохранение...';
    addCard(cardInputMesto.value, cardInputHref.value)
        .then(() => {
            closePopup(cardAddPopup);
            clearInputs(cardAddForm);
            cardSubmitButton.classList.add(validationSelectors.inactiveSubmitButtonClass);
            cardSubmitButton.setAttribute('disabled', true);
            removeCards();
            fetchCards();
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            cardSubmitButton.textContent = 'Сохранить';
        })
}

cardAddForm.addEventListener('submit', submitMesto);

//получение данных о пользователе
getUser().then((user) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
})
    .catch((err) => {
        console.log(err);
    });

//получение карточек с сервера
fetchCards();

enableValidation(validationSelectors);



export {
    profileName, profileEditButton, profileJob, profileAddButton, userEditPopup, userFormElement, userNameInput, userJobInput, cardDeletePopup,
    userCloseButton, cardAddPopup, cardAddForm, cardInputMesto, cardInputHref, cardCloseButton, openUserEditPopup, submitProfileForm, submitAvatarForm, submitMesto
}







