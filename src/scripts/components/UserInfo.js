export class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
  }

  // получение данных из секции profile
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
    return this._userInfo;
  }

  // установка данных в секцию profile
  setUserInfo(inputList) {
    this._userName.textContent = inputList.name;
    this._userAbout.textContent = inputList.about;
  }
}
