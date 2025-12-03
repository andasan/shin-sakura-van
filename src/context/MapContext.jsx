import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { dateConfig, isInRange, GET_SAKURA } from "@/configs/AppUtils";

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

  const { loading, error, data } = useQuery(GET_SAKURA);

  const sakuraNodes = useMemo(() => {
    return (
      data?.sakuradataCollection?.edges
        ?.map((edge) => edge?.node)
        .filter(Boolean) ?? []
    );
  }, [data]);

  const fetchSakuras = useCallback(() => {
    if (!sakuraNodes.length) {
      setSakuraCtx([]);
      return;
    }

    const newArr = sakuraNodes.map((sakura) => {
      const [start = "", end = ""] = sakura?.blooming?.split("-") ?? [];
      const bloomDates = {
        start: `${dateConfig.currentYear}/${start}`,
        end: `${dateConfig.currentYear}/${end}`
      };
      return { ...sakura, blooming: bloomDates };
    });
    setSakuraCtx(newArr);
  }, [sakuraNodes]);

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
