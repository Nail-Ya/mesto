export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByOverlay = this._closeByOverlay.bind(this);
  }

  // открытие попапов
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('click', this._closeByOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие попапов
  close() {
    document.removeEventListener('click', this._closeByOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');
  }

  // закрытие попапов нажатием на клавишу Esc
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // закрытие попапов нажатием на оверлей
  _closeByOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // установка слушателя на кнопку с крестиком для закрытие попапа
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}

