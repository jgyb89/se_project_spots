class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards()]);
  }

  // Global generate card
  getInitialCards() {
    // Interpolate a variable into a string
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // -------- USER ROUTES --------

  // Loading user info from server
  addProfileData({ name, about, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
        avatar,
      }),
    }).then(this._handleServerResponse);
  }

  // Update the profile info
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }

  // -------- CARD ROUTES --------

  getCardData({ createdAt, isLiked, link, name, owner, _id }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this_headers,
      body: JSON.stringify({
        createdAt,
        isLiked,
        link,
        name,
        owner,
        _id,
      }),
    });
  }

  // Adding a new card
  addNewCards({ isLiked, _id, name, link, owner, createdAt }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this_headers,
      body: JSON.stringify({
        isLiked,
        _id,
        name,
        link,
        owner,
        createdAt,
      }),
    });
  }
}

export default Api;
