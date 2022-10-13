import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardProps } from "./Card";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/slices/favo";

export default function MyListCard(props: CardProps) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeItem(props));
  };

  return (
    <Card sx={{ display: "flex", margin: 2 }}>
      <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div">{props.title}</Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.release_date}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1,
            pb: 1,
          }}
        >
          <Typography variant="subtitle2">{props.genre}</Typography>
          <Delete
            sx={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          />
        </Box>
      </Box>
      <Box flex={2}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={props.thumbnail}
          alt={props.title}
        />
      </Box>
    </Card>
  );
}
