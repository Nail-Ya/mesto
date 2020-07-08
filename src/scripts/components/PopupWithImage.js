import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupImageName = this._popupElement.querySelector('.popup__image-name');
  }

  // дополнение к родительскому методу: подстановка имени и ссылки карточки
  open(cardName, cardLink) {
    this._popupImage.src = cardLink;
    this._popupImage.alt = cardName;
    this._popupImageName.textContent = cardName;
    super.open();
  }
}
