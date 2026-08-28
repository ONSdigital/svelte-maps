import "../dist/global.css";

/** @type { import('@storybook/svelte').Preview } */
const preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: "^on[A-Z].*" }
  }
};

export default preview;
