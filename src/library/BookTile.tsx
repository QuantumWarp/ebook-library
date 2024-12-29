import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Book } from "../helpers/book";

type BookTileProps = {
  book: Book;
  onSelect: () => void;
};

export function BookTile({ book, onSelect }: BookTileProps) {
  return (
    <Card sx={{ display: "flex", height: 200, width: 700, maxWidth: 700 }} onClick={onSelect}>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={book.image}
        />
        <CardContent sx={{ flex: "1", height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">
            {book.title || "Untitled"}
          </Typography>
          <Typography gutterBottom variant="h6">
            {book.author}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", overflow: "hidden" }}>
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
