/**
 * Creates debounced event handler that receives `event` which is moved into `eventQueue`. After each new received event `delayInMilliseconds` timer is reset.
 * @param {function} eventQueueHandler - callback function called with `eventQueueHandler(eventQueue)` after `delayInMilliseconds`
 * @param {number} delayInMilliseconds - number specifying after how much uninterrupted time the `eventQueueHandler` will be called
 */
export default function createDebouncedHandler(
  eventQueueHandler,
  delayInMilliseconds = 100
) {
  return function deobuncedEventHandler(event) {
    console.log(event);
  };
}
