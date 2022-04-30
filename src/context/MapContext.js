import React, { createContext, useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";

import { dateConfig, isInRange, GET_SAKURA } from "configs/AppUtils";

const MapContext = createContext();

const MapContextProvider = ({ children }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [sakuraCtx, setSakuraCtx] = useState([]);
  const [filteredSakura, setFilteredSakura] = useState([]);  
  
  const [dateFilter, setDateFilter] = useState({ min: dateConfig.now, max: dateConfig.max });

  useEffect(() => {

    const tempArr = sakuraCtx?.filter((sakura) => {
      const startBloom = new Date(sakura.blooming.start).getTime();
      const endBloom = new Date(sakura.blooming.end).getTime();

      return isInRange(dateFilter, startBloom, endBloom);
    });

    setFilteredSakura(tempArr)
  }, [dateFilter, sakuraCtx]);

  const { loading, error, data: sakuras } = useQuery(GET_SAKURA);

  const fetchSakuras = useCallback(() => {
    const newArr = sakuras?.data.map((sakura) => {
      const bloomDates = {
        start: `${dateConfig.currentYear}/${sakura.blooming.split("-")[0]}`,
        end: `${dateConfig.currentYear}/${sakura.blooming.split("-")[1]}`
      };
      return { ...sakura, blooming: bloomDates };
    });
    setSakuraCtx(newArr);
  }, [sakuras]);

  const value = {
    loading,
    error,
    filteredSakura,
    setSakuraCtx,
    dateFilter,
    setDateFilter,
    fetchSakuras
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export { MapContext, MapContextProvider };
