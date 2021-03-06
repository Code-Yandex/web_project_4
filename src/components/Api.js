class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getCardList() {
        return fetch(this._baseUrl + "/cards", {
            headers: this._headers})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
    // GET https://around.nomoreparties.co/v1/group-3/users/me
    getUserInfo() {
        return fetch(this._baseUrl + `/users/me`,{
            headers: this._headers})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
    // GET https://around.nomoreparties.co/v1/group-3/cards
    // POST https://around.nomoreparties.co/v1/group-3/cards
    addCard({name, link}) {
        return fetch(this._baseUrl + `/cards`,{
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name,
                link
            })})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
// DELETE https://around.nomoreparties.co/v1/group-3/cards/cardId
    removeCard(cardId) {
        return fetch(this._baseUrl + `/cards/` + cardId ,{
            headers: this._headers,
            method: "DELETE"})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
// PUT https://around.nomoreparties.co/v1/group-3/cards/likes/cardId
// DELETE https://around.nomoreparties.co/v1/group-3/cards/likes/cardId
    changeLikeCardStatus(cardId, like) {
        if (like){return fetch(this._baseUrl + `/cards/likes/` + cardId,{
            headers: this._headers,
            method: "PUT",
            body: JSON.stringify({
                like})})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
        } else {return fetch(this._baseUrl + `/cards/likes/` + cardId,{
            headers: this._headers,
            method: "DELETE"})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
        }
    }

    getCardLikeStatus(cardId) {
        return fetch(this._baseUrl + `/cards/likes/` + cardId, {
            headers: this._headers})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    };
// PATCH https://around.nomoreparties.co/v1/group-3/users/me
    setUserInfo({name, about}) {
        return fetch(this._baseUrl + `/users/me`,{
            headers: this._headers, 
            method: "PATCH",
            body: JSON.stringify({
                name,
                about
              })})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
// PATCH https://around.nomoreparties.co/v1/group-3/users/me/avatar
    setUserAvatar({avatar}) {
        return fetch(this._baseUrl + `/users/me/avatar`,{
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({avatar})})
            .then((res) => res.ok? res.json() : Promise.reject(`Error!`+ res.status + res.statusText))
            //.catch((err) => console.log(err))
    }
}

export default Api