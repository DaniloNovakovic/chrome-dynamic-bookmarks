import responseTypes from "shared/constants/responseTypes";

function log(response) {
  console.warn("response", response);
}

function defaultRequestHandler(request, sendResponse = log) {
  sendResponse({
    type: responseTypes.ERROR,
    message: `Could not handle request of type ${request.type}`
  });
}

class Router {
  handlers = {};

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
  registerHandler(type, callback) {
    this.handlers[type] = callback;
  }

  /**
   * Returns the registered `callback` function
   * @param {string} type - value under which the `callback` function is registered
   * @returns {requestHandlerCallback}
   */
  getRequestHandler(type) {
    if (type in this.handlers) {
      return this.handlers[type];
    } else {
      return defaultRequestHandler;
    }
  }
  handleRequest(request = {}, sendResponse = log) {
    const handle = this.getRequestHandler(request.type);
    handle(request, sendResponse);
  }
}

export default function createRouter() {
  return new Router();
}
