import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";

import Cherry from "assets/images/cherry.svg";
import Placeholder from "assets/images/placeholder.jpg";
import { geoLocationParse } from "configs/SakuraMapConfig";

export default class SakuraMapTooltip extends Component {
  addDefaultSrc = (ev) => {
    console.log('err')
    ev.target.src = Placeholder;
  };
  render() {
    const { sakura } = this.props;

    const [locLat, locLong] = geoLocationParse(sakura.geolocation);

    return sakura ? (
      <div className="sakuraCard">
      {sakura.images === null && (
        <img
            src={Placeholder}
            alt="locationimage"
            className="sakura-popup-image"
            onError={this.addDefaultSrc}
          />
      )}
        {sakura.images ? (
          <img
            src={sakura.images ? sakura.images.split(",")[0] : Placeholder}
            alt="locationimage"
            className="sakura-popup-image"
            onError={this.addDefaultSrc}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={137}
            height={270}
            className="sakura-popup-image"
          />
        )}

        <FontAwesomeIcon
          className="location-icon"
          alt="Location"
          size="2x"
          icon={faLocationArrow}
        />
        <div className="popover-location-section">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${locLat},${locLong}`}
            rel="noopener noreferrer"
            target="_blank"
            className="location-link"
          >
            {sakura.location}
          </a>
          <br />
          {sakura.nieghborhood}
        </div>

        <div className="flex-container">
          <div className="column-left">
            <span className="popover-stat popover-mainstat">{sakura.cultivar}</span>
            <span className="popover-suffix popover-suffix-up">Cultivar</span>
            <div className="vertical-top-bottom">
              <span className="popover-stat popover-substat">
                {dayjs(sakura.blooming.start).format("MMM-DD")} -{" "}
                {dayjs(sakura.blooming.end).format("MMM-DD")}
              </span>
              <span className="popover-suffix">Blooming</span>
            </div>
          </div>
          {
            <div className="column-right">
              <span className="popover-suffix popover-suffix-up">
                Description
              </span>
              <br />
              {sakura.description}
            </div>
          }
        </div>
        <img src={Cherry} className="popover-icon cherry" alt="cherry" />
      </div>
    ) : (
      ""
    );
  }
}
