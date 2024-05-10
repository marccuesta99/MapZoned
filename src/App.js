// @ts-nocheck
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";


import Map from "./Map";

import "./styles.css";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {getTimezonesInRange} from "./dataProcessing/range.utils";

// Uncomment this line to process data mapping
// import "./dataProcessing/citiesToTimezoneDataProcessing";

const  QuickFilters = Object.freeze({
    BusinessHours: 0,
    Morning: 1,
    Afternoon: 2,
})

const presetDefinedRange = {
    [QuickFilters.BusinessHours]: {
        from: 8,
        to: 20,
    },
    [QuickFilters.Morning]: {
        from: 8,
        to: 12,
    },
    [QuickFilters.Afternoon]: {
        from: 12,
        to: 20,
    }
}

const TimeZoneMap = () => {
  const [hoverTimezone, setHoverTimezone] = useState({
    city: "",
    timezone: ""
  });
    const [timezonesInRange, setTimezonesInRange] = useState([]);

    const [range, setRange] = useState([presetDefinedRange[QuickFilters.BusinessHours].from, presetDefinedRange[QuickFilters.BusinessHours].to]);
    const setRangeFromPreset = (presetRange) => {
        setRange([presetDefinedRange[presetRange].from, presetDefinedRange[presetRange].to])

    }

    useEffect(() => {
        const filteredTimezones = getTimezonesInRange(range[0], range[1]);
        setTimezonesInRange(filteredTimezones);
    }, [range]);

    console.log('hoverTimezone', hoverTimezone);
  return (
    <div style={{width: "700px", height: "100%", margin:"16px auto", display: "flex", flexDirection: "column", gap: 24, alignItems: 'center'}}>
      <Map setHoverTimezone={setHoverTimezone} timezonesInRange={timezonesInRange} />

        <div style={{width: "100%", display: "flex", gap: 8, alignItems: 'center'}}>
            <h3>Range selected</h3>
            <p>From: {range[0]}</p>
            <p>To: {range[1]}</p>
        </div>
        <div style={{width: "100%", display: "flex",gap:8,  alignItems: 'center'}}>
            <button onClick={() => setRangeFromPreset(QuickFilters.Morning)}>Morning</button>
            <button onClick={() => setRangeFromPreset(QuickFilters.Afternoon)}>Afternoon</button>
            <button onClick={() => setRangeFromPreset(QuickFilters.BusinessHours)}>Tutta la jornatta</button>
        </div>

        <RangeSlider value={range} onInput={setRange} min={0} max={24}/>
        <ReactTooltip>
            {hoverTimezone.city ? (
                <center>
                    {hoverTimezone.city}
                    <br />
                    {hoverTimezone.timezone}
                </center>
            ) : (
                ""
            )}
        </ReactTooltip>
    </div>
  );
};

export default TimeZoneMap;
