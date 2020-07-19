import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, api, card) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._api = api;
    this._card = card;
  }

  //Установить слушатели событий
  _setEventListeners() {
    super._setEventListeners();
    const deleteFunction = (event) => {
      event.preventDefault();
      this._api.then(() => {
        document.querySelector('#this._card._id').remove();
      });
      this._formElement.removeEventListener('submit', deleteFunction);
      this.close();
    };
    this._formElement.addEventListener('submit', deleteFunction);
  }
}
