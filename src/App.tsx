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
      <Box display="flex" alignItems="center" justifyContent="center">
        <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          TODO-LIST <CiBoxList size={66} />
        </h1>
      </Box>
      <Grid container spacing={2} sx={{ p: 10 }}>
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
