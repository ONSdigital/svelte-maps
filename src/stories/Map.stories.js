import MapExample from "./examples/MapExample.svelte";

export default {
  title: "Components/Map",
  component: MapExample,
  parameters: {
    docs: {
      description: {
        component:
          "Map renders a MapLibre GL JS map. This story mirrors the base-map example in App.svelte using the sample style JSON from /data/style-ons-light.json.\n\nNesting: Map is the top-level container. Place MapSource and MapLayer components as children inside Map. Child layers render after the map has loaded.\n\nKey props: id, style (URL or JSON), location (lng/lat/zoom or bounds), controls, minzoom, maxzoom, interactive, attribution, tabbable, mapDescription, css, options.\nBindings: map, zoom, center, pitch, bearing.\nEvents: load, style."
      }
    }
  }
};

export const BaseMap = {
  name: "Base map",
  render: () => ({
    Component: MapExample
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Uses style JSON in /data/style-ons-light.json and demonstrates map bindings for zoom and center."
      }
    }
  }
};
