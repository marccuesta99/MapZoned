import citiesToTimeZoneMap from "../citiesToTimeZoneMap";
import mapCititesGeo from "./data/mapCitiesGeo";
import dropdownCitiesGeo from "./data/dropdownCitiesGeo";
import SunCalc from  'suncalc'

function extractTimezoneOffset(timezoneStr) {
    const regex = /GMT([-+])(\d+):\d+/;
    const match = regex.exec(timezoneStr);
    if (match) {
        const sign = match[1];
        const hours = parseInt(match[2]);
        return sign === '-' ? -hours : hours;
    } else {
        return null;
    }
}

export const getTimezonesInRange = (startHour, endHour) => {
    const timezonesInRange = [];
    const currentHour = new Date().getUTCHours(); // Get current hour in UTC


    Object.entries(citiesToTimeZoneMap).forEach(([key, value]) => {
        const offset = extractTimezoneOffset(value);
        const timezoneStartHour = (24 + startHour + currentHour - offset) % 24; // Calculate start hour in timezone
        const timezoneEndHour = (24 + endHour + currentHour - offset) % 24; // Calculate end hour in timezone

        if (timezoneStartHour < timezoneEndHour) {
            if (timezoneStartHour <= 0 && timezoneEndHour >= 0) {
                timezonesInRange.push(key);
            }
        } else {
            // Range wraps around midnight
            if (timezoneStartHour <= 0 || timezoneEndHour >= 0) {
                timezonesInRange.push(key);
            }
        }
    })


    return timezonesInRange;
};

export const getSunlightColor = (currentCity) => {
    const cityNameSelected = currentCity.split("/")[1]
    const {lat, long} = mapCititesGeo.find(({cityName}) => cityName === cityNameSelected) || {}
    if(currentCity ==='America/Thule') console.log(cityNameSelected, lat, long)

    const sunPos = SunCalc.getPosition(/*Date*/ new Date(), /*Number*/ lat, /*Number*/ long)

    return calculateSunlightColor(sunPos.altitude, sunPos.azimuth)
};

const calculateSunlightColor = (altitude, azimuth) => {
    // Normalize the altitude to be between 0 and 1
    const normalizedAltitude = altitude / Math.PI;

    // Normalize the azimuth to be between 0 and 1
    const normalizedAzimuth = (azimuth + Math.PI) / (2 * Math.PI);
    const positiveAzimuth = normalizedAzimuth < 0 ? normalizedAzimuth + 1 : normalizedAzimuth;

    // Define RGB values for different sky colors
    const darkBlue = [0, 0, 139]; // Dark blue for night
    const lightBlue = [135, 206, 235]; // Light blue for daytime
    const yellow = [255, 255, 0]; // Yellow for daylight
    const orange = [255, 165, 0]; // Orange for sunset

    let color;

    if (normalizedAltitude < 0) {
        // Nighttime, return dark blue color
        color = rgbToHex(darkBlue[0], darkBlue[1], darkBlue[2]);
    } else if (normalizedAltitude < 0.25) {
        // Dawn, interpolate between light blue and yellow based on azimuth
        const ratio = positiveAzimuth < 0.5 ? positiveAzimuth * 2 : (1 - positiveAzimuth) * 2;
        color = interpolateColors(lightBlue, yellow, ratio);
    } else if (normalizedAltitude < 0.5) {
        // Daytime, return yellow color
        color = rgbToHex(yellow[0], yellow[1], yellow[2]);
    } else if (normalizedAltitude < 0.75) {
        // Sunset, interpolate between yellow and orange based on azimuth
        const ratio = positiveAzimuth < 0.5 ? positiveAzimuth * 2 : (1 - positiveAzimuth) * 2;
        color = interpolateColors(yellow, orange, ratio);
    } else {
        // Nighttime, return dark blue color
        color = rgbToHex(darkBlue[0], darkBlue[1], darkBlue[2]);
    }

    return color;
};

// Function to interpolate between two RGB colors
const interpolateColors = (color1, color2, ratio) => {
    const r = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
    const g = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
    const b = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);
    return rgbToHex(r, g, b);
};

// Convert RGB to hex color
const rgbToHex = (r, g, b) => {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
};