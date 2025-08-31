import { Card, CardContent, Typography } from "@mui/material";
import { MissionData } from "./TodoList";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface CardProps {
  data: MissionData;
  onToggleComplete: (id: number) => void;
}
export const StyledCard = styled(Card)(({ theme }) => ({
  width: 400,
  backgroundColor: "lightblue",
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  height: 160,
  display: "flex",
}));
const MissionsCard: React.FC<CardProps> = ({ data, onToggleComplete }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-title"
          sx={{ fontFamily: "Marker Felt, fantasy" }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-body"
          sx={{ fontFamily: "Trebuchet MS, sans-serif	" }}
        >
          <b>Difficulty:</b> {data.difficulty}
          <Typography
            variant="body2"
            color="text.secondary"
            className="card-body"
            sx={{ fontFamily: "Trebuchet MS, sans-serif	" }}
          >
            <b>Completed:</b> {data.completed ? "True" : "False"}
          </Typography>
          {!data.completed && (
            <button
              className="completeButton"
              onClick={() => onToggleComplete(data.id)}
            >
              Mark as completed
            </button>
          )}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};
export default MissionsCard;
