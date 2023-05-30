export default class Section {
  constructor({items, renderer}, containerItems){
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerItems;
  }

  
  renderItems() {
this._renderedItems.forEach(this._renderer);
  }
  addItem(items) {
    this._container.prepend(items);
  }
  
}
