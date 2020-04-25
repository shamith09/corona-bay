import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="home-page">
        <Container>
          <Grid container justify="center">
            <Grid item xs={12}>
              <h1 className="title-text" style={{marginBottom: "9%"}}>Corona Bay</h1>
              <p className="title-subtext">
                The world is facing a dire situation and not enough is being
                done. Corona Bay provides a suite of tools to aid people during
                these trying times. Users, medical professionals, and small
                businesses can all benefit from the functionalities of Corona
                Bay. We are providing these various tools in hopes of positively
                impacting our community and those around us. We are constantly
                looking to improve and collaborate to expand our set of tools.{" "}
              </p>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={10}
              style={{ marginTop: "0.02%" }}
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  size="large"
                  disableElevation={true}
                  style={{ height: "150%" }}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  size="large"
                  disableElevation={true}
                  style={{ height: "150%" }}
                >
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Home;
