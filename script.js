// профайл
const profileName = document.querySelector('.profile__author');
const profileEditButton = document.querySelector('.profile__stilus');
const profileJob = document.querySelector('.profile__about-the-author');
const profileAddButton = document.querySelector('.profile__add-button');
// окно заполнения данных о пользователе
const userEditPopup = document.querySelector('#userInfo');
const userFormElement = document.querySelector('#userForm');
const userNameInput = document.querySelector('#username');
const userJobInput = document.querySelector('#userjob');
const userCloseButton = document.querySelector('#userInfoClose');
// окно добавления карточки
const cardAddPopup = document.querySelector('#cardInfo');
const cardAddForm = document.querySelector('#cardInfoSubmit');
const cardInputMesto = document.querySelector('#mesto');
const cardInputHref = document.querySelector('#mestoHref');
const cardCloseButton = document.querySelector('#cardInfoClose');
// окно картинки в увеличенном масштабе
const imageCardPopupOpened = document.querySelector('#cardOpened');
const imageOpened = document.querySelector('.popup__image');
const imageTextOpened = document.querySelector('.popup__image-text');
const imageClosePopupButton = document.querySelector('#imageClose');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function clearInputs(form) {
    form.reset();
}

function openUserEditPopup() {
    userNameInput.value = profileName.textContent;
    userJobInput.value = profileJob.textContent;
    openPopup(userEditPopup);
}

profileEditButton.addEventListener('click', openUserEditPopup);
userCloseButton.addEventListener('click', function () {
    closePopup(userEditPopup);
})

function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = userNameInput.value;
    profileJob.textContent = userJobInput.value;       
    closePopup(userEditPopup);
}
userFormElement.addEventListener('submit', submitFormHandler);

profileAddButton.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

cardCloseButton.addEventListener('click', function () {
    closePopup(cardAddPopup);
})

const cardTemplate = document.querySelector('#cardMesto').content;
const cardOnline = document.querySelector('.cards');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(link, name) {
    const initialCardsElement = cardTemplate.cloneNode(true);
    const cardImage = initialCardsElement.querySelector('.card__mask-group');
    cardImage.src = link;
    cardImage.alt = name;
    initialCardsElement.querySelector('.card__text').textContent = name;
    initialCardsElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
    initialCardsElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    initialCardsElement.querySelector('.card__mask-group').addEventListener('click', function (evt) {
        openPopup(imageCardPopupOpened);        
        imageOpened.src = link;
        imageTextOpened.textContent = name;
        imageOpened.alt = name;
    });   
    return initialCardsElement;
}

function renderCard(link, name, position = "end") {
    const card = createCard(link, name);
    if (position === 'start') {
        cardOnline.prepend(card);
    } else {
        cardOnline.append(card);
    }
}

initialCards.forEach(function (element) {
    renderCard(element.link, element.name)
});

function submitMesto(evt) {
    evt.preventDefault();
    renderCard(cardInputHref.value, cardInputMesto.value, 'start');
    closePopup(cardAddPopup);
    clearInputs(cardAddForm);
}

cardAddForm.addEventListener('submit', submitMesto);

imageClosePopupButton.addEventListener('click', function () {
    closePopup(imageCardPopupOpened);
})

