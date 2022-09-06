import './pages/index.css';
import { } from './scripts/utils.js'
import { Card, initialCards } from './scripts/Card.js'
import { FormValidator, validationSelectors } from './scripts/FormValidator.js'
import { Section } from './scripts/Section.js'
import { PopupWithForm } from './scripts/PopupWithForm.js'
import { PopupWithImage } from './scripts/PopupWithImage.js'
import { UserInfo } from './scripts/UserInfo.js'

// профайл
const profileEditButton = document.querySelector('.profile__stilus');
const profileAddButton = document.querySelector('.profile__add-button');
// окно заполнения данных о пользователе
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');

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

const userPopup = new PopupWithForm('#userInfo', submitProfileForm);
userPopup.setEventListeners();

const userNameJob = new UserInfo( {nameSelector:'.profile__author', jobSelector:'.profile__about-the-author'} );

function openUserEditPopup() {
  const {name, job} = userNameJob.getUserInfo();
  userNameInput.value = name;
  userJobInput.value = job;
  userPopup.openPopup();
  formValidators['form-user'].resetValidation();
}

profileEditButton.addEventListener('click', openUserEditPopup);

function submitProfileForm(evt, inputValues) {
  evt.preventDefault();
  userNameJob.setUserInfo({userName: inputValues.username, userJob: inputValues.userjob});
  userPopup.closePopup();
}

const cardPopup = new PopupWithForm('#cardInfo', submitMesto);
cardPopup.setEventListeners();

profileAddButton.addEventListener('click', function () {
  cardPopup.openPopup();
  formValidators['form-mesto-add'].resetValidation();
});

function submitMesto(evt, inputValues) {
  evt.preventDefault();
  renderCard({ link: inputValues.mestoHref, name: inputValues.mesto });
  cardPopup.closePopup();
}

const imagePopup = new PopupWithImage('#cardOpened');
const handleCardClick = imagePopup.openPopup;
imagePopup.closePopup();
imagePopup.setEventListeners();

// создает карточку и возвращает её html-представление
function renderCard({ name, link }) {
  const card = new Card(name, link, '#cardMesto', handleCardClick);
  const cardNew = card.generateCard();
  section.addItem(cardNew);
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards');
section.renderItems();
















