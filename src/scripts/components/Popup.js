export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('click', this._closeByOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('click', this._closeByOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closeByOverlay = (event) => {
    if (event.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => {
      this.close()
    });
  }
}

