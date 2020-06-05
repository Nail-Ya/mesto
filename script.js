// массив из задания проектной работы
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCreateButton = document.querySelector('.popup__button_type_create');
const popupSaveButton = document.querySelector('.popup__button_type_save');
const popupAddPlace = document.querySelector('.popup_add_place');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const elementsContainer = document.querySelector('.elements');
const imageCardTemplate = document.querySelector('.element-template').content;
const cardElement = imageCardTemplate.querySelector('.element');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupOpenImage = document.querySelector('.popup_open_image');
const popupAddPlaceNameInput = document.querySelector('.popup__input_place_name');
const popupAddPlaceLinkInput = document.querySelector('.popup__input_place_link');
const formElementAddPlace = document.querySelector('.popup__form_add_place');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElementEditProfile = document.querySelector('.popup__form_edit_profile');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_job');
const popups = document.querySelector('.popups');

const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//функция для сбрасывания ошибок у формы
function resetError (formItem, inputItem) {
  const errorItem = formItem.querySelector(`#${inputItem.id}-error`);
  inputItem.classList.remove('popup__input_type_error');
  errorItem.classList.remove('popup__input_error_active');
  errorItem.textContent = '';
}


function openPopupEditProfile () {
  popupEditProfile.classList.toggle('popup_opened');
  if (popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  enableValidation(formValidationOptions);
  document.addEventListener('keydown', closePopupByPressingEsc);
  // сбрасывание ошибки в импутах при повторном открытии попапа
  /* resetError(formElementEditProfile, nameInput);
  resetError(formElementEditProfile, jobInput); */
}

// функция изменения имени и рода деятельности в секции profile
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openPopupEditProfile();
}

profileEditButton.addEventListener('click', openPopupEditProfile);
formElementEditProfile.addEventListener('submit', formSubmitHandler);

// функция создания карточки
function addPhoto (cardName,cardLink) {
  const elementCopy = cardElement.cloneNode(true);

  // добавление фото из заданного массива
  const elementImage = elementCopy.querySelector('.element__img');
  elementImage.src = cardLink;
  elementImage.alt = cardName;
  elementCopy.querySelector('.element__name').textContent = cardName;

  // возможность поставить лайк
  const elementLikeButton = elementCopy.querySelector('.element__like-button');
  elementLikeButton.addEventListener('click', function () {
    elementLikeButton.classList.toggle('element__like-button_active');
  });

  // возможность удаления карточки
  const deleteButton = elementCopy.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.element');
    elementItem.remove();
  });

  // добавление в попап с картинкой: ссылки изображения, название карточки, атрибута alt изображения
  elementImage.addEventListener('click', function (event) {
    document.addEventListener('keydown', closePopupByPressingEsc);
    popupOpenImage.classList.add('popup_opened');
    const eventTarget = event.target.closest('.element');
    const popupImageLink = eventTarget.querySelector('.element__img').src;
    const popupImageTextAndAltAttribute = eventTarget.querySelector('.element__name').textContent;
    openBigImage(popupImageLink, popupImageTextAndAltAttribute);
  });
  elementsContainer.prepend(elementCopy);
}

// функция подстановки в попап с картинкой ссылки изображения, название карточки, атрибута alt изображения
function openBigImage (imageSrcAttribute, imageTextAndAltAtrribute) {
  popupImage.src = imageSrcAttribute;
  popupImageName.textContent = imageTextAndAltAtrribute;
  popupImage.alt = imageTextAndAltAtrribute;
}

// функция открытия попапа для добавления фото на сайт
function openPopupAddPlace (formValidationOptions) {
  popupAddPlace.classList.toggle('popup_opened');
  popupAddPlaceNameInput.value = '';
  popupAddPlaceLinkInput.value = '';
  document.addEventListener('keydown', closePopupByPressingEsc);
    //делаю кнопку нективной при повторном открытии попапа
    popupCreateButton.classList.add('popup__button_disabled');
    popupCreateButton.setAttribute('disabled', 'true');

  //сбрасывание ошибки в импутах при повторном открытии попапа

  hideInputError (formElementAddPlace, popupAddPlaceNameInput, formValidationOptions);
  hideInputError (formElementAddPlace, popupAddPlaceLinkInput, formValidationOptions);

}

// функция добавления новой карточки на сайт из попапа
function formSubmitHandlerAddPlace (event) {
  event.preventDefault();
  addPhoto(popupAddPlaceNameInput.value, popupAddPlaceLinkInput.value);
  openPopupAddPlace();
  document.removeEventListener('keydown', closePopupByPressingEsc);
}

//метод forEach для обхода массива
initialCards.forEach(function (item) {
  const name = item.name;
  const link = item.link;
  addPhoto(name, link);
})

profileAddButton.addEventListener('click', openPopupAddPlace);
formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

// функция для закрытия попапов
function closePopup (event) {
  if (event.target.classList.contains("popup_opened") || event.target.closest('.popup__close-button')){
    event.target.closest('.popup').classList.toggle('popup_opened');
    document.removeEventListener('keydown', closePopupByPressingEsc);
  }
}

popups.addEventListener('click', closePopup);

//функция закрытия попапов по нажатию клавиши Esc
function closePopupByPressingEsc (event){
  if (event.key === "Escape") {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByPressingEsc);
  }
}



