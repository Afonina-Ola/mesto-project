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
const formElement = document.querySelector('.popup__form');

// Функция добавляет класс с ошибкой и показывает сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationSelectors) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);   
  inputElement.classList.add(validationSelectors.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.errorClass);
};

// Функция удаляет класс с ошибкой и скрывает сообщение об ошибке
const hideInputError = (formElement, inputElement, validationSelectors) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(validationSelectors.inputErrorClass);  
  errorElement.classList.remove(validationSelectors.errorClass);
   // Очистим ошибку
  errorElement.textContent = '';
};

// Функция проверяет валидность поля
const isValid = (formElement, inputElement, validationMessage, validationSelectors) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку. Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, validationMessage, validationSelectors);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationSelectors);
  }
};
 
// функция принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, 
// и false, если все валидны.
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
  
  export { enableValidation, validationSelectors } 