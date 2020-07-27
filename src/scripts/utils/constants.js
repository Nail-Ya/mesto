export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_add_place');
export const popupEditProfile = document.querySelector('.popup_edit_profile');
export const popupAddPlaceNameInput = document.querySelector('.popup__input_place_name');
export const popupAddPlaceLinkInput = document.querySelector('.popup__input_place_link');
export const nameInput = document.querySelector('.popup__input_edit_name');
export const aboutInput = document.querySelector('.popup__input_edit_job');
export const popupChangeAvatar = document.querySelector('.popup_change_avatar');
export const profileAvatarChangeButton = document.querySelector('.profile__avatar-change-button');
export const popupChangeAvatarLinkInput = document.querySelector('.popup__input_avatar_link');

// объект с настройками
export const formOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
}

// настройки для api
export const optionsApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '6a6590f2-fa1d-4bcf-b825-767ca836c27c',
    'Content-Type': 'application/json',
  },
};
