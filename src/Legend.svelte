<script>
  import Box from "./Box.svelte";

  export let stores;
  export let colorScale;
  export let boxSize;

  console.log(stores);
</script>

<g class="legend">
  {#each stores as store, i}
    <Box
      id={`legend-${store}`}
      width={10}
      height={10}
      y={i * 12}
      visible={true}
      color={"blue"}
    />
  {/each}
</g>
