import responseTypes from "@/shared/constants/responseTypes";
import type { GenericObject, MessageResponse } from "@/shared/types";

import getCurrentBrowser from "../getCurrentBrowser";
import { logInfo } from "../log";

const browser = getCurrentBrowser();

type OnMessageResponseFn = (res: MessageResponse) => void;

/**
 * Sends message via `browser.runtime.sendMessage` with `{type, data}` as it's arguments
 * @param type - type of the message
 * @param data - data that will be send in message
 * @param onResponse - callback function that will be called on response
 */
export default function sendMessage<T = GenericObject>(
  type: string,
  data: T,
  onResponse: OnMessageResponseFn,
): void {
  const req = {
    type,
    data,
  };

  const handleResponse = (res: Partial<MessageResponse> = {}) => {
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
    onResponse(res as MessageResponse);
  };

  browser.runtime.sendMessage(req, handleResponse);
}
