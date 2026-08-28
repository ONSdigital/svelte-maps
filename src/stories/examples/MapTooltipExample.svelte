<script>
  import { getData, getColor, getTopo } from "../../js/utils.js";
  import Map from "../../Map.svelte";
  import MapSource from "../../MapSource.svelte";
  import MapLayer from "../../MapLayer.svelte";
  import MapTooltip from "../../MapTooltip.svelte";

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

  const mapTooltipExample = `&lt;MapLayer id=&quot;pcon-fill&quot; type=&quot;fill&quot; hover bind:hovered&gt;\n  &lt;MapTooltip content={\`Code: ${hovered}\`} /&gt;\n&lt;/MapLayer&gt;`;

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
    <h3>MapTooltip</h3>
    <p>
      Popup tooltip anchored to the hovered feature. Must be nested inside MapLayer,
      which must be nested inside MapSource within Map.
    </p>
    <ul>
      <li>Key prop: content (string or HTML)</li>
      <li>Requires MapLayer hover and a bound hovered ID</li>
    </ul>
    <pre><code>{@html mapTooltipExample}</code></pre>
  </div>
  <div class="map">
    {#if geojson && data.pcon}
      <Map id="map-story-tooltip" style={baseMapStyle} location={{ bounds: bounds.uk }} controls={true}>
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
          >
            <MapTooltip content={`Code: ${hovered || ""}`} />
          </MapLayer>
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
