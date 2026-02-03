import MapSourceExample from "./examples/MapSourceExample.svelte";

export default {
  title: "Components/MapSource",
  component: MapSourceExample,
  parameters: {
    docs: {
      description: {
        component:
          "MapSource registers a data source on the map and provides it to child layers. This story uses the same geojson source and salary CSV from App.svelte (pcon10-bounds.json + salary-pcon10.csv).\n\nNesting: MapSource must be a direct child of Map. MapLayer components must be nested inside MapSource so they can reference its source.\n\nKey props: id, type (geojson|vector), data (geojson) or url (vector tiles), layer (vector tiles), promoteId, minzoom, maxzoom, tilesize.\nSlots: child layers render after the source is ready."
      }
    }
  }
};

export const GeoJsonSource = {
  name: "GeoJSON source",
  render: () => ({
    Component: MapSourceExample
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Loads geojson boundaries from /data/pcon10-bounds.json and joins CSV values to set feature-state colors."
      }
    }
  }
};
