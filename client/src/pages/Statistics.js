import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import DataTable from "../components/DataTable";
import { Grid, Container } from "@material-ui/core";
import ReactTooltip from "react-tooltip";

const Statistics = () => {
  const [content, setContent] = useState("");
  const [country, setCountry] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
      .then((res) => res.json())
      .then((response) => {
        setData(response.locations);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? null : (
        <div style={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={8}>
              <MapView setCountry={setCountry} setTooltipContent={setContent} data={data} />
              <ReactTooltip html="true">{content}</ReactTooltip>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Statistics;
