export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод рендера карточки
  renderItems(api) {
    api
    .then((data) => {
        data.reverse().forEach((item) => {
          this._renderer(item);
        });
      })
    .catch((err) => console.log(`Произошла ошибка: ${err}`));
  }

  // метод добавляющий карточку в контейнер
  addItem(element) {
    this._container.append(element);
  }
}



