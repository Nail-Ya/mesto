// функция для закрытия попапа и удаления слушателей
function closePopup (popupElement) {
  document.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closePopupByPressingEsc);
  popupElement.classList.remove('popup_opened');
}
// функция закрытия попапа нажатием на overlay
function closeByOverlay (event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}
// функция закрытия попапа нажатием на Esc
function closePopupByPressingEsc (event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export {closePopup, closeByOverlay, closePopupByPressingEsc}
