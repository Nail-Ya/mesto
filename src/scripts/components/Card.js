export class Card {
  constructor(template, cardName, cardLink, {handleCardClick}) {
    this._template = template;
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
    this._likeCardListener = this._toggleLike.bind(this);
    this._deleteCardListener = this._deleteElement.bind(this);
  }

    //создание пустой карточки из шаблона
  _getTemplate() {
    return document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);
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
    this._element.querySelector('.element__like-button').addEventListener('click', this._likeCardListener);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCardListener);
    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);
  }

    // метод возможности поставить лайк
  _toggleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

    // метод возможности удалить карточку
  _deleteElement() {
    this._element.querySelector('.element__like-button').removeEventListener('click', this._likeCardListener);
    this._element.querySelector('.element__delete-button').removeEventListener('click', this._deleteCardListener);
    this._element.querySelector('.element__img').removeEventListener('click', this._handleCardClick);
    this._element.remove();
    this._element = null;
  }
}


