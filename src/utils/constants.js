import Downer from "../images/Downer.jpg";
import RedWoods from "../images/Red-Woods.jpg";
import OldFaithful from "../images/Old-Faithful.jpg";
import MountRushmore from "../images/Mount-Rushmore.jpg";
import GrandCanyon from "../images/Grand-Canyon.jpg";
import GoldenGateBridge from "../images/Golden-Gate-Bridge.jpg";

//profile modal
const profilePopout = document.querySelector(".popout__container_profile-edit");
const profileFormElement = profilePopout.querySelector(".popout__form");
const nameInput = profilePopout.querySelector(".popout__form-input_type_name");
const jobInput = profilePopout.querySelector(".popout__form-input_type_job");

//profile
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

//gallery modal
const galleryPopout = document.querySelector(".popout__container_gallery-add");

const galleryFormElement = galleryPopout.querySelector(".popout__form");
const titleInput = galleryFormElement.querySelector(".popout__form-input_type_title");
const imageInput = galleryFormElement.querySelector(".popout__form-input_type_image");

//gallery
const galleryContainer = document.querySelector(".gallery__grid");

//picture modal
const picturePopout = document.querySelector(".popout__container_picture-view");


const initialCards = [
    {
        name: "Downer",
        link: Downer
    },
    {
        name: "Red Woods",
        link: RedWoods
    },
    {
        name: "Old Faithful",
        link: OldFaithful
    },
    {
        name: "Mount Rushmore",
        link: MountRushmore 
    },
    {
        name: "Grand Canyon",
        link: GrandCanyon
    },
    {
        name: "Golden Gate Bridge",
        link: GoldenGateBridge
    }
];

const defaultConfig = {
    formSelector: ".popout__form",
    inputSelector: ".popout__form-input",
    submitButtonSelector: ".popout__button",
    inactiveButtonClass: "popout__button_disabled",
    inputErrorClass: "popout__form-input_error",
    errorClass: "popout__form-input-error_active"
  }

  const escKeyCode = 27;

  export {profilePopout, nameInput, jobInput, profileFormElement, 
    editBtn, addButton, galleryPopout, galleryFormElement, titleInput, 
    imageInput, galleryContainer, picturePopout, initialCards, 
    defaultConfig, escKeyCode}