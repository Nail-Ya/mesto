export class FormValidator {
  constructor(formElement, formOptions) {
    this._formElement = formElement;
    this._formOptions = formOptions;
    this._submitButton = this._formElement.querySelector(this._formOptions.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formOptions.inputSelector));
  }

  //добавление класса с ошибкой
  _showInputError(element) {
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);
    element.classList.add(this._formOptions.inputErrorClass);

 // Заменяю содержимое span с ошибкой на переданный параметр
    errorElement.textContent = element.validationMessage;
    errorElement.classList.add(this._formOptions.errorClass);
  }

  //удаление класса с ошибкой
  _hideInputError(element) {
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);
    element.classList.remove(this._formOptions.inputErrorClass);
    errorElement.classList.remove(this._formOptions.errorClass);
    errorElement.textContent = '';
  }

  // проверка всех инпутов формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //блокировка кнопки если инпут невалидный
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._formOptions.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._formOptions.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  //проверка валидности инпута
  _isValid(element) {
    if (!element.validity.valid) {
      this._showInputError(element);
    } else this._hideInputError(element);
  }

  // публичный метод для включения валидации конкретной формы
  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
  }

  // публичный метод для использования в index.js
  deleteError(inputElement) {
    this._hideInputError(inputElement);
    this._toggleButtonState();
  }
}
