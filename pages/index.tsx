import { Box, Stack } from "@mui/material";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  const isOpen = useSelector((state: RootState) => state.navs.isOpen);

  return (
    <>
      <Navbar />
      <Stack direction="row" marginTop={"80px"}>
        <Box
          flex={2}
          sx={{
            display: {
              xs: isOpen ? "block" : "none",
              md: "block",
              position: "sticky",
            },
          }}
        >
          <Sidebar />
        </Box>
        <Box
          flex={5}
          sx={{
            display: { xs: !isOpen ? "block" : "none", md: "block" },
          }}
        >
          <Feed />
        </Box>
      </Stack>
    </>
  );
};

export default Home;
