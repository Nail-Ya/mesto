import './index.css';

// импорты классов
import {Card} from './../scripts/components/Card.js';
import {FormValidator} from './../scripts/components/FormValidator.js';
import {Section} from './../scripts/components/Section.js';
import {PopupWithImage} from './../scripts/components/PopupWithImage.js';
import {PopupWithForm} from './../scripts/components/PopupWithForm.js';
import {UserInfo} from './../scripts/components/UserInfo.js';
import {PopupDeleteCard} from './../scripts/components/PopupDeleteCard.js';
import {Api} from './../scripts/components/Api.js';

// импорты констант
import {
  profileEditButton,
  profileAddButton,
  popupAddPlace,
  popupEditProfile,
  popupAddPlaceNameInput,
  popupAddPlaceLinkInput,
  nameInput,
  aboutInput,
  formOptions,
  popupChangeAvatar,
  profileAvatarChangeButton,
  popupChangeAvatarLinkInput,
  optionsApi,
} from './../scripts/utils/constants.js';

// экземпляр класса Api
const api = new Api(optionsApi);

// экземпляр класса FormValidator для валидации каждого попапа
const validationPopupAddPhoto = new FormValidator(popupAddPlace, formOptions);
const validationPopupEditProfile = new FormValidator(popupEditProfile, formOptions);
const validationPopupChangeAvatar = new FormValidator(popupChangeAvatar, formOptions);

// добавление валидации на всю страницу
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();
validationPopupChangeAvatar.enableValidation();

// экземпляр класса UserInfo с информацией о пользователе
const profileUserInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar-image');

// загрузка информации о пользователе из сервера
api
  .getUserInfo()
  .then((data) => {
    profileUserInfo.setUserInfo(data);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

// экземпляр класса PopupWithImage для попапа с большой картинкой
const popupBigImage = new PopupWithImage('.popup_open_image');
popupBigImage.setEventListeners();

// экземпляр класса Section: загрузка карточек из сервера
const cardList = new Section({
  renderer: (cardItem) => {
    const card = new Card(
      '.element-template',
      cardItem,
      api,
      {
        handleCardClick: () => {
        popupBigImage.open(cardItem.name, cardItem.link);
        },
        confirmDelete: () => {
          const confirmPopup = new PopupDeleteCard(
            '.popup_delete_card',
            api.deletePhoto(cardItem._id),
            cardItem
          );
          confirmPopup.setEventListeners();
          confirmPopup.open();
        },
      }
    );

    api
    .getUserInfo()
    .then((data) => {
      const cardElement = card.generateCard(data);
      cardList.addItem(cardElement);
    })
  }
}, '.elements');

// рендер карточек из сервера
cardList.renderItems(api.getInitialCards());

// экземпляр класса PopupWithForm для попапа редактирования профиля
const popupFormEditProfile = new PopupWithForm(
  '.popup_edit_profile',
  {
    handleFormSubmit: () => {
      popupFormEditProfile.renderLoading(true);
      const inputValues = popupFormEditProfile.getInputValues();
      api
        .updateUserInfo(inputValues)
        .then((data) => {
          userInfo.setUserInfo(data);
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
          popupFormEditProfile.renderLoading(false);
          popupFormEditProfile.close();
        });
    }
  }
);
popupFormEditProfile.setEventListeners();

// слушатель для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userInputList = profileUserInfo.getUserInfo();
  nameInput.value = userInputList.name;
  aboutInput.value = userInputList.about;
  validationPopupEditProfile.deleteError(nameInput);
  validationPopupEditProfile.deleteError(aboutInput);
  popupFormEditProfile.open();
});

// экземпляр класса PopupWithForm для попапа изменения аватарки
const popupFormChangeAvatar = new PopupWithForm(
  '.popup_change_avatar',
  {
    handleFormSubmit: () => {
      popupFormChangeAvatar.renderLoading(true);
      const inputValues = popupFormChangeAvatar.getInputValues();
      api
        .updateUserAvatar(inputValues)
        .then((data) => {
          userInfo.setNewAvatar(data);
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
        .finally(() => {
          popupFormChangeAvatar.renderLoading(false);
          popupFormChangeAvatar.close();
        });
    },
  }
);
popupFormChangeAvatar.setEventListeners();

// слушатель для открытия попапа изменения аватарки
profileAvatarChangeButton.addEventListener('click', () => {
  validationPopupChangeAvatar.deleteError(popupChangeAvatarLinkInput);
  popupFormChangeAvatar.open();
});

// экземпляр класса PopupWithForm для попапа добавления фото
const popupFormAddPlace = new PopupWithForm('.popup_add_place',
{
  handleFormSubmit: () => {
    popupFormAddPlace.renderLoading(true);
    const inputValues = popupFormAddPlace.getInputValues();
    api
      .addNewCard(inputValues)
      .then((data) => {
        const newCard = new Card('.element-template',
        cardItem,
        api,
        {
          handleCardClick: () => {
            popupBigImage.open(cardItem.name, cardItem.link);
          },
          confirmDelete: () => {
            const confirmPopup = new popupDeleteCard(
              '.popup_delete_card',
              api.deletePhoto(cardItem._id),
              cardItem
            );
            confirmPopup.open();
          },
        });
        api
          .getUserInfo()
          .then((data) => {
            const newCardElement = newCard.generateCard(data);
            cardList.addItem(newCardElement);
          })
          .catch((err) => console.log(`Произошла ошибка: ${err}`));
      })
      .catch((err) => console.log(`Произошла ошибка: ${err}`))
      .finally(() => {
        popupFormAddPlace.renderLoading(false);
        popupFormAddPlace.close();
      });
  },
});
popupFormAddPlace.setEventListeners();

// слушатель для открытия попапа добавления карточки
profileAddButton.addEventListener('click', () => {
  validationPopupAddPhoto.deleteError(popupAddPlaceNameInput);
  validationPopupAddPhoto.deleteError(popupAddPlaceLinkInput);
  popupFormAddPlace.open();
});
