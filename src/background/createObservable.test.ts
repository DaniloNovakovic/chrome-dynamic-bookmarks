import createObservable from "./createObservable";

describe("observable", () => {
  describe("notify", () => {
    const observable = createObservable();
    const observerMock = jest.fn();

    beforeEach(() => {
      observerMock.mockReset();
    });

    it("notifies all of the subscribers", () => {
      observable.subscribe("firstKey", observerMock);
      observable.subscribe("secondKey", observerMock);
      observable.notify("hello");
      expect(observerMock).toHaveBeenCalledTimes(2);
    });

    it("notifies subscribers with provided parameter", () => {
      const event = "hello";
      observable.subscribe("firstKey", observerMock);
      observable.notify(event);
      expect(observerMock).toHaveBeenCalledWith(event);
    });
  });

  describe("unsubscribe", () => {
    const observable = createObservable();
    const observerMock = jest.fn();

    it("unsubscribes the observer", () => {
      const key = "myKey";
      observable.subscribe(key, observerMock);
      observable.unsubscribe(key);
      observable.notify("hello");
      expect(observerMock).toHaveBeenCalledTimes(0);
    });
  });
});
