export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // заготовка запроса
  _sendRequest(pathway, parameters) {
    return fetch(`${this._url}${pathway}`, parameters)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

 // получение карточек из сервера
  getInitialCards() {
    return this._sendRequest(`cards`, {
      headers: this._headers
    });
  }

  // получение данных пользователя
  getUserInfo() {
    return this._sendRequest(`users/me`, {
      headers: this._headers,
    });
  }

  // обновление информации о пользователе
  updateUserInfo(newUserInfo) {
    return this._sendRequest(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about,
      }),
    });
  }

  // добавление новой карточки
  addNewCard(newCard) {
    return this._sendRequest(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      headers: this._headers,
    });
  }

  // поставить лайк
  likeCard(id) {
    return this._sendRequest(`cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  // убрать лайк
  dislikeCard(id) {
    return this._sendRequest(`cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // удаление фото
  deletePhoto(id) {
    return this._sendRequest(`cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // обновление аватара профиля
  updateUserAvatar(avatar) {
    return this._sendRequest(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatar.url }),
      headers: this._headers,
    });
  }
}
