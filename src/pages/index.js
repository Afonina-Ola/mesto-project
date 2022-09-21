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
// окно заполнения данных о пользователе
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');
// окно обновления аватара
const avatarUser = document.querySelector('.profile__container-avatar');

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

const userPopup = new PopupWithForm('#userInfo', handleUserFormSubmit);
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

const handleError = (error) => console.log(`Ошибка: ${error}`);

function handleUserFormSubmit(evt, inputValues) {
  evt.preventDefault();
  userPopup.renderLoading(true, 'Сохранение...');
  api.editUser(inputValues.username, inputValues.userjob)
    .then((res) => {
      userInfo.setUserInfo({ userName: res.name, userJob: res.about });
      userPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      userPopup.renderLoading(false);
    })
}

const cardPopup = new PopupWithForm('#cardInfo', handleAddCardFormSubmit);
cardPopup.setEventListeners();

profileAddButton.addEventListener('click', function () {
  cardPopup.open();
  formValidators['form-mesto-add'].resetValidation();
});

function handleAddCardFormSubmit(evt, inputValues) {
  evt.preventDefault();
  cardPopup.renderLoading(true, 'Сохранение...');
  api.addCard(inputValues.mesto, inputValues.mestoHref)
    .then((res) => {
      renderCard({ link: res.link, name: res.name, likes: res.likes, owner: res.owner, _id: res._id }, 'start');
      cardPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      cardPopup.renderLoading(false);
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
          .catch(handleError);
      })
    },
    handleLikeClick: (card) => {
      if (card.checkIsMyLike()) {
        api.removeLike(cardId)
          .then((res) => {
            card.updateLikes(res)
          })
          .catch(handleError);
      } else {
        api.addLike(cardId)
          .then((res) => {
            card.updateLikes(res);
          })
          .catch(handleError);
      }
    }
  }, '#cardMesto')
  const cardNew = card.generateCard();
  return cardNew
}

const section = new Section({ renderer: renderCard }, '.cards');

// добавляет карточку в разметку
function renderCard({ name, link, likes, owner, _id }, position) {
  const cardNew = createCard({ name, link, likes, owner, cardId: _id });
  section.addItem(cardNew, position);
}

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ userName: userData.name, userJob: userData.about });
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    section.renderItems(cards);
  })
  .catch(handleError)

const avatarPopup = new PopupWithForm('#editAvatar', handleAvatarFormSubmit);
avatarPopup.setEventListeners();

avatarUser.addEventListener('click', function () {
  avatarPopup.open();
  formValidators['form-avatar-edit'].resetValidation();
});

function handleAvatarFormSubmit(evt, inputValues) {
  evt.preventDefault();
  avatarPopup.renderLoading(true, 'Сохранение...');
  api.editAvatar(inputValues.avatarHref)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
}



