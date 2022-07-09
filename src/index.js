import './pages/index.css';
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
// окно картинки в увеличенном масштабе
const imageCardPopupOpened = document.querySelector('#cardOpened');
const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');
const imageClosePopupButton = document.querySelector('#imageClose');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_inactive',
  inactiveButtonClass: 'popup__button-close',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active',
  inputErrorClass: 'popup__item_input-error'
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function clearInputs(form) {
    form.reset();
}

function openUserEditPopup() {
    userNameInput.value = profileName.textContent;
    userJobInput.value = profileJob.textContent;
    openPopup(userEditPopup);
}

profileEditButton.addEventListener('click', openUserEditPopup);
userCloseButton.addEventListener('click', function () {
    closePopup(userEditPopup);
})

function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = userNameInput.value;
    profileJob.textContent = userJobInput.value;       
    closePopup(userEditPopup);
}
userFormElement.addEventListener('submit', submitFormHandler);

profileAddButton.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

cardCloseButton.addEventListener('click', function () {
    closePopup(cardAddPopup);
})

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

function createCard(link, name) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    const cardImage = initialCardsElement.querySelector('.card__mask-group');
    cardImage.src = link;
    cardImage.alt = name;
    initialCardsElement.querySelector('.card__text').textContent = name;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    initialCardsElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function (evt) {
        openPopup(imageCardPopupOpened);        
        imageOpened.src = link;
        imageTextOpened.textContent = name;
        imageOpened.alt = name;
    });   
    return initialCardsElement;
}

function renderCard(link, name, position = "end") {
    const card = createCard(link, name);
    if (position === 'start') {
        cardOnline.prepend(card);
    } else {
        cardOnline.append(card);
    }
}

initialCards.forEach(function (element) {
    renderCard(element.link, element.name)
});

function submitMesto(evt) {
    evt.preventDefault();
    renderCard(cardInputHref.value, cardInputMesto.value, 'start');
    closePopup(cardAddPopup);
    clearInputs(cardAddForm);
}

cardAddForm.addEventListener('submit', submitMesto);

imageClosePopupButton.addEventListener('click', function () {
    closePopup(imageCardPopupOpened);
})

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__item');

// Функция, которая добавляет класс с ошибкой и показывает сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationSelectors) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);   
  inputElement.classList.add(validationSelectors.inputErrorClass);
// Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.errorClass);
};

// Функция, которая удаляет класс с ошибкой и скрывает сообщение об ошибке
const hideInputError = (formElement, inputElement, validationSelectors) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(validationSelectors.inputErrorClass);  
  errorElement.classList.remove(validationSelectors.errorClass);
   // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationMessage, validationSelectors) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку. Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, validationMessage, validationSelectors);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationSelectors);
  }
};
 
formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// функция принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true  
      return !inputElement.validity.valid;
    })
  }; 
  
// Для стилизации нужна функция toggleButtonState. Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, validationSelectors) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(validationSelectors.inactiveSubmitButtonClass);
      buttonElement.setAttribute('disabled', true);      
    } else {
          // иначе сделай кнопку активной
      buttonElement.classList.remove(validationSelectors.inactiveSubmitButtonClass);
      buttonElement.removeAttribute('disabled', true); 
    }
  }; 


// создадим функцию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики
const setEventListeners = (formElement, validationSelectors) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
    // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(validationSelectors.submitButtonSelector);
   // Вызовем toggleButtonState и передадим ей массив полей и кнопку
   toggleButtonState(inputList, buttonElement, validationSelectors);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, inputElement.validationMessage,  validationSelectors);  
        toggleButtonState(inputList, buttonElement, validationSelectors);     
      });
    });
  };
  
  // Объявим функцию enableValidation, которая найдёт и переберёт все формы на странице  
   const enableValidation = (validationSelectors) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, validationSelectors);
    });
  };
  
  // Вызовем функцию
  enableValidation(validationSelectors);

 // Закрытие попапа нажатием на Esc
  document.addEventListener('keydown', (evt) => {
    if(userEditPopup.classList.contains('popup_opened') 
    || cardAddPopup.classList.contains('popup_opened') 
    || imageCardPopupOpened.classList.contains('popup_opened')) 
    {if(evt.key === 'Escape') {
       closePopup(userEditPopup);
       closePopup(cardAddPopup);
       closePopup(imageCardPopupOpened);
    }}    
})

// Закрытие попапа кликом на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
popup.addEventListener('click', function (evt) {  
    if (evt.target.classList.contains('popup'))
    closePopup(popup);
}); 
})




