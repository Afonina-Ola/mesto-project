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

  // универсальный метод запроса с проверкой ответа,
  // чтобы не дублировать эту проверку в каждом запросе
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  // загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
  }

  // запрос к серверу за карточками
  getCards() {
    return this._request(`${this._address}/cards`, {
      headers: this._headers,
    })

  }

  // запрос на редактирование профиля
  editUser(name, about) {
    return this._request(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  // добавление новой карточки
  addCard(name, link) {
    return this._request(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  // запрос на удаление карточки
  deleteCard(id) {
    return this._request(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  // обновление аватара пользователя
  editAvatar(link) {
    return this._request(`${this._address}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  // постановка лайка
  addLike(id) {
    return this._request(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  // снятие лайка
  removeLike(id) {
    return this._request(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

















