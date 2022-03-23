import React from "react";
// import { DebounceInput } from "react-debounce-input";
import { motion } from "framer-motion";

import SakuraIcon from "assets/images/cherry.svg";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="header"
    >
          {/* <DebounceInput
            minLength={2}
            className="sakuraNameSearch"
            placeholder="filter by name"
            value={searchTerm}
            debounceTimeout={500}
            onChange={(event) => updateSearchTerm(event.target.value)}
          /> */}
      <div className="brand">
        <img src={SakuraIcon} alt="Sakura Logo" height={"40px"} />
        Sakura Vancouver
      </div>
    </motion.div>
  );
};

export default Header;
