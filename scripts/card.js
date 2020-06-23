
export class Card {
  constructor(template, cardName, cardLink) {
    this._template = template;
    this._cardName = cardName;
    this._cardLink = cardLink;
  }

    //создание пустой карточки из шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }

    //метод создает карточку из шаблона и заполняет его контентом
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._cardLink;
    this._element.querySelector('.element__name').textContent = this._cardName;
    this._element.querySelector('.element__img').alt = this._cardName;
    return this._element;
  }

    //метод устанавливает слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteElement();
    })

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._openPopupPhoto();
    })
  }

    // метод возможности поставить лайк
  _toggleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

    // метод возможности удалить карточку
  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  // метод закрытия попапа нажатием кнопки Esc
  _closePopupByPressingEsc (evt){
    if (evt.key === "Escape") {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      //
      //не удаляется данный слушатель
      //
      document.removeEventListener('keydown', this._closePopupByPressingEsc);
    }

  }
    // метод возможности открыть попап с увеличенной картинкой
  _openPopupPhoto() {
    const popupOpenImage = document.querySelector('.popup_open_image');
    popupOpenImage.querySelector('.popup__image-name').textContent = this._cardName;
    popupOpenImage.querySelector('.popup__image').src = this._cardLink;
    popupOpenImage.querySelector('.popup__image').alt = this._cardName;
    popupOpenImage.classList.toggle('popup_opened');

    //добавление слушателя
    document.addEventListener('keydown', this._closePopupByPressingEsc);

  }

}
