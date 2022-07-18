import { closePopup, imageCardPopupOpened, openPopup } from "./modal.js";
import { cardDeletePopup } from "./index.js";
import { getCards, deleteCard, removeLike, addLike } from "./api.js";

const cardTemplate = document.querySelector("#cardMesto").content;
const cardOnline = document.querySelector(".cards");

const cardDeleteSubmitButton = document.querySelector(
  "#cardDeleteSubmitButton"
);

const imageOpened = document.querySelector(".popup__image");
const imageTextOpened = document.querySelector(".popup__image-text");

// id карточки, которую нужно удалить
let targetCardToDelete;

// проверить есть ли мой лайк
function checkIsMyLike(likes, userId) {
  let isLike = false;
  likes.forEach((item) => {
    if (item._id === userId) {
      isLike = true;
    }
  });
  return isLike;
}

// поставить и удалить лайк
function toggleLike(id, counter, likeButton) {
  if (likeButton.classList.contains("card__like-button_active")) {
    removeLike(id)
      .then((data) => {
        counter.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(id)
      .then((data) => {
        counter.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// удаление карточки после подтвержения
function confirmDeletionCard(card) {
  cardDeleteSubmitButton.textContent = "Удаление...";
  deleteCard(card.id)
    .then(() => {
      closePopup(cardDeletePopup);
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardDeleteSubmitButton.textContent = "Да";
    });
}

function createCard(link, name, likes, ownerId, cardId, userId) {
  const initialCardsElement = cardTemplate.cloneNode(true);
  const likeButton = initialCardsElement.querySelector(".card__like-button");
  const counter = initialCardsElement.querySelector(".card__like-counter");
  const cardName = initialCardsElement.querySelector(".card__text");
  const cardImage = initialCardsElement.querySelector(".card__mask-group");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  counter.textContent = likes.length;

  if (checkIsMyLike(likes, userId)) {
    likeButton.classList.add("card__like-button_active");
  }
  likeButton.addEventListener("click", () => {
    toggleLike(cardId, counter, likeButton);
  });
  if (ownerId === userId) {

    initialCardsElement.querySelector(".card__trash-button")
      .addEventListener("click", () => {
        targetCardToDelete = null;
        openPopup(cardDeletePopup);
        targetCardToDelete = cardImage.closest('.card');
        targetCardToDelete.id = cardId;
      });
  } else {
    initialCardsElement.querySelector(".card__trash-button")
      .classList.add("card__trash-button_hidden");
  }
  cardImage.addEventListener("click", function () {
    openPopup(imageCardPopupOpened);
    imageOpened.src = link;
    imageTextOpened.textContent = name;
    imageOpened.alt = name;
  });
  return initialCardsElement;
}

// получение и отрисовка карточек
function fetchCards(userId) {
  getCards()
    .then((cards) => {
      cards.forEach(function (card) {
        renderCard(
          card.link,
          card.name,
          card.likes,
          card.owner._id,
          card._id,
          userId
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderCard(
  link,
  name,
  likes,
  ownerId,
  cardId,
  userId,
  position = "end"
) {
  const card = createCard(link, name, likes, ownerId, cardId, userId);
  if (position === "start") {
    cardOnline.prepend(card);
  } else {
    cardOnline.append(card);
  }
}

export {
  renderCard,
  fetchCards,
  confirmDeletionCard,
  targetCardToDelete,
};
