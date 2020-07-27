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
  avatarImg
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
const profileUserInfo = new UserInfo('.profile__name', '.profile__job');

// загрузка информации о пользователе из сервера
api
  .getUserInfo()
  .then((data) => {
    profileUserInfo.setUserInfo(data);
    avatarImg.src = data.avatar;
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

// экземпляр класса PopupWithImage для попапа с большой картинкой
const popupBigImage = new PopupWithImage('.popup_open_image');
popupBigImage.setEventListeners();

const generatingCard = (cardItem) => {
  // экземпляр класса PopupDeleteCard для попапа с подтверждением удаления
  const deletePopup = new PopupDeleteCard('.popup_delete_card', {
    handleDelete: () => {
      api
        .deletePhoto(cardItem)
        .then(() => card.deleteCards())
        .catch(err => console.log(`Ошибка: ${err}`))
    }
  });
  // экземпляр класса Card для создания новой карточки
  const card = new Card('.element-template', cardItem,
    {
      // подстановка имени карточки и ссылки в экземпляр класса PopupWithImage для попапа с большой картинкой
      handleCardClick: () => {
        popupBigImage.open(cardItem.name, cardItem.link);
      },
      // добавление лайка к карточке
      handleLikeTurnOn: () => {
        api
          .likeCard(cardItem)
          .then(() => {
            card.addLike();
            card.addLikeCounter();
          })
          .catch(err => console.log(`Ошибка: ${err}`))
      },
      // удаление лайка с карточки
      handleLikeTurnOff: () => {
        api
          .dislikeCard(cardItem)
          .then(() => {
            card.removeLike();
            card.removeLikeCounter();
          })
          .catch(err => console.log(`Ошибка: ${err}`))
      },
      // передача в слушатель при нажатии на корзину
      confirmDeletePopupOpen: () => {
        deletePopup.open();
        deletePopup.setEventListeners();
      }
    }
  )

  const cardElement = card.generateCard();

  api
    .getUserInfo()
    .then((data) => {
    // показывает иконку корзины, если карточка добавлена мной
      if ((cardItem.owner._id === data._id)) {
        cardElement.querySelector('.element__delete-button').classList.remove('element__delete-button_disactive');
      }
      // показывает мои лайки
      cardItem.likes.forEach(item => {
        if ((item._id === data._id)) {
          card.addLike();
        }
      })
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  return cardElement;
}

// выгрузка карточек с сервера на страницу
api
  .getInitialCards()
  .then(res => {
    const cardList = new Section({
      items: res,
      renderer: (cardItem) => {
        const card = generatingCard(cardItem);
        cardList.addItem(card);
      }
    }, '.elements');

    cardList.renderItems();

    // экземпляр класса PopupWithForm для попапа добавления карточки
    const popupFormAddPlace = new PopupWithForm('.popup_add_place',
    {
      handleFormSubmit: (inputValues) => {
        api
          .addNewCard(inputValues)
          .then((res) => {
            popupFormAddPlace.renderLoading('Сохранение...');
            const cardElement = generatingCard(res);
            cardElement.querySelector('.element__delete-button').classList.remove('element__delete-button_disactive');
            cardList.addItem(cardElement);
          })
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => {
            popupFormAddPlace.renderLoading('Создать');
          });
      }
    })
    popupFormAddPlace.setEventListeners();

    // слушатель для открытия попапа добавления карточки
    profileAddButton.addEventListener('click', () => {
      validationPopupAddPhoto.deleteError(popupAddPlaceNameInput);
      validationPopupAddPhoto.deleteError(popupAddPlaceLinkInput);
      popupFormAddPlace.open();
    });

  })
  .catch(err => console.log(`Ошибка: ${err}`))

// экземпляр класса PopupWithForm для попапа редактирования профиля
const popupFormEditProfile = new PopupWithForm(
  '.popup_edit_profile',
  {
    handleFormSubmit: (inputValues) => {
      popupFormEditProfile.renderLoading('Сохранение...');
      api
        .updateUserInfo(inputValues)
        .then((data) => {
          profileUserInfo.setUserInfo(data);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          popupFormEditProfile.renderLoading('Сохранить');
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
    handleFormSubmit: (inputValues) => {
      popupFormChangeAvatar.renderLoading('Сохранение...');
      api
        .updateUserAvatar(inputValues)
        .then((data) => {
          avatarImg.src = data.avatar;
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          popupFormChangeAvatar.renderLoading('Сохранить');
        });
    }
  }
);
popupFormChangeAvatar.setEventListeners();

// слушатель для открытия попапа изменения аватарки
profileAvatarChangeButton.addEventListener('click', () => {
  validationPopupChangeAvatar.deleteError(popupChangeAvatarLinkInput);
  popupFormChangeAvatar.open();
});
