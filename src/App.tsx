import React , { useState } from 'react'
import './App.css'
import MissionsCard from './components/Card'
import { Grid } from '@mui/material'
import { missionItems } from './components/To-Do-List'
import { MissionData } from './components/To-Do-List'
import { CiBoxList } from "react-icons/ci";
function App() {

  return (
    <>
    <h1>TODO-LIST <CiBoxList style={{marginBottom:"-7"}}/></h1>
      <Grid container spacing={2} sx={{p:10}} >
        {missionItems.map((missionData) => (
          <Grid key={missionData.id}>
            <MissionsCard data={missionData}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default App
