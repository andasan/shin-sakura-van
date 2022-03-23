export const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://vcbf.ca">https://vcbf.ca/</a>'

export const tileUrl = 'https://api.mapbox.com/styles/v1/andasan/cl117tuca000114n0tq1r8epb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5kYXNhbiIsImEiOiJjazQzajNjMWswOGliM210NnUwaDI2bWYwIn0.rKu9TXEWdCYYlHHqZ6YMKQ';

export const defaultMapState = {
  lat: 49.246292,
  lng: -123.116226,
  zoom: 11,
  minZoom: 2,
  activeSakura: null,
}

export const geoLocationParse = (loc) => {
  const { lat, long } = JSON.parse(loc);
  return [Number.parseFloat(lat), Number.parseFloat(long)];
};