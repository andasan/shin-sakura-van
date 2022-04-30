import React, { useContext } from "react";
import InputRange from "react-input-range";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { motion } from "framer-motion";
import MediaQuery from "react-responsive";

import { MapContext } from "context/MapContext";
import { dateConfig } from "configs/AppUtils";
import SakuraIcon from "assets/images/cherry.svg";

const VerticalSlider = () => {
  const { dateFilter, setDateFilter } = useContext(MapContext);
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="vertSlider"
    >
      <MediaQuery minWidth={451}>
      <div className="brand">
        <img src={SakuraIcon} alt="Sakura Logo" height={"40px"} width={"40px"} />
        Sakura Vancouver
      </div>
        </MediaQuery>
      
      <div className="vertSliderControl">
        <InputRange
          formatLabel={(value) => dayjs(value).format("MMM D")}
          step={86400000}
          maxValue={dateConfig.max}
          minValue={dateConfig.min}
          value={dateFilter}
          onChange={debounce((value) => {
            value.min =
              value.min >= dateConfig.min ? value.min : dateConfig.min;
            value.max =
              value.max <= dateConfig.max ? value.max : dateConfig.max;
            setDateFilter({ min: value.min, max: value.max });
          }, 16)}
        />
      </div>
    </motion.div>
  );
};

export default VerticalSlider;
