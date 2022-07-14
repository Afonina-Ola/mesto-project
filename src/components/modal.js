const imageCardPopupOpened = document.querySelector('#cardOpened');
const imageClosePopupButton = document.querySelector('#imageClose');
const ESC_CODE = 'Escape';

function openPopup(popup) {    
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

// Закрытие попапа нажатием на Esc
function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// Закрытие попапа кликом на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup'))
            closePopup(popup);
    });
})

imageClosePopupButton.addEventListener('click', function () {
    closePopup(imageCardPopupOpened);
})

export { openPopup, closePopup, imageCardPopupOpened, imageClosePopupButton, closeByEsc }