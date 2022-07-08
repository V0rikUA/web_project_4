export default class UserInput {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userProfessionElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return { userName: this._userNameElement.textContent, userJob: this._userProfessionElement.textContent };
  }

  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userProfessionElement.textContent = userJob;
  }
}
