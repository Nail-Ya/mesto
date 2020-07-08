import './index.css';
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
  elementsContainer,
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

// экземпляр класса Section: загрузка карточек из начального массива
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card('.element-template', cardItem.name, cardItem.link,
      {
        handleCardClick: () => {
          popupBigImage.open(cardItem.name, cardItem.link);
        }
      }
    )
    const cardElement = card.generateCard();
    popupBigImage.setEventListeners();
    cardList.addItem(cardElement);
  }
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
  popupFormEditProfile.open();
  const userInputList = profileUserInfo.getUserInfo();
  nameInput.value = userInputList.name;
  jobInput.value = userInputList.job;
  validationPopupEditProfile.deleteError(nameInput);
  validationPopupEditProfile.deleteError(jobInput);
});

// экземпляр класса PopupWithForm для попапа добавления карточки
const popupFormAddPlace = new PopupWithForm(
  '.popup_add_place',
  {
    handleFormSubmit: (inputValues) => {
    const card = new Card(
      '.element-template',
      inputValues.name,
      inputValues.link,

      {
        handleCardClick: () => {
        popupBigImage.open(inputValues.name, inputValues.link);
        }
      }
    )

    const cardElement = card.generateCard();
    popupBigImage.setEventListeners();
    elementsContainer.prepend(cardElement);
    }
  }
);

popupFormAddPlace.setEventListeners();

// слушатель для открытия попапа добавления карточки
profileAddButton.addEventListener('click', () => {
  popupFormAddPlace.open();
  validationPopupAddPhoto.deleteError(popupAddPlaceNameInput);
  validationPopupAddPhoto.deleteError(popupAddPlaceLinkInput);
});

// добавление валидации на всю страницу
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();

