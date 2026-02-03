import MapTooltipExample from "./examples/MapTooltipExample.svelte";

export default {
  title: "Components/MapTooltip",
  component: MapTooltipExample,
  parameters: {
    docs: {
      description: {
        component:
          "MapTooltip renders a MapLibre popup anchored to the hovered feature. It must be used inside a MapLayer with hover enabled and a bound hovered ID.\n\nNesting: MapTooltip must be a child of MapLayer. MapLayer must be nested inside MapSource, which sits inside Map.\n\nKey prop: content (string or HTML)."
      }
    }
  }
};

export const HoverTooltip = {
  name: "Hover tooltip",
  render: () => ({
    Component: MapTooltipExample
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Hover a constituency to see the tooltip content rendered from the hovered feature ID."
      }
    }
  }
};
