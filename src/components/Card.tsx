import { MissionData } from "./TodoList";
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface CardProps {
  data: MissionData;
  onToggleComplete: (id: number) => void;
  onDeleteRequest: (item: MissionData) => void;
  isDeleting?: boolean;
  onEditRequest: (item: MissionData) => void;
}

export const StyledCard = styled(Card)(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.grey[300],
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  height: 160,
  display: "flex",
  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
}));

const MissionsCard: React.FC<CardProps> = ({
  data,
  onToggleComplete,
  onDeleteRequest,
  isDeleting,
  onEditRequest,
}) => {
  return (
    <StyledCard id={`card-${data.id}`} className={isDeleting ? "fade-out" : ""}>
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
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-body"
          sx={{ fontFamily: "Trebuchet MS, sans-serif	" }}
        >
          <b>Completed:</b> {data.completed ? "True" : "False"}
        </Typography>

        <div style={{ marginTop: "10px" }}>
          <Button color="error" onClick={() => onDeleteRequest(data)}>
            Delete
          </Button>

          {!data.completed && (
            <Button
              color="success"
              style={{ marginLeft: "10px" }}
              onClick={() => onToggleComplete(data.id)}
            >
              Mark as completed
            </Button>
          )}
          <Button onClick={() => onEditRequest(data)} color="info">
            Edit
          </Button>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default MissionsCard;
