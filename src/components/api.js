const TOKEN = '34f1d1b4-ec71-416c-890a-2a395d08a4e1'
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12', headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// запрос к серверу за информацией о пользователе   
function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse)
}

// запрос к серверу за карточками  
function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse)
}

// запрос на редактирование профиля
function editUser(name, about) {
    return fetch(`${config.baseUrl}/users/me `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        })
    }).then(checkResponse)
}

// добавление новой карточки
function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    }).then(checkResponse)
}

// обновление аватара пользователя
function editAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    }).then(checkResponse)
}

// запрос на удаление карточки
function deleteCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse)
}

// постановка лайка
function addLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(checkResponse)
}

// снятие лайка
function removeLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse)
}

export { getCards, getUser, editUser, addCard, editAvatar, deleteCard, addLike, removeLike }