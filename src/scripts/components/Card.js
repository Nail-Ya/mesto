export class Card {
  constructor(cardSelector, data, {handleCardClick, handleLikeTurnOn, handleLikeTurnOff, confirmDeletePopupOpen}) {
    this._cardSelector = cardSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._confirmDeletePopupOpen = confirmDeletePopupOpen;
    this._handleLikeTurnOn = handleLikeTurnOn;
    this._handleLikeTurnOff = handleLikeTurnOff;
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__img');
    this._imageName = this._element.querySelector('.element__name');
    this._controlLike = this._controlLike.bind(this);
  }

    //создание пустой карточки из шаблона
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    this._element = cardElement;
    return cardElement;
  }

    //метод создает карточку из шаблона и заполняет его контентом
  generateCard() {
    this._setEventListeners();
    this._image.src = this._cardLink;
    this._imageName.textContent = this._cardName;
    this._image.alt = this._cardName;
    this._likeCounter.textContent = this._likes;
    return this._element;
  }

  // добавить лайк
  addLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  // убрать лайк
  removeLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  // прибавить лайк к счетчику лайков
  addLikeCounter() {
    this._likeCounter.textContent++;
  }

  // вычесть лайк у счетчика лайков
  removeLikeCounter() {
    this._likeCounter.textContent--;
  }

  // контроллирование моих лайков
  _controlLike(event) {
    if(event.target.classList.contains('element__like-button_active')) {
      this._handleLikeTurnOff();
    } else {
      this._handleLikeTurnOn();
    }
  }

    //метод устанавливает слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._controlLike);
    this._image.addEventListener('click', this._handleCardClick);
    this._deleteButton.addEventListener('click', this._confirmDeletePopupOpen);
  }

  // метод удаляет слушатели
  _removeEventListeners() {
    this._likeButton.removeEventListener('click', this._controlLike);
    this._image.removeEventListener('click', this._handleCardClick);
    this._deleteButton.removeEventListener('click', this._confirmDeletePopupOpen);
  }

  // удаление карточки
  deleteCards() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }
}


