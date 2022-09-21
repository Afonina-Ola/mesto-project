export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ userName, userJob }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }

  setAvatar(avatarSrc) {
    this._avatar.src = avatarSrc;
  }
}
