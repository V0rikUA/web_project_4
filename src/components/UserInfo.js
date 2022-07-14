export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userProfessionElement = document.querySelector(userJobSelector);
  }

  /**
   * get user info from DOM
   * @returns as an object
   */
  getUserInfo() {
    return { userName: this._userNameElement.textContent, userJob: this._userProfessionElement.textContent };
  }

  /**
   * Set strings to the DOM
   * 
   * @param {String} userName 
   * @param {String} userJob 
   */
  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userProfessionElement.textContent = userJob;
  }
}
