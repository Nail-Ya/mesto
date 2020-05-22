const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseButtonEditProfile = document.querySelector('.popup__close-button_edit_profile');
const popupCloseButtonAddPlace = document.querySelector('.popup__close-button_add_place');
const popupCreateButton = document.querySelector('.popup__button_type_create');
const popupSaveButton = document.querySelector('.popup__button_type_save');
const popupAddPlace = document.querySelector('.popup_add_place');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const element = cardTemplate.querySelector('.element');
const popupImage = document.querySelector('.popup__image');
const popUpImageName = document.querySelector('.popup__image-name');
const popupOpenImage = document.querySelector('.popup_open_image');
const allDocument = document.querySelector('.page');
const popupAddPlaceNameInput = document.querySelector('.popup__input_place_name');
const popupAddPlaceLinkInput = document.querySelector('.popup__input_place_link');
const popupCloseButtonImageContainer = document.querySelector('.popup__close-button_image-container');

let formElementAddPlace = document.querySelector('.popup__form_add_place');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form_edit_profile');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');

function openClosePopupEditProfile () {
  popupEditProfile.classList.toggle('popup_opened');
  if (popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openClosePopupEditProfile ();
}

profileEditButton.addEventListener('click', openClosePopupEditProfile);
popupCloseButtonEditProfile.addEventListener('click', openClosePopupEditProfile);
formElement.addEventListener('submit', formSubmitHandler);

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

// функция создания карточки
function addPhoto (cardName,cardLink) {
  const elementCopy = element.cloneNode(true);

  // добавление фото из заданного массива после перебора цикла
  elementCopy.querySelector('.element__img').setAttribute('src', cardLink);
  elementCopy.querySelector('.element__img').setAttribute('alt', cardName);
  elementCopy.querySelector('.element__name').textContent = cardName;

  // возможность поставить лайк
  elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // возможность удаления карточки
  const deleteButton = elementCopy.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
  const elementItem = deleteButton.closest('.element');
  elementItem.remove();
  });

  // открытие попапа с картинкой
  const elementImage = elementCopy.querySelector('.element__img');
  elementImage.addEventListener('click', openClosePopupOpenImage);

  // добавление в попап с картинкой: ссылки изображения, название карточки, атрибута alt изображения
  elementCopy.addEventListener('click', function (evt) {
    let popupImageLink = evt.target.closest('.element').querySelector('.element__img').src;
    let popUpImageNameText = evt.target.closest('.element').querySelector('.element__name').textContent;
    let popupImageAlt = evt.target.closest('.element').querySelector('.element__name').textContent;
    openBigImage (popupImageLink, popUpImageNameText, popupImageAlt);
  });
  elementsContainer.prepend(elementCopy);
}

// функция добавления новой карточки на сайт из попапа
function formSubmitHandlerAddPlace (evt) {
  evt.preventDefault();
  addPhoto (popupAddPlaceNameInput.value, popupAddPlaceLinkInput.value);
  openClosePopupAddPlace ();
}

// функция открытия и закрытия попапа для добавления фото на сайт
function openClosePopupAddPlace () {
  popupAddPlace.classList.toggle('popup_opened');
  popupAddPlaceNameInput.value = '';
  popupAddPlaceLinkInput.value = '';
}

// функция подстановки в попап с картинкой ссылки изображения, название карточки, атрибута alt изображения
function openBigImage (imageSrcAttribute, imageName, imageAltAttribute) {
  popupImage.setAttribute('src', imageSrcAttribute);
  popUpImageName.textContent = imageName;
  popupImage.setAttribute('alt', imageAltAttribute);
}

// открытие и закрытие попапа с картинокй
function openClosePopupOpenImage () {
  popupOpenImage.classList.toggle('popup_opened');
}

// плавное открытие и закрытие попапов
function popupSmoothExit () {
  popupEditProfile.setAttribute('style', 'transition: visibility 0.6s, opacity 0.6s;');
  popupAddPlace.setAttribute('style', 'transition: visibility 0.6s, opacity 0.6s;');
  popupOpenImage.setAttribute('style', 'transition: visibility 0.6s, opacity 0.6s;');
}

// цикл для перебора заданного массива со ссылками и названиями картинок
for (let i = 0; i < initialCards.length; i++) {
  let name = initialCards[i].name;
  let link = initialCards[i].link;
  addPhoto (name, link);
}

profileAddButton.addEventListener('click', openClosePopupAddPlace);
popupCloseButtonAddPlace.addEventListener('click', openClosePopupAddPlace);
formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);
popupCloseButtonImageContainer.addEventListener('click', openClosePopupOpenImage);
allDocument.addEventListener('click', popupSmoothExit);
