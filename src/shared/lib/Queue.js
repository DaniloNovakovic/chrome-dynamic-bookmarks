import Denque from "denque";

export default class Queue {
  constructor(array = []) {
    this._denque = new Denque(array);
  }
  enqueue(item) {
    this._denque.unshift(item);
  }
  dequeue() {
    return this._denque.pop();
  }
  clear() {
    this._denque.clear();
  }
  isEmpty() {
    this._denque.isEmpty();
  }
  toArray() {
    return this._denque.toArray();
  }
}
