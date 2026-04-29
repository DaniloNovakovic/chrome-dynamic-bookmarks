type ObservableEvent = unknown;
type Observer = (event: ObservableEvent) => void;

class Observable {
  observers: Record<string, Observer> = {};

  /**
   * Subscribes callback function to the observable.
   * Whenever `notify(event)` is called `callback(event)` will be triggered aswell.
   * @param {string} key - Key value under which the callback function will be registered
   * @param {function} callback - callback function called with `callback(event)`
   */
  subscribe(key: string, callback: Observer) {
    this.observers[key] = callback;
  }

  /**
   * Unsubscribes the callback function registered with provided `key`.
   * @param {string} key - Key value which was used in `subscribe`
   */
  unsubscribe(key: string) {
    delete this.observers[key];
  }

  /**
   * Notifies all observers with `event` property passed as param (ex. `callback(event)`)
   * @param {any} event - object that will be passed as property to observers
   */
  notify(event: ObservableEvent) {
    for (const key in this.observers) {
      const observer = this.observers[key];
      observer(event);
    }
  }
}

export default function createObservable() {
  return new Observable();
}
