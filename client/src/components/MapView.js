import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleQuantize()
  .domain([0, 100])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const getCasesToMillion = (cases, pop) => {
  return cases / (pop / 1000000);
};

const getColor = (inputCountry, data) => {
  let color;
  const country = data.filter((elem) => elem.country_code === inputCountry)[0];
  if (country !== undefined) {
    const casesToMillion = getCasesToMillion(
      country.latest.confirmed,
      country.country_population
    );
    color = colorScale(casesToMillion);
  } else {
    color = "#ffedea";
  }
  return color;
};

const getCases = (inputCountry, data) => {
  const country = data.filter((elem) => elem.country_code === inputCountry)[0];
  return country.latest.confirmed;
};

const doesDataExist = (inputCountry, data) => {
  const country = data.filter((elem) => elem.country_code === inputCountry)[0];
  if(country === undefined) return false
  return true;
}

const MapView = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  fill={getColor(geo.properties.ISO_A2, data)}
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    doesDataExist(geo.properties.ISO_A2, data) ?
                    props.setTooltipContent(
                      `${NAME} — ${rounded(POP_EST)}<br>${getCases(geo.properties.ISO_A2, data)} Confirmed Cases`
                    ) :
                    props.setTooltipContent(
                      `${NAME} — ${rounded(POP_EST)}<br>No Recorded Cases`
                    )
                    props.setCountry(NAME);
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                    props.setCountry("");
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapView);
