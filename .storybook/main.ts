import path from "path";
import { fileURLToPath } from "url";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const plugins = config.plugins?.filter((plugin) => {
      if (!plugin || Array.isArray(plugin)) {
        return true;
      }

      return plugin.name !== "chrome-extension-public-html";
    });

    return mergeConfig(
      {
        ...config,
        plugins,
      },
      {
        build: {
          chunkSizeWarningLimit: 800,
        },
        resolve: {
          alias: {
            "@": path.resolve(storybookDir, "../src"),
          },
        },
      },
    );
  },
};

export default config;
