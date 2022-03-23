import { gql } from "@apollo/client";
import dayjs from "dayjs";

export function shouldShowSakura(
  sakura,
  verticalFilter,
  maxVertical,
  searchTerm,
  passFilter,
  verticalUnits
) {
  const startTime = new Date("2020/03/01").getTime();
  const endTime = new Date("2020/03/31").getTime();
  let verticalFiltered =
    verticalFilter.min > startTime || verticalFilter.max < endTime;

  let shouldIncludeSakura = true;

  if (verticalFiltered) {
    let verticalMultiplier = verticalUnits === "imperial" ? 3.28084 : 1;
    if (
      !sakura.vertical ||
      sakura.vertical * verticalMultiplier <
        verticalFilter.min * verticalMultiplier ||
      sakura.vertical * verticalMultiplier >
        verticalFilter.max * verticalMultiplier
    ) {
      shouldIncludeSakura = false;
    }
  }

  if (searchTerm.length > 2) {
    var sakuraName = sakura.name.toLowerCase();
    if (!sakuraName.includes(searchTerm.toLowerCase())) {
      shouldIncludeSakura = false;
    }
  }

  return shouldIncludeSakura;
}

export function getTotal(obj, value) {
  return Object.keys(obj).reduce(function (sum, key) {
    return sum + obj[key][value];
  }, 0);
}

function getCenterOfPolygon(points) {
  const xCoordinates = points.map((thisCoordinate) => {
    return thisCoordinate[0];
  });
  const yCoordinates = points.map((thisCoordinate) => {
    return thisCoordinate[1];
  });

  var minX = Math.min(...xCoordinates);
  var maxX = Math.max(...xCoordinates);
  var minY = Math.min(...yCoordinates);
  var maxY = Math.max(...yCoordinates);

  return [(maxY + minY) / 2, (maxX + minX) / 2];
}

export function getPointForSakura(sakura) {
  if (sakura.geometry.type === "Point") {
    return [sakura.geometry.coordinates[1], sakura.geometry.coordinates[0]];
  } else if (sakura.geometry.type === "Polygon") {
    // future: get the center of more than one of the sets of polygons?
    return getCenterOfPolygon(sakura.geometry.coordinates[0]);
  }
  return null;
}

export const GET_SAKURA = gql`
  query getSakura {
    data {
      id
      geolocation
      blooming
      cultivar
      description
      images
      location
      nieghborhood
      sources
    }
  }
`;

export const dateConfig = {
  //Current Spring Year
  currentYear: "2022",
  //Beginning of Sakura Season
  min: dayjs("2022/02/16").valueOf(),
  //Ending of Sakura Season
  max: dayjs("2022/05/20").valueOf(),
  now: dayjs().valueOf()
};

export function isInRange(dateFilter, start, end) {
  const filterStart = dayjs(dateFilter.min);
  const filterEnd = dayjs(dateFilter.max);
  const startBloom = dayjs(start);
  const endBloom = dayjs(end);

  if (!endBloom.isAfter(filterStart) || !startBloom.isBefore(filterEnd)) {
    // "Off range"
    return false;
  }
  // "Within range"
  return true;
}
