export class FormValidator {
  constructor(formElement, formOptions) {
    this._formElement = formElement;
    this._formOptions = formOptions;
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
  _hideInputError(element) { //скрытие ошибки
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);
    element.classList.remove(this._formOptions.inputErrorClass); //'popup__input_error'
    errorElement.classList.remove(this._formOptions.errorClass);
    errorElement.textContent = '';
  }
  // проверка всех инпутов формы
  _hasInvalidInput() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formOptions.inputSelector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  //блокировка кнопки если инпут невалидный
  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(this._formOptions.submitButtonSelector);

    if (this._hasInvalidInput()) {
      submitButton.classList.add(this._formOptions.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._formOptions.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  //проверка валидности инпута
  _isValid(element) {
    if (!element.validity.valid) {
      this._showInputError(element);
    } else this._hideInputError(element);
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formOptions.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }

  // публичный метод для использования в index.js
  deleteError(inputElement) {
    this._hideInputError(inputElement);
    this._toggleButtonState();
  }
}
