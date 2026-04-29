import responseTypes from "@/shared/constants/responseTypes";
import type { MessageResponse } from "@/shared/types";

export type RequestMessage<TData = unknown> = {
  type?: string;
  data: TData | undefined;
};

export type SendResponse = (response: MessageResponse) => void;
export type RequestHandler = (
  request: RequestMessage,
  sendResponse: SendResponse
) => void;

function log(response: MessageResponse) {
  console.warn("response", response);
}

function defaultRequestHandler(request: RequestMessage, sendResponse = log) {
  sendResponse({
    type: responseTypes.ERROR,
    message: `Could not handle request of type ${request.type}`,
  });
}

class Router {
  handlers: Record<string, RequestHandler> = {};

  /**
   * @callback requestHandlerCallback
   * @param {{type: string}} request
   * @param {function} sendResponse
   */

  /**
   * Registers `callback` handler under `request.type` of `type`
   * @param {String} type - key / request type under which the `callback` function will be called
   * @param {requestHandlerCallback} callback - callback function called on `request.type` with `callback(request, sendResponse)`
   */
  registerHandler(type: string, callback: RequestHandler) {
    this.handlers[type] = callback;
  }

  /**
   * Returns the registered `callback` function
   * @param {string} type - value under which the `callback` function is registered
   * @returns {requestHandlerCallback}
   */
  getRequestHandler(type?: string) {
    if (type && type in this.handlers) {
      return this.handlers[type];
    } else {
      return defaultRequestHandler;
    }
  }
  handleRequest(
    request: RequestMessage = { data: undefined },
    sendResponse = log
  ) {
    const handle = this.getRequestHandler(request.type);
    handle(request, sendResponse);
  }
}

export default function createRouter() {
  return new Router();
}
