/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|svelte)", "../src/**/*.stories.mdx"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/svelte-vite",
    options: {}
  },
  staticDirs: ["../dist"],
};

export default config;
