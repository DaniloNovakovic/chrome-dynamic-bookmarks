export default function createEventQueueHandler(store, eventHandlers) {
  return function queueHandler(eventQueue) {
    console.log(eventQueue);
  };
}
