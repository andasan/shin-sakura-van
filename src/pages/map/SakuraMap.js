import React, { useState, useEffect, useContext } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import SakuraIcon from "assets/images/cherry.svg";

import { attribution, tileUrl, defaultMapState, geoLocationParse } from "configs/SakuraMapConfig";
import SakuraMapTooltip from "components/modules/map/SakuraMapTooltip";
import Preloader from "components/modules/preloader/Preloader";
import { MapContext } from "../../context/MapContext";

/**
 *
 * @param {*} props
 * @returns <MapContainer />
 */

const sakuraMarker = L.icon({
  iconUrl: SakuraIcon,
  iconSize: [35, 35],
  iconAnchor: [20, 0]
});

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true)
  });
};

export default function SakuraMap(props) {
  const [mapState, setMapState] = useState(defaultMapState);
  const { loading, error, filteredSakura, fetchSakuras } =
    useContext(MapContext);

  useEffect(() => {
    fetchSakuras();
  }, [fetchSakuras]);

  if (loading) {
    return <Preloader />;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return filteredSakura ? (
    <MapContainer
      center={[mapState.lat, mapState.lng]}
      zoom={mapState.zoom}
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 500
      }}
      updateWhenZooming={false}
      updateWhenIdle={true}
      preferCanvas={true}
      minZoom={mapState.minZoom}
    >
      <TileLayer attribution={attribution} url={tileUrl} />
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {filteredSakura.map((sakura, idx) => (
          <Marker
            key={`sakura-${sakura.id}`}
            position={[...geoLocationParse(sakura.geolocation)]}
            icon={sakuraMarker}
            title={sakura.description}
            eventHandlers={{
              click: () => {
                setMapState((prevMapState) => ({
                  ...prevMapState,
                  activeSakura: sakura
                }));
              }
            }}
          />
        ))}
      </MarkerClusterGroup>
      {mapState.activeSakura && (
        <Popup
          className="sakura-popup"
          position={[...geoLocationParse(mapState.activeSakura.geolocation)]}
          onClose={() => {
            setMapState((prevMapState) => ({
              ...prevMapState,
              activeSakura: null
            }));
          }}
        >
          <SakuraMapTooltip sakura={mapState.activeSakura} />
        </Popup>
      )}
    </MapContainer>
  ) : (
    "Data is loading..."
  );
}
