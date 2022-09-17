export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
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
}
