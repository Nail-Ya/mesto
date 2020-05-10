const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupSaveButton = document.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

function openPopup () {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openPopup);
popupSaveButton.addEventListener('click', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);
