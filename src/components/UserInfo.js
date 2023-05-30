

export default class UserInfo {
  constructor({ profileNameElement, profileStatusElement }) {
    this._profileName = profileNameElement;
    this._profileStatus = profileStatusElement;
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileStatus: this._profileStatus.textContent
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.profileName;
    this._profileStatus.textContent = data.profileStatus;
  }
}
