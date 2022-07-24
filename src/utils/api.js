//@flow
import VerEx from "verbal-expressions";

class Api {
  /**
   * This API was design to work with remote project "Around the U.S.".
   * All functionality is based on capabilities of remote server.
   * The API is capable of recieving, updating, creating and removing data from remote server.
   *
   * @param {String} url an url to connect to remote server
   * @param {Headers} headers an authorization header for sending requests to the remote server
   */
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // _isUrl(url) {
  //   const regexp = VerEx()
  //     .startOfLine()
  //     .then("http")
  //     .maybe("s")
  //     .then("://")
  //     .maybe("www.")
  //     .anythingBut(" ")
  //     .endOfLine();

  //   if (regexp.test(url)) {
  //     return url;
  //   } else {
  //     throw new Error("String is not an URL");
  //   }
  // }

  _checkStatus(response) {
    return response.ok ? response.json() : Promise.reject(response.StatusText);
  }

  /**
   *
   * @param {String} urlPath path to user data
   * @returns {Object} an object that contains user info
   */
  getUserInfo(urlPath) {
    return fetch(this._url + urlPath, {
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  editProfile(urlPath, name, about) {
    return fetch(this._url + urlPath, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(name, about),
    }).then((res) => this._checkStatus(res));
  }

  editAvatar(urlPath, avatar) {
    return fetch(this._url + urlPath, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkStatus);
  }

  getInitCard(urlPath) {
    fetch(this._url + urlPath, {
      headers: this._headers,
    }).then(this._checkStatus);
  }

  addCard(urlPath, name, link) {
    fetch(this._url + urlPath, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(urlPath, id) {
    fetch(this._url + urlPath + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  removeLike(urlPath, id) {
    fetch(this._url + urlPath + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  addLike(urlPath, id) {
    fetch(this._url + urlPath + id, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkStatus);
  }
}

export const api = new Api({
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "2a676dbc-bb82-4a21-8adc-a0cd2428ca04",
    "Content-Type": "application/json",
  },
});
