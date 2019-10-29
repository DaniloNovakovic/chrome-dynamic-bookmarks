import Queue from "shared/lib/Queue";

/**
 * Creates debounced event handler that receives `event` which is moved into `eventQueue`. After each new received event `delayInMilliseconds` timer is reset.
 * @param {function} eventQueueHandler - callback function called with `eventQueueHandler(eventQueue)` after `delayInMilliseconds`
 * @param {number} delayInMilliseconds - number specifying after how much uninterrupted time the `eventQueueHandler` will be called
 */
export default function createDebouncedHandler(
  eventQueueHandler,
  delayInMilliseconds = 100
) {
  const queue = new Queue();
  let timeout;

  return function deobuncedEventHandler(event) {
    if (timeout) {
      clearTimeout(timeout);
    }

    queue.enqueue(event);

    timeout = setTimeout(() => {
      eventQueueHandler(queue);
      queue.clear();
    }, delayInMilliseconds);
  };
}
