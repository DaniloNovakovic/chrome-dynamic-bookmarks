import getCurrentBrowser from "../getCurrentBrowser";
import responseTypes from "shared/constants/responseTypes";
import { logInfo } from "../log";

const browser = getCurrentBrowser();

/**
 * @callback onResponseFunction
 * @param {{type: string, message: string, data?: any} response
 */

/**
 * Sends message via `browser.runtime.sendMessage` with `{type, data}` as it's arguments
 * @param {string} type - type of the message
 * @param {any} data - data that will be send in message
 * @param {onResponseFunction} onResponse - callback function that will be called on response
 */
export default function sendMessage(type, data, onResponse) {
  const req = {
    type,
    data,
  };

  function handleResponse(res = {}) {
    if (!res.type) {
      res.type = responseTypes.ERROR;
    }

    if (!res.message) {
      if (res.type === responseTypes.SUCCESS) {
        res.message = "Success - Operation completed!";
      } else {
        res.message = `Oops! Something went wrong! 
        Help us improve your experience by sending an error report.`;
      }
    }

    logInfo("response", res);
    onResponse(res);
  }

  browser.runtime.sendMessage(req, handleResponse);
}
