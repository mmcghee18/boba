<script>
  import _ from "lodash";

  export let xScale;
  export let yScale;
  export let margin;

  const dayLabels = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
</script>

<g class="axes" transform={`translate(${margin.left / 2}, ${margin.top})`}>
  <g class="x-axis">
    {#each dayLabels as label, i}
      <text transform={`translate(0, ${yScale(i)})`}>{label}</text>
    {/each}
  </g>

  <g class="y-axis" />
</g>

<style>
  text {
    font-size: 0.7em;
  }
</style>
