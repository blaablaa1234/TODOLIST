import { Card, CardContent, Typography } from "@mui/material";
import { MissionData } from "./To-Do-List";
import '../App.css'
interface CardProps {
    data: MissionData
}

const MissionsCard: React.FC<CardProps> = ({data}) => {
    return (
        <Card sx={{width:400,
            backgroundColor: 'lightblue',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            height:130,
            display:"grid"
        }} className="card">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="card-title" sx={{fontFamily:"Marker Felt, fantasy"}}>
                     {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-body" sx={{fontFamily:"Trebuchet MS, sans-serif	"}}>
                    <b>Difficulty:</b> {data.difficulty}
                    <Typography variant="body2" color="text.secondary" className="card-body" sx={{fontFamily:"Trebuchet MS, sans-serif	"}}>
                    <b>Completed:</b>  {data.completed.toString()}
                    </Typography>
                </Typography>
            </CardContent>
        </Card>
    )
}
export default MissionsCard