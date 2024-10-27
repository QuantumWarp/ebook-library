import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Summary } from "../models/summary";

type BookTileProps = {
  summary: Summary;
  onSelect: () => void;
};

export function BookTile({ summary, onSelect }: BookTileProps) {
  return (
    <Card sx={{ display: "flex", height: 200, width: 700 }} onClick={onSelect}>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          width="300px"
          sx={{ maxWidth: 150 }}
          image={summary.image}
        />
        <CardContent sx={{ flex: "1", height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">
            {summary.title}
          </Typography>
          <Typography gutterBottom variant="h6">
            {summary.author}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", overflow: "hidden" }}>
            {summary.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
