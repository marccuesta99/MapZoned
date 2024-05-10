// @ts-nocheck
import { useEffect, useState, useRef, memo } from "react";
import * as d3 from "d3";

import tzList from "./tzList.json";
import mapToDropdownMap from "./citiesToTimeZoneMap";

import "./styles.css";
import {getSunlightColor} from "./dataProcessing/range.utils";

const scale = 0.52;
const width = 620;
const height = 356;

const Map = ({ setHoverTimezone, timezonesInRange }) => {
  const svgRef = useRef();
  const [selectedTimezone, setSelectedTimezone] = useState({
    city: "",
    timezone: ""
  });

  useEffect(() => {
    if (svgRef) {
      const path = d3.geoPath();

      const svg = d3
        .select(svgRef.current)
        .style("width", width)
        .style("height", height);

      // Clear the previous one if use select a timezone
      // TODO: handle the case of toggling timezone
      if (!!selectedTimezone) {
        svg.selectAll("svg > *").remove();
      }

      // Draw the timezones
      svg
        .insert("g", ".graticule")
        .attr("style", "cursor:pointer;")
        .selectAll("path")
        .data(tzList)
        .enter()
        .append("path")
        .attr("d", path)
        .on("mouseenter", (e, d) => {
          setHoverTimezone({ city: d.id, timezone: mapToDropdownMap[d.id] });
        })
        .on("mouseleave", (e, d) => {
          setHoverTimezone({});
        })
        .on("click", (e, d) => {
          if (selectedTimezone.city === d.id) {
            setSelectedTimezone({});
          } else {
            setSelectedTimezone({
              city: d.id,
              timezone: mapToDropdownMap[d.id]
            });
          }
        })
        .attr("class", (d) => {
          return "geography";
        })
        .attr("opacity", (d) => {
          return 1;
        })
        .attr("fill", (d) => {
          return getSunlightColor(d.id);
        })
        .attr("opacity", (d) => {
          if(!timezonesInRange.includes(d.id)){
            return '0.4'
          }
        })
        .attr("stroke-width", 3)
        .attr("stroke", (d) => {
          return "#FFFFFF";
        })
        .attr("transform", `scale(${scale})`)
        .append("title")
        .text((d) => {
          return d.id;
        });
    }
  }, [svgRef, selectedTimezone, timezonesInRange]);

  return (
    <div >
      <svg ref={svgRef} />
    </div>
  );
};

export default memo(Map);
