export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод рендера карточки
  renderItems() {
    this._items.reverse().forEach(item => {
      this._renderer(item);
    })
  }

  // метод добавляющий карточку в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
