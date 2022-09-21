export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, position = 'end') {
    if (position === "start") {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}





