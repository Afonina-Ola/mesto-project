export const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_inactive',
  inactiveButtonClass: 'popup__button-close',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active',
  inputErrorClass: 'popup__item_input-error'
}

export class FormValidator {
  constructor(validationSelectors, formElement) {
    this._validationSelectors = validationSelectors;
    this._formElement = formElement;
  }

  // добавляет класс с ошибкой и показывает сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._validationSelectors.inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSelectors.errorClass);
  };

  // удаляет класс с ошибкой и скрывает сообщение об ошибке
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._validationSelectors.inputErrorClass);
    errorElement.classList.remove(this._validationSelectors.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  };

  // проверяет валидность поля
  _isValid(inputElement, validationMessage) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку. Передадим сообщение об ошибке вторым аргументом
      this._showInputError(inputElement, validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };

  // принимает массив полей формы и возвращает true, 
  // если в нём хотя бы одно поле не валидно, 
  // и false, если все валидны.
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true  
      return !inputElement.validity.valid;
    })
  };

  // нужен для стилизации, принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._validationSelectors.inactiveSubmitButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._validationSelectors.inactiveSubmitButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  };

  // примет параметром элемент формы и добавит её полям нужные обработчики   
  _setEventListeners() {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationSelectors.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._validationSelectors.submitButtonSelector);
    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    this._toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement, inputElement.validationMessage);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  // подключает валидацию к форме  
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      // У формы отменим стандартное поведение
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

