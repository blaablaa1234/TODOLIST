import React, { useState } from "react";
import "./App.css";
import MissionsCard from "./components/Card";
import { Grid, Box } from "@mui/material";
import { missionItems } from "./components/TodoList";
import { MissionData } from "./components/TodoList";
import { CiBoxList } from "react-icons/ci";

function App() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" >
        <h1 >  TODO-LIST </h1>
        <CiBoxList size={66} />
</Box>
      <Grid container spacing={2} padding={10}>
        {missionItems.map((missionData) => (
          <Grid key={missionData.id}>
            <MissionsCard data={missionData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
