import { notification, baseline } from "./decorators";
import "./mocks/browser";

export const decorators = [baseline(), notification()].reverse();

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
