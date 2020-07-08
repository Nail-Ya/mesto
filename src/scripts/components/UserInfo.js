export class UserInfo {
  constructor(userName, userJob) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  // получение данных из секции profile
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
    return this._userInfo;
  }

  // установка данных в секцию profile
  setUserInfo(inputList) {
    this._userName.textContent = inputList.name;
    this._userJob.textContent = inputList.job;
  }
}
