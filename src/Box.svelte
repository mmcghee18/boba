<script>
  export let id = "";
  export let width = 10;
  export let height = 10;
  export let y = 0;
  export let visible = true;
  export let color = "lightgrey";
  export let hovered;

  const onHover = (e) => {
    hovered = e.target.id;
  };
</script>

<rect
  {id}
  {width}
  {height}
  {y}
  class:visible
  style={`fill: ${color}`}
  on:mouseenter={onHover}
  on:mouseleave={() => (hovered = null)}
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
