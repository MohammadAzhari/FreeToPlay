import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import GameCard, { CardProps } from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState(0);
  const [allData, setAllData] = useState<CardProps[]>([]);
  const [games, setGames] = useState<CardProps[]>([]);

  const { gener, platform, sort, search } = useSelector(
    (state: RootState) => state.filter
  );

  const getData = async () => {
    try {
      const { data }: { data: CardProps[] } = await axios.get("/api/games");
      setAllData(data);
      setIsLoading(false);
      updateData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = () => {
    let filteredData: CardProps[] = allData;
    if (search !== "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    if (gener !== "all") {
      filteredData = filteredData.filter((item) => item.genre === gener);
    }
    if (platform.length > 0) {
      filteredData = filteredData.filter((item) =>
        platform.find((i) => i === item.platform.split(" ")[0])
      );
    }
    if (sort === "alpha") {
      filteredData = filteredData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sort === "date") {
      filteredData = filteredData.sort(
        (a, b) =>
          Number(b.release_date.split("-").join("")) -
          Number(a.release_date.split("-").join(""))
      );
    }
    setGames(filteredData.slice(0, start + 10));
  };

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement?.scrollHeight &&
      games.length >= 10
    ) {
      setStart(start + 10);
      setIsLoading(true);
      setTimeout(() => {
        updateData();
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    setTimeout(() => {
      getData();
    }, 2000);
  });

  if (isLoading && start === 0) {
    return (
      <Box
        sx={{
          height: "400px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#eee",
      }}
    >
      {search.length > 0 && (
        <Alert severity="info" sx={{ width: "100%", fontSize: "20px" }}>
          searching for ... <Typography> {search} </Typography>
        </Alert>
      )}
      <Grid container>
        {games.length || isLoading ? (
          games.map((game) => (
            <Grid key={game.id} item lg={6} xs={12}>
              <GameCard {...game} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              height: "400px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">there is no games to show</Typography>
          </Box>
        )}
      </Grid>
      {isLoading && (
        <Box
          sx={{
            height: "100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
