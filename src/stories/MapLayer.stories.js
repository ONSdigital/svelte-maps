import MapLayerExample from "./examples/MapLayerExample.svelte";

export default {
  title: "Components/MapLayer",
  component: MapLayerExample,
  parameters: {
    docs: {
      description: {
        component:
          "MapLayer renders a MapLibre layer from a parent MapSource. This story mirrors the hover/select example in App.svelte with both a fill and line layer.\n\nNesting: MapLayer must be a child of MapSource. It can also contain MapTooltip as a child when hover is enabled. Multiple MapLayer instances can share the same MapSource.\n\nKey props: id, type, paint, layout, data, order, visible, minzoom, maxzoom, sourceLayer, filter.\nInteractive props: hover, select, hover/selected bindings, clickIgnore, clickCenter, hovered, selected.\nEvents: hover, select."
      }
    }
  }
};

export const HoverAndSelect = {
  name: "Hover and select",
  render: () => ({
    Component: MapLayerExample
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Uses feature-state colors derived from the CSV in /data/salary-pcon10.csv and shows hover/selected IDs."
      }
    }
  }
};
