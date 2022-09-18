import '../pages/index.css';
import { Api } from '../scripts/components/Api.js'
import { Card } from '../scripts/components/Card.js'
import { validationSelectors } from '../scripts/utils/constants'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { apiConfig } from '../scripts/utils/constants.js'

// профайл
const profileEditButton = document.querySelector('.profile__stilus');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
// окно заполнения данных о пользователе
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');
const userSubmitButton = document.querySelector('#userSubmitButton');
// окно обновления аватара
const avatarUser = document.querySelector('.profile__container-avatar');
const avatarSubmitButton = document.querySelector('#avatarSubmitButton');
// окно добавления карточки
const cardSubmitButton = document.querySelector('#cardSubmitButton');

const api = new Api(apiConfig);
let userId = '';

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

const userInfo = new UserInfo({ nameSelector: '.profile__author', jobSelector: '.profile__about-the-author', avatarSelector: '.profile__avatar' });

function openUserEditPopup() {
  const { name, job } = userInfo.getUserInfo();
  userNameInput.value = name;
  userJobInput.value = job;
  userPopup.open();
  formValidators['form-user'].resetValidation();
}

profileEditButton.addEventListener('click', openUserEditPopup);

function submitProfileForm(evt, inputValues) {
  evt.preventDefault();
  userSubmitButton.textContent = 'Сохранение...';
  api.editUser(inputValues.username, inputValues.userjob)
    .then((res) => {
      userInfo.setUserInfo({ userName: res.name, userJob: res.about });
      userPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      userSubmitButton.textContent = 'Сохранить';
    })
}

const cardPopup = new PopupWithForm('#cardInfo', submitAddCardPopup);
cardPopup.setEventListeners();

profileAddButton.addEventListener('click', function () {
  cardPopup.open();
  formValidators['form-mesto-add'].resetValidation();
});

function submitAddCardPopup(evt, inputValues) {
  evt.preventDefault();
  cardSubmitButton.textContent = 'Сохранение...';
  api.addCard(inputValues.mesto, inputValues.mestoHref)
    .then((res) => {
      renderCard({ link: res.link, name: res.name, likes: res.likes, owner: res.owner, _id: res._id }, 'start');
      cardPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      cardSubmitButton.textContent = 'Сохранить';
    })
}

const imagePopup = new PopupWithImage('#cardOpened');
const handleCardClick = imagePopup.open;
imagePopup.setEventListeners();

const cardDeletePopup = new PopupWithSubmit('#deleteCard');
cardDeletePopup.setEventListeners();

const createCard = ({ name, link, likes, owner, cardId }) => {
  const card = new Card({
    name, link, likes, owner, userId: userId, cardId,
    handleCardClick,
    handleDeleteIconClick: (card) => {
      cardDeletePopup.open();
      cardDeletePopup.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.removeCard();
            cardDeletePopup.close();
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      })
    },
    handleLikeClick: (card) => {
      if (card.checkIsMyLike()) {
        api.removeLike(cardId)
          .then((res) => {
            card.updateLikes(res)
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(cardId)
          .then((res) => {
            card.updateLikes(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, '#cardMesto')
  const cardNew = card.generateCard();
  return cardNew
}

const section = new Section({ items: [], renderer: renderCard }, '.cards');

// добавляет карточку в разметку
function renderCard({ name, link, likes, owner, _id }, position) {
  const cardNew = createCard({ name, link, likes, owner, cardId: _id });
  section.addItem(cardNew, position);
}

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ userName: res.name, userJob: res.about });
    userInfo.setAvatar(res.avatar);
    userId = res._id;
  }).then(() => {
    api.getCards().then((res) => {

      const sectionUsers = new Section({ items: res, renderer: renderCard }, '.cards');
      sectionUsers.renderItems();
    })
      .catch((error) => console.log(`Ошибка: ${error}`))
  })
  .catch((error) => console.log(`Ошибка: ${error}`))

const avatarPopup = new PopupWithForm('#editAvatar', handleFormSubmit);
avatarPopup.setEventListeners();

avatarUser.addEventListener('click', function () {
  avatarPopup.open();
  formValidators['form-avatar-edit'].resetValidation();
});

function handleFormSubmit(evt, inputValues) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...';
  api.editAvatar(inputValues.avatarHref)
    .then((res) => {
      profileAvatar.src = res.avatar;
      avatarPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
    })
}



