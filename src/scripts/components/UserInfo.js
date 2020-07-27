export class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
  }

  // получение данных из секции profile
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
    return this._userInfo;
  }

  // установка данных в секцию profile
  setUserInfo(inputList) {
    this._userName.textContent = inputList.name;
    this._userAbout.textContent = inputList.about;
    this._userAvatar.src = inputList.avatar;
  }
}
