import { responseTypes } from "../../src/shared/constants";

type StorybookChrome = {
  runtime: {
    sendMessage: {
      mockImplementation: (
        implementation: (
          _: unknown,
          callback?: (response: unknown) => void,
        ) => void,
      ) => void;
    };
  };
};

const mockRuntime = (chrome: StorybookChrome) => {
  chrome.runtime.sendMessage.mockImplementation((_, callback) => {
    if (typeof callback === "function") {
      callback({
        type: responseTypes.ERROR,
        message: "Browser messaging is not allowed in storybook",
      });
    }
  });
};
export default mockRuntime;
