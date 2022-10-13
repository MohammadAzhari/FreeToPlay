import { Close } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import MyListCard from "../components/MyListCard";
import Navbar from "../components/Navbar";
import { RootState } from "../redux/store";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyList: NextPage<IProps> = (props) => {
  const { favo } = useSelector((state: RootState) => state.favo);

  return (
    <Box
      sx={{ backgroundColor: "#eee", overflowY: "scroll", maxHeight: "100vh" }}
    >
      <Box
        sx={{
          marginTop: "20px",
          padding: "20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">My List :</Typography>
        <Close
          sx={{ cursor: "pointer" }}
          onClick={() => props.setOpenModal(false)}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="center"
      >
        <Grid container>
          {favo.length ? (
            favo.map((item) => (
              <Grid item xs={12} lg={6} key={item.id} width={"100%"}>
                <MyListCard {...item} />
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
      </Box>
    </Box>
  );
};

export default MyList;
