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
// окно добавления карточки
const cardAddPopup = document.querySelector('#cardInfo');
const cardAddForm = document.querySelector('#cardInfoSubmit');
const cardInputMesto = document.querySelector('#mesto');
const cardInputHref = document.querySelector('#mestoHref');
const cardSection = document.querySelector('.cards');
// окно картинки в увеличении
const imageCardPopupOpened = document.querySelector('#cardOpened');
const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');

const ESC_CODE = 'Escape';

// включение валидации всех форм
const formValidators = {}

const enableAllValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableAllValidation(validationSelectors);

function openUserEditPopup() {
  userNameInput.value = profileName.textContent;
  userJobInput.value = profileJob.textContent;
  openPopup(userEditPopup);
  formValidators['form-user'].resetValidation();
}

profileEditButton.addEventListener('click', openUserEditPopup);

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
  formValidators['form-mesto-add'].resetValidation();
});

function submitMesto(evt) {
  evt.preventDefault();
  renderCard(cardInputHref.value, cardInputMesto.value, 'start');
  closePopup(cardAddPopup);
}

cardAddForm.addEventListener('submit', submitMesto);

// открывает картинку в увеличенном размере
function handleCardClick(name, link) {
  imageOpened.src = link;
  imageTextOpened.textContent = name;
  imageOpened.alt = name;
  openPopup(imageCardPopupOpened);
}

function renderCard(link, name, position = "end") {
  const card = new Card(name, link, '#cardMesto', handleCardClick);
  const cardNew = card.generateCard();
  if (position === 'start') {
    cardSection.prepend(cardNew);
  } else {
    cardSection.append(cardNew);
  }
}

initialCards.forEach(function (element) {
  renderCard(element.link, element.name)
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Закрытие попапа нажатием на Esc
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрытие попапа кликом на оверлей и крестик
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
  })
})
















