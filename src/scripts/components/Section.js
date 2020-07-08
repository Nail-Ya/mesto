export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод рендера карточки
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  // метод добавляющий карточку в контейнер
  addItem(element) {
    this._container.append(element);
  }
}



