import type { Meta, StoryObj } from "@storybook/react-vite";

import NavTabs from "../components/NavTabs";

const meta = {
  title: "popup/components/NavTabs",
  component: NavTabs,
  argTypes: { onChange: { control: false } },
} satisfies Meta<typeof NavTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    value: 0,
  },
};
