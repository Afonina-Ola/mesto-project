import '../pages/index.css';
import '../components/card.js';
import '../components/modal.js';
import '../components/utils.js';
import '../components/validate.js';
import '../components/api.js';

import { openPopup, closePopup } from './modal.js'
import { clearInputs } from './utils.js'
import { fetchCards, renderCard, confirmDeletionCard, targetCardToDelete } from './card.js'
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
const userSubmitButton = document.querySelector('#userSubmitButton');
// окно добавления карточки
const cardAddPopup = document.querySelector('#cardInfo');
const cardAddForm = document.querySelector('#cardInfoSubmit');
const cardInputMesto = document.querySelector('#mesto');
const cardInputHref = document.querySelector('#mestoHref'); const cardSubmitButton = document.querySelector('#cardSubmitButton');
// окно обновления аватара
const avatarUser = document.querySelector('.profile__container-avatar ');
const avatarUserPopup = document.querySelector('#editAvatar');
const avatarEditForm = document.querySelector('#formAvatarEdit');
const avatarHrefInput = document.querySelector('#avatarHref');
const avatarSubmitButton = document.querySelector('#avatarSubmitButton');
// окно удаления карточки
const cardDeletePopup = document.querySelector('#deleteCard');

// id пользователя, приходит с сервера
let userId;

// кнопки закрытия (крестики)
const closeButtons = document.querySelectorAll('.popup__button-close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function openUserEditPopup() {
  userNameInput.value = profileName.textContent;
  userJobInput.value = profileJob.textContent;
  userSubmitButton.textContent = 'Сохранить';
  openPopup(userEditPopup);
}

profileEditButton.addEventListener('click', openUserEditPopup);

avatarUser.addEventListener('click', function () {
  avatarSubmitButton.textContent = 'Сохранить';
  clearInputs(avatarEditForm);
  openPopup(avatarUserPopup);
});

// редактирование(обновление) профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  userSubmitButton.textContent = 'Сохранение...';
  editUser(userNameInput.value, userJobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
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
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(avatarUserPopup);
      avatarSubmitButton.classList.add('popup__submit-button_inactive');
      avatarSubmitButtont.setAttribute('disabled', true);
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
  clearInputs(cardAddForm);
  openPopup(cardAddPopup);
});

//добавление новой карточки
function submitMesto(evt) {
  evt.preventDefault();
  cardSubmitButton.textContent = 'Сохранение...';
  addCard(cardInputMesto.value, cardInputHref.value)
    .then((data) => {
      closePopup(cardAddPopup);
      cardSubmitButton.classList.add(validationSelectors.inactiveSubmitButtonClass);
      cardSubmitButton.setAttribute('disabled', true);

      renderCard(data.link, data.name, data.likes, data.owner._id, data._id, userId, "start")
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      cardSubmitButton.textContent = 'Сохранить';
    })
}

cardAddForm.addEventListener('submit', submitMesto);

cardDeletePopup.addEventListener('submit', () => {
  confirmDeletionCard(targetCardToDelete);
})

//получение данных о пользователе
getUser().then((user) => {
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;
  // карточки загружаются после загрузки данных о пользователе
  fetchCards(userId);
})
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationSelectors);

export { cardDeletePopup }







