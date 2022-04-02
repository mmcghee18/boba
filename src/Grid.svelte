<script>
  import Box from "./Box.svelte";
  import Axes from "./Axes.svelte";
  import Legend from "./Legend.svelte";
  import raw from "./data/boba.json";
  import { timeDays, timeSundays } from "d3-time";
  import { timeParse, timeFormat } from "d3-time-format";
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

  const margin = { top: 30, right: 10, bottom: 10, left: 30 };

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

  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const stores = _.uniq(cleanData.map((d) => d.store));
  //const colors = _.range(stores.length).map((d) => getRandomColor());
  const colors = [
    "#8d151c",
    "#d0c97b",
    "#46728d",
    "#b64811",
    "#747c9c",
    "#97c4bc",
    "#876cfa",
    "#7a2f2c",
    "#363dad",
    "#28f524",
    "#3eabe8",
    "#81193c",
    "#b4d89b",
  ];
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
              id={timeFormat("%m-%d-%Y")(day)}
              width={boxSize}
              height={boxSize}
              y={yScale(day.getDay())}
              visible={day >= start && day <= end}
              color={cleanData.find((d) => d.date.getTime() === day.getTime())
                ? colorScale(
                    cleanData.find((d) => d.date.getTime() === day.getTime())
                      .store
                  )
                : null}
              bind:hovered
            />
          {/each}
        </g>
      {/each}
    </g>

    <!-- <Legend {stores} {colorScale} {boxSize} /> -->
    <Axes {yScale} {xScale} {margin} />
  </svg>
  <p>{hovered}</p>
</div>

<style>
  .container {
    width: 100%;
    overflow: scroll;
  }
</style>
