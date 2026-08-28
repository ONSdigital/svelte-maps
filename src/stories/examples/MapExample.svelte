<script>
  import Map from "../../Map.svelte";

  const baseMapStyle = "/data/style-ons-light.json";

  let map;
  let zoom;
  let center = {};

  const mapExample = `&lt;Map\n  id=&quot;map-story-base&quot;\n  style=&quot;/data/style-ons-light.json&quot;\n  bind:map={map}\n  bind:zoom={zoom}\n  bind:center={center}\n/&gt;`;
</script>

<div class="story">
  <div class="story-docs">
    <h3>Map</h3>
    <p>
      Top-level map container that initializes MapLibre. Place MapSource and MapLayer
      components inside Map so they render after the map loads.
    </p>
    <ul>
      <li>Key props: id, style, location, controls, minzoom, maxzoom, interactive, attribution</li>
      <li>Accessibility: tabbable, mapDescription, css</li>
      <li>Bindings: map, zoom, center, pitch, bearing</li>
      <li>Events: load, style</li>
    </ul>
    <pre><code>{@html mapExample}</code></pre>
  </div>
  <div class="map">
    <Map
      id="map-story-base"
      style={baseMapStyle}
      bind:map={map}
      bind:zoom={zoom}
      bind:center={center}
    />
  </div>
  <div class="meta">
    <span>zoom: {zoom ? zoom.toFixed(1) : ""}</span>
    <span>lon: {center?.lng ? center.lng.toFixed(2) : ""}</span>
    <span>lat: {center?.lat ? center.lat.toFixed(2) : ""}</span>
  </div>
</div>

<style>
  .story {
    display: grid;
    gap: 12px;
  }
  .story-docs {
    font-size: 13px;
    color: #222;
  }
  .story-docs h3 {
    margin: 0 0 6px 0;
    font-size: 14px;
  }
  .story-docs ul {
    margin: 6px 0 0 16px;
  }
  pre {
    margin: 8px 0 0;
    padding: 10px;
    background: #f6f8fa;
    border-radius: 6px;
    overflow: auto;
    font-size: 12px;
  }
  .map {
    height: 320px;
  }
  .meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #444;
  }
</style>
