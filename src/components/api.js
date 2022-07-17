const TOKEN = '34f1d1b4-ec71-416c-890a-2a395d08a4e1'
const BASE_URL = 'https://nomoreparties.co/v1/plus-cohort-12'

// запрос к серверу за информацией о пользователе   
function getUser() {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            authorization: TOKEN
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

// запрос к серверу за карточками  
function getCards() {
    return fetch(`${BASE_URL}/cards`, {
        headers: {
            authorization: TOKEN
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

// запрос на редактирование профиля
function editUser(name, about) {
    return fetch(`${BASE_URL}/users/me `, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// добавление новой карточки
function addCard(name, link) {
    return fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// обновление аватара пользователя
function editAvatar(link) {
    return fetch(`${BASE_URL}/users/me/avatar `, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// запрос на удаление карточки
function deleteCard(id) {
    return fetch(`${BASE_URL}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// постановка лайка
function addLike(id) {
    return fetch(`${BASE_URL}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// снятие лайка
function removeLike(id) {
    return fetch(`${BASE_URL}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { getCards, getUser, editUser, addCard, editAvatar, deleteCard, addLike, removeLike }