// объект с настройками
const argument = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
}

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
  // вызов функции handleFormInput чтобы кнопка была неактивной при открытии попапа если поля ввода пустые
  handleFormInput(formElement, buttonElement, argument.inactiveButtonClass);
  // Обхожу все элементы полученного массива
  inputList.forEach((inputElement) => {
    // каждому полю добавляю обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбека вызываю isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, argument);
    });
  });
  formElement.addEventListener('input', () => handleFormInput(formElement, buttonElement, argument.inactiveButtonClass));
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

// включаем / выключаем кнопку в зависимости от валидности формы
function handleFormInput(formElement, submitButton, inactiveButtonClass){
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors);
}

enableValidation(argument);
