import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupName = document.querySelector(".popup-photo__name");
    this._popupPhoto = document.querySelector(".popup-photo__photo");
  }

  open(name, link) {

    this._popupName.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  }
}
