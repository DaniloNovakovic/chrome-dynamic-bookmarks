import { Action, AnyAction, Reducer } from "redux";

const defaultHandler = <TState>(state: TState | undefined): TState => {
  return state;
};

const defaultConfig = {
  defaultHandler,
} as const;

const formatKey = (key: string): string => {
  return key.toString().toUpperCase();
};

export class ActionHandlerFactory<
  TState = unknown,
  _TAction extends Action<string> = AnyAction,
> {
  defaultHandler: Reducer<TState>;
  handlers: Map<string, Reducer<TState>>;

  constructor(config = defaultConfig) {
    this.defaultHandler = config.defaultHandler || defaultHandler;
    this.handlers = new Map<string, Reducer<TState>>();
  }

  register(key: string, handler: Reducer<TState>) {
    this.handlers.set(formatKey(key), handler);
  }

  getHandler(key: string) {
    const handler = this.handlers.get(formatKey(key));
    return handler || this.defaultHandler;
  }
}

export default ActionHandlerFactory;
