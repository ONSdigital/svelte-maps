# @onsvisual/svelte-maps

[![npm version](https://badge.fury.io/js/@onsvisual%2Fsvelte-maps.svg)](https://www.npmjs.com/package/@onsvisual/svelte-maps)

Reusable map components for Svelte projects built on Maplibre GL JS.

Usage examples can be found in the **/src/App.svelte** file in this repo, which can be [previewed live here](https://onsdigital.github.io/svelte-maps/).

## Interaction options

You can mirror the Maps template `scrollZoomGuard` behaviour by enabling guarded scroll zoom:

```svelte
<Map
  id="map"
  style="./style.json"
  scrollZoomGuard={true}
/>
```

When enabled, map zoom via wheel/trackpad requires a modifier key (cmd/ctrl) plus scroll.

`scrollZoomGuard` maps to MapLibre `cooperativeGestures` and takes precedence over `options.cooperativeGestures` when both are provided.
