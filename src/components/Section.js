export default class Section {
  constructor({renderer}, containerItems){
    this._renderer = renderer;
    this._container = containerItems;
  }

  
  renderItems(res) {
    res.forEach(this._renderer);
  }
  addItem(items) {
    this._container.prepend(items);
  }
  
}
