export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // метод для обработки ответов от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

 // получение карточек из сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  // получение данных пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  // обновление информации о пользователе
  updateUserInfo(newUserInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about
      })
    })
    .then(this._handleResponse)
  }

  // добавление новой карточки
  addNewCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(this._handleResponse)
  }

  // поставить лайк
  likeCard(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  // убрать лайк
  dislikeCard(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  // удаление фото
  deletePhoto(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  // обновление аватара профиля
  updateUserAvatar(inputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValue.avatar
      })
    })
    .then(this._handleResponse)
  }
}
