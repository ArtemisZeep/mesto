import { FormValidator } from "../components/FormValidator.js";
import { data } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
//import { forEach } from 'core-js/core/array';
import "./index.css";

const editProfileButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileStatusElement = document.querySelector(".profile__status");
const profileNameInput = document.querySelector(".popup__input_text_name");
const profileStatusInput = document.querySelector(".popup__input_text_status");
const formElementProfile = document.querySelector(".popup__form_place_profile");
const formElementAdd = document.querySelector(".popup__form_place_add-element");

const editPopupAvatar = document.querySelector(".popup_place_avatar");

const formAddCardValidation = new FormValidator(data, formElementAdd);
formAddCardValidation.enableValidation();

const formProfileEditValidation = new FormValidator(data, formElementProfile);
formProfileEditValidation.enableValidation();

const formAvatarEditValidation = new FormValidator(data, editPopupAvatar);
formAvatarEditValidation.enableValidation();


const elements = document.querySelector(".elements");
const addCardButton = document.querySelector(".profile__add-button");
const avatarImage = document.querySelector(".profile__avatar");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: {
    authorization: "94100e2b-d94f-4e1b-8e9e-f24c54af7861",
    "Content-Type": "application/json",
  },
});

let userId;

const popupZoomPhoto = new PopupWithImage(".popup-photo");
popupZoomPhoto.setEventListeners();

const renderCard = function (item) {
  const renderCardItem = new Card(
    item,

    {
      like: (cardId) => {
        const isLiked = renderCardItem.findMyLikes();
        if (!isLiked) {
          api
            .putCardLike(cardId)
            .then((res) => {
              renderCardItem.addLike(res.likes);
            })
            .catch((error) =>
              console.error(`Не удалось добавить лайк, ${error}`)
            );
        } else {
          api
            .deleteCardLike(cardId)
            .then((res) => {
              renderCardItem.removeLike(res.likes);
            })
            .catch((error) =>
              console.error(`Не удалось удалить лайк, ${error}`)
            );
        }
      },

      likeLoad: (cardId) => {
        const isLiked = renderCardItem.findMyLikes();
        if (isLiked) {
          api
            .putCardLike(cardId)
            .then((res) => {
              renderCardItem.addLike(res.likes);
            })
            .catch((error) =>
              console.error(`Не удалось добавить лайк, ${error}`)
            );
        } else {
          api
            .deleteCardLike(cardId)
            .then((res) => {
              renderCardItem.removeLike(res.likes);
            })
            .catch((error) =>
              console.error(`Не удалось удалить лайк, ${error}`)
            );
        }
      },

      popupZoomPhoto: (name, link) => {
        popupZoomPhoto.open(name, link);
      },
      handleCardDelete: (item, cardId) => {
        popupDelete.open(item, cardId);
      },
    },
    "#elementTemplate",
    userId,
    { cardId: item._id, authorId: item.owner._id, likes: item.likes }
  );
  return renderCardItem.getCard();
};

const renderInitialCards = new Section(
  {
    renderer: (item) => {
      renderInitialCards.addItem(renderCard(item));
    },
  },
  elements
);



const popupDelete = new PopupDelete(".popup-delete", {
  callbackDelete: (item, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        item.deleteCard();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(`Не удалось удалить карточку, ${err}`);
      });
  },
});
popupDelete.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_place_card", {
  callbackFormSubmit: (formValues) => {
    popupAddCard.setWaitingText();
    api
      .addNewCard({
        name: formValues["card-name"],
        link: formValues["card-link"],
      })
      .then((item) => {
        renderInitialCards.addItem(renderCard(item));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Не удалось добавить новую карточку, ${err}`);
      })
      .finally(() => {
        popupAddCard.returnWaitingText();
      });
  },
});
popupAddCard.setEventListeners();

function openPopupAdd() {
  formAddCardValidation.disableButton()
  popupAddCard.open();
}
addCardButton.addEventListener("click", openPopupAdd);

const userInfo = new UserInfo({
  profileNameElement,
  profileStatusElement,
  avatarImage,
});

const popupEditProfile = new PopupWithForm(".popup_place_status", {
  callbackFormSubmit: (formValues) => {
    popupEditProfile.setWaitingText();
    formValues.name = formValues["text-name"];
    formValues.about = formValues["text-status"];
    delete formValues["text-name"];
    delete formValues["text-status"];
    console.log(formValues);
    api
      .sendUserData(formValues)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo({ name: res.name, about: res.about });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditProfile.returnWaitingText();
      });
  },
});
popupEditProfile.setEventListeners();

const openEditPopup = () => {
  formProfileEditValidation.disableButton();
  popupEditProfile.open();
  const actualUserInfo = userInfo.getUserInfo();
  profileNameInput.value = actualUserInfo.profileName;
  profileStatusInput.value = actualUserInfo.profileStatus;
};
editProfileButton.addEventListener("click", openEditPopup);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userProfileData, item]) => {
    userId = userProfileData._id;

    console.log(userId);
    userInfo.setUserInfo({
      name: userProfileData.name,
      about: userProfileData.about,
    });
    renderInitialCards.renderItems(item.reverse());
    userInfo.setUserAvatar(userProfileData.avatar);
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка, ${err}`);
  });

const popupEditAvatar = new PopupWithForm(".popup_place_avatar", {
  callbackFormSubmit: (userProfileData) => {
    popupEditAvatar.setWaitingText();
    userProfileData.avatar = userProfileData["avatar-edit"];
    delete userProfileData["avatar-edit"];
    api
      .sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditAvatar.returnWaitingText();
      });
  },
});

popupEditAvatar.setEventListeners();

const profileAvatarEdit = document.querySelector(".profile__avatar-edit");

profileAvatarEdit.addEventListener("click", () => {
    formAvatarEditValidation.disableButton()
    popupEditAvatar.open();
  }
);
