<script>
  import Box from "./Box.svelte";
  import raw from "./data/boba.json";
  import { timeDays, timeSundays } from "d3-time";
  import { timeParse } from "d3-time-format";
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime, scaleOrdinal } from "d3-scale";
  import { schemeBlues } from "d3-scale-chromatic";
  import _ from "lodash";

  const boxSize = 12;
  const padding = 2;
  const daysInAWeek = 7;

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const start = new Date("1-1-2021");
  const end = new Date("3-31-2022");

  let weekStarts = timeSundays(start, end);
  const prevWeek = weekStarts[0].addDays(-7);
  weekStarts = [prevWeek, ...weekStarts];

  const weeks = weekStarts.map((weekStart) => {
    const weekEnd = weekStart.addDays(daysInAWeek);
    const days = timeDays(weekStart, weekEnd);
    return days;
  });

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  $: width =
    boxSize * weekStarts.length +
    padding * (weekStarts.length - 1) +
    margin.left +
    margin.right;
  $: height =
    boxSize * daysInAWeek +
    padding * (daysInAWeek - 1) +
    margin.top +
    margin.bottom;

  $: xScale = scaleTime()
    .domain(extent(weekStarts))
    .range([0, width - margin.left - margin.right - boxSize]);
  $: yScale = scaleLinear()
    .domain([0, daysInAWeek - 1])
    .range([0, height - margin.top - margin.bottom - boxSize]);

  const parseTime = timeParse("%m/%d/%Y");
  const cleanData = raw.map((d) => ({
    ...d,
    date: parseTime(d.date),
  }));

  const stores = _.uniq(cleanData.map((d) => d.store));
  const colors = schemeBlues[3];
  const colorScale = scaleOrdinal().domain(stores).range(colors);

  let hovered = null;
</script>

<div class="container">
  <svg {height} {width}>
    <g class="chart" transform={`translate(${margin.left}, ${margin.top})`}>
      {#each weeks as week}
        <g class="week-column" transform={`translate(${xScale(week[0])}, 0)`}>
          {#each week as day}
            <Box
              date={day}
              {boxSize}
              {yScale}
              color={cleanData.find((d) => d.date.getTime() === day.getTime())
                ? colorScale(
                    cleanData.find((d) => d.date.getTime() === day.getTime())
                      .store
                  )
                : null}
              visible={day >= start && day <= end}
              bind:hovered
            />
          {/each}
        </g>
      {/each}
    </g>
  </svg>
  <p>{hovered}</p>
</div>

<style>
  .container {
    width: 100%;
    overflow: scroll;
  }
</style>
