export default class UserInfo {
  constructor(userNameSelector, userJobSelector, profileAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userProfessionElement = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
  }

  /**
   * get user info from DOM
   * @returns as an object
   */
  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userProfessionElement.textContent,
      avatar: this._userAvatar.style.backgroundImage,
    };
  }

  /**
   * Set user's name, job description
   *
   * @param {String} userName
   * @param {String} userJob
   */
  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userProfessionElement.textContent = userJob;
  }

  /**
   *  Set user avatar image
   *
   * @param {link} avatar
   */
  setUserAvatar(avatar) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
    // this._userAvatar.style.backgroundSize = "cover";
  }
}
