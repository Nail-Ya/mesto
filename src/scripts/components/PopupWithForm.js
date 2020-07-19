import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
  }

  // запись данных из импута в объект this._formValues
  getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this.getInputValues());
      this.close();
    })
  }

  // дополнение к методу родительского класса: стирание введенных данных при повторном открытии попапа
  close() {
    super.close();
    this._form.reset();
  }

  // изображение состояния загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = `Сохранение...`;
    } else {
      this._button.textContent = this._buttonText;
    }
  }
}

