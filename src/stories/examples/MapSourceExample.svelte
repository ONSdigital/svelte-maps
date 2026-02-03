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

  const mapSourceExample = `&lt;Map&gt;\n  &lt;MapSource id=&quot;pcon&quot; type=&quot;geojson&quot; data={geojson} promoteId=&quot;AREACD&quot;&gt;\n    &lt;MapLayer id=&quot;pcon&quot; type=&quot;fill&quot; data={data.pcon} /&gt;\n  &lt;/MapSource&gt;\n&lt;/Map&gt;`;

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
    <h3>MapSource</h3>
    <p>
      Registers a geojson or vector source on the map. Must be a direct child of Map.
      MapLayer components must be nested inside MapSource.
    </p>
    <ul>
      <li>Key props: id, type, data (geojson) or url (vector), layer, promoteId</li>
      <li>Zoom props: minzoom, maxzoom, tilesize</li>
      <li>Slots: child MapLayer components render after the source is ready</li>
    </ul>
    <pre><code>{@html mapSourceExample}</code></pre>
  </div>
  <div class="map">
    {#if geojson && data.pcon}
      <Map id="map-story-source" style={baseMapStyle} location={{ bounds: bounds.uk }} controls={true}>
        <MapSource
          id="pcon"
          type="geojson"
          data={geojson}
          promoteId={pconBounds.code}
          maxzoom={13}
        >
          <MapLayer
            id="pcon"
            data={data.pcon}
            type="fill"
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
        </MapSource>
      </Map>
    {/if}
  </div>
</div>

<style>
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
</style>
