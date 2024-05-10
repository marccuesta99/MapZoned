import spacetime from "spacetime";
import tzArr, { tzArrRaw } from "./data/citiesInMap";
import { timezoneList as dropdownCities } from "./data/timeZoneInDropdown";
import dropdownCitiesGeo from "./data/dropdownCitiesGeo";
import mapCitiesGeo from "./data/mapCitiesGeo";

// Split data to a 10-ish chunk
const mapCitiesChunks = [[]];

let counter = 0;
tzArr.forEach((tz, index) => {
  counter++;

  mapCitiesChunks.at(-1).push(tz);

  if ((index + 1) % 10 === 0) {
    mapCitiesChunks.push([]);
    counter = 0;
  }
});
// console.log("mapCitiesChunks:", mapCitiesChunks);
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const mapResult = [];
async function loadMapData() {
  for (let i = 0; i < mapCitiesChunks.length; i++) {
    const chunk = mapCitiesChunks[i];
    mapResult.push(
      await Promise.all(
        chunk.map(async (cityName) => {
          const response = await fetch(
            `https://geocode.xyz/${cityName}?json=1&auth=`
          );

          const data = await response.json();
          // console.log(cityName, data.longt, data.latt, data);
          return {
            cityName,
            long: data.longt,
            lat: data.latt
          };
        })
      )
    );

    await timer(1200);
  }
}

// loadMapData().then(() => {
//   console.log(
//     "MAP DATA!!!",
//     JSON.stringify(
//       mapResult.reduce((acc, curr) => {
//         return acc.concat(curr);
//       }, [])
//     )
//   );
// });

const dropdownCitiesChunks = [[]];
Object.entries(dropdownCities).forEach(([key, value], index) => {
  counter++;

  dropdownCitiesChunks.at(-1)[key] = value;

  if ((index + 1) % 10 === 0) {
    dropdownCitiesChunks.push({});
    counter = 0;
  }
});

const result = [];
async function loadData() {
  for (let i = 0; i < dropdownCitiesChunks.length; i++) {
    const chunk = dropdownCitiesChunks[i];
    result.push(
      await Promise.all(
        Object.entries(chunk).map(async ([city, tz]) => {
          const cityName = city.slice(city.indexOf("/") + 1);
          const response = await fetch(
            `https://geocode.xyz/${cityName}?json=1&auth=`
          );

          const data = await response.json();
          // console.log(cityName, data.longt, data.latt, data);
          return {
            cityName,
            long: data.longt,
            lat: data.latt,
            tz
          };
        })
      )
    );

    await timer(1500);
  }
}

// loadData().then(() => {
//   console.log(
//     JSON.stringify(
//       result.reduce((acc, curr) => {
//         return acc.concat(curr);
//       }, [])
//     )
//   );
// });

const newMapGeo = mapCitiesGeo.map((mcg) => {
  const timeZoneName = tzArrRaw.find((zz) =>
    zz.replaceAll("-", "_").includes(mcg.cityName)
  );
  // console.log("matched:", timeZoneName);
  return {
    ...mcg,
    timeZoneName
  };
});

// console.log(newMapGeo);

const finalMap = {};
newMapGeo.forEach((currCity) => {
  let s = spacetime().goto(currCity.timeZoneName);
  const tz = s.timezone();

  let cloestCity = {};
  let cloestDiff = Infinity;

  // Find nearest cities with same offset
  dropdownCitiesGeo.forEach((c) => {
    const beforeDecimal = `${tz.default_offset}`.split(".")[0];
    const decimalConverted = parseInt(
      `${tz.default_offset}`.split(".")[1] || 0,
      0
    );
    const offsetInTimeFormat = `${beforeDecimal}:${`${
      (decimalConverted / 10) * 60
    }0`.slice(0, 2)}`;
    // if (!Number.isInteger(tz.default_offset)) {
    //   console.log(currCity.cityName, tz.default_offset, offsetInTimeFormat);
    // }
    // console.log(c.cityName, tz.default_offset);
    const keyword = offsetInTimeFormat;
    if (c.tz?.includes(keyword)) {
      const diff = Math.sqrt(
        Math.pow(parseFloat(c.long) - parseFloat(currCity.long), 2) +
          Math.pow(parseFloat(c.lat) - parseFloat(currCity.lat), 2)
      );
      // console.log(
      //   `${tz.default_offset} ${currCity.cityName} vs ${
      //     c.cityName
      //   }: ${diff}, ${parseFloat(currCity.long)}/${parseFloat(
      //     currCity.lat
      //   )} ${parseFloat(c.long)}/${parseFloat(c.lat)}`
      // );
      if (diff < cloestDiff) {
        cloestCity = c;
        cloestDiff = diff;
      }
    }
  });

  // if (Object.keys(cloestCity).length > 0) {
  finalMap[currCity.timeZoneName] = cloestCity.tz;
  // }
});

console.log(JSON.stringify(finalMap));

// console.log(JSON.stringify(data));
// });

// .forEach((cityGeo) => {

// });

// tzArr.forEach((t) => {
//   let s = spacetime().goto(t);
//   const tz = s.timezone();

//   return !s;
// });
