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
            // Range doesn't wrap around midnight
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
    const currentHour = new Date().getUTCHours(); // Get current hour in UTC
    const timezone = citiesToTimeZoneMap[currentCity];
    const cityNameSelected = currentCity.split("/")[1]
    console.log('cityname', cityNameSelected, mapCititesGeo.find(({cityName}) => cityName === cityNameSelected))
    const {lat, long} =mapCititesGeo.find(({cityName}) => cityName === cityNameSelected) || {}
    const sunPos = SunCalc.getPosition(/*Date*/ new Date(), /*Number*/ lat, /*Number*/ long)
    console.log('sunPos', lat, long, sunPos, calculateSunlightColor(sunPos.altitude, sunPos.azimuth))
    const offset = extractTimezoneOffset(timezone);
    const month = new Date().getMonth() + 1;
    return calculateSunlightColor(sunPos.altitude, sunPos.azimuth)

   /* // Calculate the sun's height factor based on the month, current hour, and offset
    const sunHeightFactor = calculateSunHeightFactor(currentHour, offset, month);

    // Define the range of colors from blue to yellow
    const blueColor = [70, 105, 212]; // RGB for less muted blue
    const yellowColor = [243, 245, 108]; // RGB for less muted yellow

    // Interpolate between blue and yellow based on the current hour
    const interpolationFactor = ((currentHour + sunHeightFactor + offset) / 24); // Interpolation factor based on hour (0 to 1)
    const interpolatedColor = blueColor.map((channel, index) => {
        // Interpolate each RGB channel separately
        return Math.round(channel + interpolationFactor * (yellowColor[index] - channel));
    });

    // Convert RGB to hex color representation
    const hexColor = rgbToHex(...interpolatedColor);

    return hexColor;*/
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

// Function to convert a decimal RGB value to hexadecimal
const toHex = (value) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const calculateSunHeightFactor = (currentHour, offset, month) => {
    // Convert the current hour to the local time in the timezone
    const localHour = (currentHour + offset) % 24;

    // Calculate the sun's height based on the month and local hour
    let sunHeightFactor;
    if (month >= 3 && month <= 9) {
        // For months from March to September (inclusive), assume the sun is above the horizon
        sunHeightFactor = 1;
    } else {
        // For other months, calculate the sun's height based on the local hour
        if (localHour < 6 || localHour > 18) {
            // Before sunrise or after sunset
            sunHeightFactor = 0;
        } else if (localHour < 12) {
            // Morning hours
            sunHeightFactor = (localHour - 6) / 6; // Interpolating between 0 and 1
        } else {
            // Afternoon hours
            sunHeightFactor = 1 - (localHour - 12) / 6; // Interpolating between 1 and 0
        }
    }

    return sunHeightFactor;
};

// Convert RGB to hex color
const rgbToHex = (r, g, b) => {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
};