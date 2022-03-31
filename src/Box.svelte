<script>
  import { timeFormat } from "d3-time-format";

  export let date;
  export let boxSize;
  export let yScale;
  export let visible;
  export let color;

  let hovered;
  const onHover = (e) => {
    hovered = e.target.id;
  };
</script>

<rect
  id={timeFormat("%m-%d-%Y")(date)}
  width={boxSize}
  height={boxSize}
  y={yScale(date.getDay())}
  class:visible
  style={`fill: ${color}`}
  on:mouseenter={onHover}
  on:mouseleave={() => (hovered = undefined)}
/>

<style>
  rect {
    fill: #ebedf0;
    rx: 2;
    display: none;
    outline: 1px solid rgba(27, 31, 35, 0.06);
    outline-offset: -1px;
  }
  .visible {
    display: block;
  }
</style>
