import type { Meta, StoryObj } from "@storybook/react-vite";

import Popup from "../components/Popup";

const meta = {
  title: "popup/components/Popup",
  component: Popup,
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
