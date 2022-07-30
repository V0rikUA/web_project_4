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

  _checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(response.StatusText);
  }

  /**
   *
   * @param {String} urlPath path to user data
   * @returns {Object} an object that contains user info
   */
  getUserInfo(urlPath = "/users/me") {
    return fetch(this._url + urlPath, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  editProfile(name, about, urlPath = "/users/me") {
    return fetch(this._url + urlPath, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(avatar, urlPath = "/users/me/avatar") {
    return fetch(this._url + urlPath, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  getInitCard(urlPath = "/cards") {
    return fetch(this._url + urlPath, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  addCard(name, link, urlPath = "/cards") {
    return fetch(this._url + urlPath, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(id, urlPath = "/cards/") {
    return fetch(this._url + urlPath + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  removeLike(id, urlPath = "/cards/") {
    return fetch(this._url + urlPath + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  addLike(id, urlPath = "/cards/") {
    return fetch(this._url + urlPath + id, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "2a676dbc-bb82-4a21-8adc-a0cd2428ca04",
    "Content-Type": "application/json",
  },
});
