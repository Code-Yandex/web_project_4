import {toggleModal} from "./toggle.js";

class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._trashButton = this._element.querySelector(".gallery__trash-button");
    this._likeButton = this._element.querySelector(".gallery__like-button");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__container")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._element.querySelector(".gallery__image").src = this._image;

    this._element.querySelector(".gallery__text").textContent = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", (evt) => {
      this._element.closest(".gallery__container").remove();
       
    });
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("gallery__like-button_active");
       
    });
    this._element.querySelector(".gallery__image").addEventListener("click", (evt) => {
        const picturePopout = document.querySelector(".popout__container_picture-view");
        const popoutImage = picturePopout.querySelector(".popout__picture");
        const popoutTitle = picturePopout.querySelector(".popout__title");

        popoutImage.src = this._image;
        
        popoutTitle.textContent = this._title;
        toggleModal(picturePopout);
    });
  }
}

export { Card };