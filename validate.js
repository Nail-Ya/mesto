// Функция для добавления класса с ошибкой
function showInputError (formElement, inputElement, errorMessage, argument) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(argument.inputErrorClass);
   // Заменяю содержимое span с ошибкой на переданный параметр
   errorElement.textContent = errorMessage;
   errorElement.classList.add(argument.errorClass);
};

// Функция для удаления класса с ошибкой
function hideInputError (formElement, inputElement, argument) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(argument.inputErrorClass);
  errorElement.classList.remove(argument.errorClass);
  // Удаление текста ошибки
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
function isValid (formElement, inputElement, argument) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажет ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, argument);
  } else {
    // Если поле проходит валидацию, скроет ошибку
    hideInputError(formElement, inputElement, argument);
  }
};

function setEventListeners (formElement, argument) {
  // Беру псевдомассив инпутов и превращаю его в обычный массив
  const inputList = Array.from(formElement.querySelectorAll(argument.inputSelector));
  // Нахожу в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(argument.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, argument.inactiveButtonClass);
  // Обхожу все элементы полученного массива
  inputList.forEach((inputElement) => {
    // каждому полю добавляю обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбека вызываю isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, argument);
      // Вызываю toggleButtonState и передаю ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, argument.inactiveButtonClass);
    });
  });
};

function enableValidation (argument) {
  // Нахожу псевдомассив форм и превращаю его в массив
  const formList = Array.from(document.querySelectorAll(argument.formSelector));
  // Перебираю массив
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменяю стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызываю setEventListeners передав форму как аргумент
    setEventListeners(formElement, argument);
  });
};

// Функция принимает массив полей
function hasInvalidInput (inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделает кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    // иначе сделает кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
});
