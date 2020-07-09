//import './index.css';
// импорты классов
import {Card} from './../scripts/components/Card.js';
import {FormValidator} from './../scripts/components/FormValidator.js';
import {Section} from './../scripts/components/Section.js';
import {PopupWithImage} from './../scripts/components/PopupWithImage.js';
import {PopupWithForm} from './../scripts/components/PopupWithForm.js';
import {UserInfo} from './../scripts/components/UserInfo.js';

// импорты констант
import {
  profileEditButton,
  profileAddButton,
  popupAddPlace,
  popupEditProfile,
  popupAddPlaceNameInput,
  popupAddPlaceLinkInput,
  nameInput,
  jobInput,
  formOptions,
  initialCards
} from './../scripts/utils/constants.js';

// экземпляр класса FormValidator для валидации каждого попапа
const validationPopupAddPhoto = new FormValidator(popupAddPlace, formOptions);
const validationPopupEditProfile = new FormValidator(popupEditProfile, formOptions);

// экземпляр класса UserInfo с информацией о пользователе
const profileUserInfo = new UserInfo('.profile__name', '.profile__job');

// экземпляр класса PopupWithImage для попапа с большой картинкой
const popupBigImage = new PopupWithImage('.popup_open_image');
popupBigImage.setEventListeners();

// функция для создания новой карточки
const handleFormSubmit = (data) => {
  const card = new Card(
    '.element-template',
    data.name,
    data.link,

    {
      handleCardClick: () => {
      popupBigImage.open(data.name, data.link);
      }
    }
  )
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  }


// экземпляр класса Section: загрузка карточек из начального массива
const cardList = new Section({
  items: initialCards,
  renderer: handleFormSubmit
}, '.elements');
cardList.renderItems();

// экземпляр класса PopupWithForm для попапа редактирования профиля
const popupFormEditProfile = new PopupWithForm(
  '.popup_edit_profile',
  {
    handleFormSubmit: (inputValues) => {
    profileUserInfo.setUserInfo(inputValues);
    }
  }
);
popupFormEditProfile.setEventListeners();

// слушатель для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userInputList = profileUserInfo.getUserInfo();
  nameInput.value = userInputList.name;
  jobInput.value = userInputList.job;
  validationPopupEditProfile.deleteError(nameInput);
  validationPopupEditProfile.deleteError(jobInput);
  popupFormEditProfile.open();
});

// экземпляр класса PopupWithForm для попапа добавления карточки
const popupFormAddPlace = new PopupWithForm(
  '.popup_add_place',
  { handleFormSubmit: handleFormSubmit }
);

popupFormAddPlace.setEventListeners();

// слушатель для открытия попапа добавления карточки
profileAddButton.addEventListener('click', () => {
  validationPopupAddPhoto.deleteError(popupAddPlaceNameInput);
  validationPopupAddPhoto.deleteError(popupAddPlaceLinkInput);
  popupFormAddPlace.open();
});

// добавление валидации на всю страницу
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();

