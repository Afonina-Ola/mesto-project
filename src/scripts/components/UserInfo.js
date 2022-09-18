export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ userName, userJob }) {
    this.name.textContent = userName;
    this.job.textContent = userJob;
  }

  setAvatar(avatarSrc) {
    this.avatar.src = avatarSrc;
  }
}
