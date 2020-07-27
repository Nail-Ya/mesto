import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, {handleDelete}) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._deleteCard = this._deleteCard.bind(this);
  }

  _deleteCard(evt) {
    evt.preventDefault();
    this._handleDelete();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._deleteCard);
  }

  close() {
    super.close();
    this._popupElement.removeEventListener('submit', this._deleteCard);
  }
}
