import { gql } from "@apollo/client";
import dayjs from "dayjs";

const CURRENT_YEAR = '2024'

export const GET_SAKURA = gql`
  query getSakura {
    sakuradata {
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

const checkEndofSeason = (now) => {
  return now.isAfter(dayjs('2024/05/20')) ? dayjs(`${CURRENT_YEAR}/02/16`) : now
}

export const dateConfig = {
  //Current Spring Year
  currentYear: CURRENT_YEAR,
  //Beginning of Sakura Season
  min: dayjs("2024/02/16").valueOf(),
  //Ending of Sakura Season
  max: dayjs("2024/05/20").valueOf(),
  // now: dayjs().valueOf()
  now: checkEndofSeason(dayjs()).valueOf()
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
