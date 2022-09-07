import './pages/index.css';
import { Card } from './scripts/Card.js'
import { initialCards, validationSelectors } from './scripts/constants'
import { FormValidator } from './scripts/FormValidator.js'
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

const userInfo = new UserInfo({ nameSelector: '.profile__author', jobSelector: '.profile__about-the-author' });

function openUserEditPopup() {
  const { name, job } = userInfo.getUserInfo();
  userInfo.value = name;
  userJobInput.value = job;
  userPopup.open();
  formValidators['form-user'].resetValidation();
}

profileEditButton.addEventListener('click', openUserEditPopup);

function submitProfileForm(evt, inputValues) {
  evt.preventDefault();
  userInfo.setUserInfo({ userName: inputValues.username, userJob: inputValues.userjob });
  userPopup.close();
}

const cardPopup = new PopupWithForm('#cardInfo', submitAddCardPopup);
cardPopup.setEventListeners();

profileAddButton.addEventListener('click', function () {
  cardPopup.open();
  formValidators['form-mesto-add'].resetValidation();
});

function submitAddCardPopup(evt, inputValues) {
  evt.preventDefault();
  renderCard({ link: inputValues.mestoHref, name: inputValues.mesto });
  cardPopup.close();
}

const imagePopup = new PopupWithImage('#cardOpened');
const handleCardClick = imagePopup.open;
imagePopup.close();
imagePopup.setEventListeners();

// создает карточку и возвращает её html-представление
function createCard({ name, link }) {
  const card = new Card(name, link, '#cardMesto', handleCardClick);
  const cardNew = card.generateCard();
  return cardNew
}

// добавляет карточку в разметку
function renderCard({ name, link }) {
  const cardNew = createCard({ name, link });
  section.addItem(cardNew);
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards');
section.renderItems();
















