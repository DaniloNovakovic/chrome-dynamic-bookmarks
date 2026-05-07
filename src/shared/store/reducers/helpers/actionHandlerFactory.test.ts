import { ActionHandlerFactory } from "./actionHandlerFactory";

describe("ActionHandlerFactory", () => {
  let factory: ActionHandlerFactory;
  const mockReducer = jest.fn();

  beforeEach(() => {
    factory = new ActionHandlerFactory();
  });

  it("should register a handler for a given key", () => {
    factory.register("TEST_ACTION", mockReducer);
    expect(factory.handlers.get("TEST_ACTION")).toBe(mockReducer);
  });

  it("should return the default handler if no handler is registered for a given key", () => {
    expect(factory.getHandler("UNREGISTERED_ACTION")).toBe(
      factory.defaultHandler,
    );
  });
});
