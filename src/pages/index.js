import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    profilePopout, nameInput, avatar, avatarFormElement,
    deleteInput, jobInput, deletePopout, avatarLink, avatarPopout,
    avatarEdit, profileFormElement, editBtn, addButton, galleryPopout,
    galleryFormElement, titleInput, imageInput, galleryContainer,
    picturePopout, defaultConfig
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";
import { toggleModal, setButtonText } from "../utils/utils.js";

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-3",
    headers: {
        authorization: "b8745c93-1f67-43db-8189-ce066047389a",
        "content-type": "application/json"
    }
});

Promise.all([api.getUserInfo(), api.getCardList()]).then(([userInfo, cardsInfo]) => {
    const user = new UserInfo(".profile__name", ".profile__profession")
    avatar.src = userInfo.avatar
    user.setUserInfo({ userName: userInfo.name, userJob: userInfo.about })

    const profileForm = new PopupWithForm({
        popupSelector: profilePopout, formSubmission: () => {
            api.setUserInfo({ name: nameInput.value, about: jobInput.value })
                .then((userInfo) => {
                    user.setUserInfo({ userName: userInfo.name, userJob: userInfo.about });
                    profileValidator.enableValidation()
                })
                .then(() => profileForm.close())
                .catch((err) => console.log(err))
        }
    });
    profileForm.setEventListeners();
    setButtonText(profilePopout, "Save")

    editBtn.addEventListener("click", () => {
        profileForm.open();
        const currentUserInfo = user.getUserInfo();
        nameInput.value = currentUserInfo.name;
        jobInput.value = currentUserInfo.job;
    });

    const cardList = new Section({
        items: cardsInfo,
        renderer: (data) => {

            const card = new Card({
                data,
                handleCardClick: () => {
                    imagePopup.open({ data })
                },
                handleTrashClick: (id) => {
                    toggleModal(deletePopout)
                    deleteInput.value = id;
                    deleteForm.setDeleteHandle(() => { card.removeCard() })
                },
                handleLikeClick: (id) => {
                    if (card.likeButton.classList.contains("gallery__like-button_active")) {
                        card.removeLike();
                        api.changeLikeCardStatus(id, false)
                            .then(res => card.setLikeCount(res.likes.length))
                            .catch((err) => console.log(err));
                    } else {
                        card.addLike();
                        api.changeLikeCardStatus(id, true)
                            .then(res => card.setLikeCount(res.likes.length))
                            .catch((err) => console.log(err));
                    }
                }
            }, "#gallery-object");

            card.setLikeCount(data.likes.length);
            cardList.addItem(card.generateCard());

            if (userInfo._id !== data.owner._id) {
                card.hideTrash()

            }
            data.likes.some((thing) => {
                if (thing._id == userInfo._id) {
                    card.addLike();
                }
            });

        },

    }, galleryContainer)

    cardList.renderer()
    //console.log("testing");
    const galleryForm = new PopupWithForm({
        popupSelector: galleryPopout, formSubmission: () => {
            setButtonText(galleryPopout, "Saving...")
            api.addCard({ name: titleInput.value, link: imageInput.value }).then(() => {
                
                galleryValidator.enableValidation()
            }
            )
            .then(() => setButtonText(galleryPopout, "Create"))
            .then(() => galleryForm.close())
            .catch((err) => console.log(err))
        }
    })

    galleryForm.setEventListeners();

    addButton.addEventListener("click", () => galleryForm.open());
})

const deleteForm = new PopupWithForm({
    popupSelector: deletePopout, formSubmission: () => {
        setButtonText(deletePopout, "Saving...")
        api.removeCard(deleteInput.value)
            .then(() => deleteForm.runDeleteHandle())
            .then(() => setButtonText(deletePopout, "Yes"))
            .then(() => deleteForm.close())
            .catch((err) => console.log(err))
    }
})
deleteForm.setEventListeners();


const avatarEditForm = new PopupWithForm({
    popupSelector: avatarPopout, formSubmission: () => {
        setButtonText(avatarPopout, "Saving")
        avatar.src = avatarLink.value;
        api.setUserAvatar({ avatar: avatarLink.value })
            .then(() => setButtonText(avatarPopout, "Save"))
            .then(() => avatarEditForm.close())
            .catch((err) => console.log(err))
    }
});

avatarEditForm.setEventListeners();
const avatarValidator = new FormValidator(defaultConfig, avatarFormElement)
avatarValidator.enableValidation();

avatarEdit.addEventListener("click", () => toggleModal(avatarPopout));

const profileValidator = new FormValidator(defaultConfig, profileFormElement);
const galleryValidator = new FormValidator(defaultConfig, galleryFormElement);
profileValidator.enableValidation();
galleryValidator.enableValidation();

const imagePopup = new PopupWithImage(picturePopout);
imagePopup.setEventListeners();