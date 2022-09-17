export class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} `);
  }

  // загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // запрос к серверу за карточками
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  // запрос на редактирование профиля
  editUser(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse)
  }

  // добавление новой карточки
  addCard(name, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkResponse)
  }

  // запрос на удаление карточки
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // обновление аватара пользователя
  editAvatar(link) {
    return fetch(`${this._address}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    }).then(this._checkResponse)
  }

  // постановка лайка
  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // снятие лайка
  removeLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }
}









