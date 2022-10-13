import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Alert, Button, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/slices/favo";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  release_date: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function GameCard(props: CardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (!added) {
      dispatch(addItem(props));
      setOpen(true);
    } else {
      dispatch(removeItem(props));
    }
    setAdded(added ? false : true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: "100%", margin: "20px", height: "90%" }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%", fontSize: "20px" }}>
          item added to your list
        </Alert>
      </Snackbar>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.release_date}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.thumbnail}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.short_description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            color={added ? "error" : "inherit"}
            onClick={handleClick}
          />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Button variant="contained" color="primary">
            go to the game URL
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
