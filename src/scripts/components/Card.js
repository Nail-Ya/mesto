export class Card {
  constructor(template, cardName, cardLink, {handleCardClick}) {
    this._template = template;
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
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
}


