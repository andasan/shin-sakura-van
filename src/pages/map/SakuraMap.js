import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { sakuraMarker, createClusterCustomIcon } from "components/modules/map/SakuraMapIcons";

import Preloader from "components/modules/preloader/Preloader";
import SakuraMapTooltip from "components/modules/map/SakuraMapTooltip";
import LocateControl from "components/modules/map/Locate";

import {
  attribution,
  tileUrl,
  defaultMapState,
  geoLocationParse,
  locateOptions
} from "configs/SakuraMapConfig";
import { MapContext } from "context/MapContext";

/**
 *
 * @param {*} props
 * @returns <MapContainer />
 */

export default function SakuraMap(props) {
  const [mapState, setMapState] = useState(defaultMapState);
  const { loading, error, filteredSakura, fetchSakuras } = useContext(MapContext);

  useEffect(() => fetchSakuras(), [fetchSakuras]);

  if (loading) {
    return <Preloader />;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return filteredSakura ? (
    <>
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
                    activeSakura: sakura,
                    zoom: 15
                  }));
                }
              }}
            />
          ))}
        </MarkerClusterGroup>

        {/* <LocationMarker /> */}
        <LocateControl options={locateOptions} />

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
    </>
  ) : (
    <Preloader />
  );
}
