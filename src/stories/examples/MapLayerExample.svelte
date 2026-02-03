<script>
  import { getData, getColor, getTopo } from "../../js/utils.js";
  import Map from "../../Map.svelte";
  import MapSource from "../../MapSource.svelte";
  import MapLayer from "../../MapLayer.svelte";

  const colors = {
    seq5: [
      "rgb(234, 236, 177)",
      "rgb(169, 216, 145)",
      "rgb(0, 167, 186)",
      "rgb(0, 78, 166)",
      "rgb(0, 13, 84)"
    ]
  };

  const pconData = "/data/salary-pcon10.csv";
  const pconBounds = {
    url: "/data/pcon10-bounds.json",
    layer: "PCONreg",
    code: "AREACD"
  };

  const bounds = {
    uk: [[-9, 49], [2, 61]]
  };

  const baseMapStyle = "/data/style-ons-light.json";

  let geojson;
  let data = {};
  let hovered;
  let selected;

  const mapLayerExample = `&lt;MapSource id=&quot;pcon&quot; type=&quot;geojson&quot; data={geojson} promoteId=&quot;AREACD&quot;&gt;\n  &lt;MapLayer id=&quot;pcon-fill&quot; type=&quot;fill&quot; data={data.pcon} hover bind:hovered select bind:selected /&gt;\n  &lt;MapLayer id=&quot;pcon-line&quot; type=&quot;line&quot; /&gt;\n&lt;/MapSource&gt;`;

  getTopo(pconBounds.url, pconBounds.layer).then((res) => (geojson = res));

  getData(pconData).then((res) => {
    const vals = res.map((d) => d.salary).sort((a, b) => a - b);
    const len = vals.length;
    const breaks = [
      vals[0],
      vals[Math.floor(len * 0.2)],
      vals[Math.floor(len * 0.4)],
      vals[Math.floor(len * 0.6)],
      vals[Math.floor(len * 0.8)],
      vals[len - 1]
    ];
    res.forEach((d) => {
      d.color = getColor(d.salary, breaks, colors.seq5);
    });
    data.pcon = res;
  });
</script>

<div class="story">
  <div class="story-docs">
    <h3>MapLayer</h3>
    <p>
      Renders a MapLibre layer from the parent MapSource. Must be nested inside MapSource.
      MapTooltip can be nested inside a MapLayer when hover is enabled.
    </p>
    <ul>
      <li>Key props: id, type, paint, layout, data, order, visible, filter</li>
      <li>Zoom props: minzoom, maxzoom, sourceLayer</li>
      <li>Interactive: hover, select, clickIgnore, clickCenter, hovered, selected</li>
      <li>Events: hover, select</li>
    </ul>
    <pre><code>{@html mapLayerExample}</code></pre>
  </div>
  <div class="map">
    {#if geojson && data.pcon}
      <Map id="map-story-layer" style={baseMapStyle} location={{ bounds: bounds.uk }} controls={true}>
        <MapSource
          id="pcon"
          type="geojson"
          data={geojson}
          promoteId={pconBounds.code}
          maxzoom={13}
        >
          <MapLayer
            id="pcon-fill"
            data={data.pcon}
            type="fill"
            hover={true}
            bind:hovered
            select={true}
            bind:selected
            paint={{
              "fill-color": [
                "case",
                ["!=", ["feature-state", "color"], null],
                ["feature-state", "color"],
                "rgba(255, 255, 255, 0)"
              ],
              "fill-opacity": 0.7
            }}
            order="water_name"
            visible={true}
          />
          <MapLayer
            id="pcon-line"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["==", ["feature-state", "selected"], true],
                "black",
                ["==", ["feature-state", "hovered"], true],
                "orange",
                "rgba(255, 255, 255, 0)"
              ],
              "line-width": [
                "case",
                ["==", ["feature-state", "selected"], true],
                2,
                1
              ]
            }}
            visible={true}
          />
        </MapSource>
      </Map>
    {/if}
  </div>
  <div class="meta">
    <span>hovered: {hovered || ""}</span>
    <span>
      selected:
      {#if selected}
        {selected}
        <button on:click|preventDefault={() => (selected = null)}>clear</button>
      {/if}
    </span>
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
    height: 360px;
  }
  .meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #444;
  }
  button {
    margin-left: 6px;
    padding: 0 4px;
    cursor: pointer;
  }
</style>
