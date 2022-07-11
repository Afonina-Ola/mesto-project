import { closePopup } from './utils.js'
import { userEditPopup, cardAddPopup } from './index.js'
    
const imageCardPopupOpened = document.querySelector('#cardOpened');
const imageClosePopupButton = document.querySelector('#imageClose');


// Закрытие попапа нажатием на Esc
document.addEventListener('keydown', (evt) => {
    if(userEditPopup.classList.contains('popup_opened') 
    || cardAddPopup.classList.contains('popup_opened') 
    || imageCardPopupOpened.classList.contains('popup_opened')) 
    {if(evt.key === 'Escape') {
       closePopup(userEditPopup);
       closePopup(cardAddPopup);
       closePopup(imageCardPopupOpened);
    }}    
})

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

export { imageCardPopupOpened, imageClosePopupButton }