import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, {handleDelete}) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._deleteCard = this._deleteCard.bind(this);
  }

  // метод содержащий отмену стандартного поведения формы и метод для удаления карточки в дальнейшем на сервере и из DOM
  _deleteCard(evt) {
    evt.preventDefault();
    this._handleDelete();
  }

  // дополнение к родительскому методу: добавление слушателя к форме
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._deleteCard);
  }

  // дополнение к родительскому методу: удаление слушателя с формы
  close() {
    super.close();
    this._popupElement.removeEventListener('submit', this._deleteCard);
  }
}
