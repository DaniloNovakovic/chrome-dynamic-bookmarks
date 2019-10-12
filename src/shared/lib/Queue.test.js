import Queue from "./Queue";

describe("Queue", () => {
  describe("When item is enqueued", () => {
    let queue = new Queue();
    const item = 5;
    beforeEach(() => {
      queue = new Queue();
      queue.enqueue(item);
    });
    describe("dequeue", () => {
      it("returns enqueued item", () => {
        expect(queue.dequeue()).toEqual(item);
      });
    });
    describe("toArray", () => {
      it("includes enqueued item", () => {
        expect(queue.toArray()).toEqual([item]);
      });
    });
    describe("isEmpty", () => {
      it("returns false", () => {
        expect(queue.isEmpty()).toBe(false);
      });
    });
  });

  describe("When item is enqueued and then dequeued", () => {
    let queue = new Queue();
    const item = 5;
    beforeEach(() => {
      queue = new Queue();
      queue.enqueue(item);
      queue.dequeue(item);
    });
    describe("dequeue", () => {
      it("returns undefined", () => {
        expect(queue.dequeue()).toBeUndefined();
      });
    });
    describe("isEmpty", () => {
      it("returns true", () => {
        expect(queue.isEmpty()).toBe(true);
      });
    });
    describe("toArray", () => {
      it("returns empty array", () => {
        expect(queue.toArray()).toEqual([]);
      });
    });
  });

  describe("When two items are enqueued", () => {
    let queue = new Queue();
    const firstItem = 5;
    const lastItem = 6;
    beforeEach(() => {
      queue = new Queue();
      queue.enqueue(firstItem);
      queue.enqueue(lastItem);
    });
    describe("dequeue", () => {
      it("returns first enqueued item", () => {
        expect(queue.dequeue()).toEqual(firstItem);
      });
    });
    describe("isEmpty", () => {
      it("returns false", () => {
        expect(queue.isEmpty()).toBe(false);
      });
    });
    describe("toArray", () => {
      it("returns array [lastItem, firstItem]", () => {
        expect(queue.toArray()).toEqual([lastItem, firstItem]);
      });
    });
  });
});
