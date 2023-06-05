export default class UserInfo {
  constructor({ profileNameElement, profileStatusElement, avatarImage }) {
    this._profileName = profileNameElement;
    this._profileStatus = profileStatusElement;
    this._avatarImage = avatarImage;
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileStatus: this._profileStatus.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileStatus.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarImage.setAttribute("src", avatarLink);
  }
}
