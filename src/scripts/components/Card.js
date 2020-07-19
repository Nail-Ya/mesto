export class Card {
  constructor(cardSelector, data, api, {handleCardClick, confirmDelete}) {
    this._cardSelector = cardSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._id = data._id;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
  }

    //создание пустой карточки из шаблона
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

    //метод создает карточку из шаблона и заполняет его контентом
  generateCard(userData) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._cardLink;
    this._element.querySelector('.element__name').textContent = this._cardName;
    this._element.querySelector('.element__img').alt = this._cardName;

    this._element.id = this._id;
    this._element.querySelector('.element__like-counter').textContent = `${this._likes.length}`;

    if (userData._id === this._owner._id) {
      this._element.querySelector('.element__delete-button').style.display = 'block';
    }

    if (this._likes.find((like) => like._id === userData._id)) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }

    return this._element;
  }

    //метод устанавливает слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._confirmDelete();
    });
    this._element.querySelector('.element__img').addEventListener('click', (event) => {
      this._handleCardClick(event);
    });
  }

    // метод возможности поставить лайк
  _toggleLike() {
    const likeButton = this._element.querySelector('.element__like-button');
    const likeCounter = this._element.querySelector('element__like-counter');
    if (!likeButton.classList.contains('element__like-button_active')) {
      this._api
        .likeCard(this._id)
        .then((data) => {
          likeButton.classList.add('element__like-button_active');
          likeCounter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    } else {
      this._api
        .dislikeCard(this._id)
        .then((data) => {
          likeButton.classList.remove('element__like-button_active');
          likeCounter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    }
  }
}


