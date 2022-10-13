import { Close, Favorite, ViewList } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeNavs, openNavs } from "../redux/slices/navs";
import {
  Box,
  Stack,
  AppBar,
  Container,
  Badge,
  styled,
  Modal,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/assets/freetogame-logo.png";
import { RootState } from "../redux/store";
import MyList from "./MyList";
import { changeSearch } from "../redux/slices/filter";

const ResponsiveList = styled(Box)(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavRight = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: "none",
  width: "40%",

  [theme?.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const SearchInput = styled("input")(({ theme }) => ({
  "&:focus": {
    outline: "none",
  },
  padding: 10,
  borderRadius: 10,
  border: "none",
  width: "100%",
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.navs);
  const { favo } = useSelector((state: RootState) => state.favo);
  const [openModal, setOpenModal] = useState(false);
  const { search } = useSelector((state: RootState) => state.filter);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "static",
        }}
      >
        <AppBar>
          <Container>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent="space-between"
              m={"10px 0"}
            >
              <ResponsiveList>
                {isOpen ? (
                  <Close
                    onClick={() => {
                      dispatch(closeNavs());
                    }}
                  />
                ) : (
                  <ViewList
                    onClick={() => {
                      dispatch(openNavs());
                    }}
                  />
                )}
              </ResponsiveList>
              <Image src={logo} width={130} />
              <InputContainer>
                <SearchInput
                  placeholder="search ..."
                  value={search}
                  onChange={(e) => dispatch(changeSearch(e.target.value))}
                />
              </InputContainer>
              <NavRight>
                <Badge
                  badgeContent={favo.length}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setOpenModal(true)}
                  color="default"
                >
                  <Favorite color="action" />
                </Badge>
              </NavRight>
            </Stack>
          </Container>
        </AppBar>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: {
              xs: "100%",
              lg: "70%",
            },
            transform: "translate(-50% , -50%)",
          }}
        >
          <MyList setOpenModal={setOpenModal} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
