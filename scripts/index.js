import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCard.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add_place');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const elementsContainer = document.querySelector('.elements');
const popupOpenImage = document.querySelector('.popup_open_image');
const popupAddPlaceNameInput = document.querySelector('.popup__input_place_name');
const popupAddPlaceLinkInput = document.querySelector('.popup__input_place_link');
const formElementAddPlace = document.querySelector('.popup__form_add_place');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElementEditProfile = document.querySelector('.popup__form_edit_profile');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_job');
const popupEditProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const popupAddPlaceCloseButton = document.querySelector('.popup__close-button_add-place');
const popupImageCloseButton = document.querySelector('.popup__close-button_image-container');

// объект с настройками
const formOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
}

const validationPopupAddPhoto = new FormValidator(popupAddPlace, formOptions);
const validationPopupEditProfile = new FormValidator(popupEditProfile, formOptions);

// функция для открытия попапа и добавления слушателей
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closePopupByPressingEsc);
}

// функция для закрытия попапа и удаления слушателей
function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closePopupByPressingEsc);
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

// функция закрытия попапа нажатием на кнопку крестик
function closePopupByButton(event) {
  closePopup(event.target.closest('.popup'));
}

popupEditProfileCloseButton.addEventListener('click', closePopupByButton);
popupAddPlaceCloseButton.addEventListener('click', closePopupByButton);
popupImageCloseButton.addEventListener('click', closePopupByButton);

// функция открытия попапа редактирования профиля
function openPopupEditProfile () {
  openPopup(popupEditProfile);
  if (popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  // удаление ошибок при повторном открытии
  validationPopupEditProfile.deleteError(nameInput);
  validationPopupEditProfile.deleteError(jobInput);
}

profileEditButton.addEventListener('click', openPopupEditProfile);

// функция изменения имени и рода деятельности в секции profile
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElementEditProfile.addEventListener('submit', formSubmitHandler);

// функция открытия попапа для добавления фото на сайт
function openPopupAddPlace () {
  openPopup(popupAddPlace);
  popupAddPlaceNameInput.value = '';
  popupAddPlaceLinkInput.value = '';
  //удаление ошибок при повторном открытии
  validationPopupAddPhoto.deleteError(popupAddPlaceNameInput);
  validationPopupAddPhoto.deleteError(popupAddPlaceLinkInput);
}

profileAddButton.addEventListener('click', openPopupAddPlace);

// функция добавления новой карточки на сайт из попапа
function formSubmitHandlerAddPlace (event) {
  event.preventDefault();
  const card = new Card('.element-template', popupAddPlaceNameInput.value, popupAddPlaceLinkInput.value);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  cardElement.querySelector('.element__img').addEventListener('click', () => {
    openPopup(popupOpenImage);
  })
  closePopup(popupAddPlace);
}

formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

//метод forEach для обхода массива
initialCards.forEach(function (item) {
  const card = new Card('.element-template', item.name, item.link);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  cardElement.querySelector('.element__img').addEventListener('click', () => {
    openPopup(popupOpenImage);
  })
})

// вызов метода валидации
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();
