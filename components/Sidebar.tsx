import {
  Autocomplete,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { geners, platforms } from "../utils/words";
import { useDispatch, useSelector } from "react-redux";
import {
  changeGener,
  changePlatform,
  changeSort,
  Platform,
  Sort,
} from "../redux/slices/filter";
import { RootState } from "../redux/store";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { platform: currentPlatform } = useSelector(
    (state: RootState) => state.filter
  );

  const handleGener = (e: any) => {
    const gener = e.target.outerText;
    if (!gener) {
      dispatch(changeGener("all"));
    } else {
      let isValid = geners.find((i) => i === gener);
      if (isValid) {
        dispatch(changeGener(gener));
      }
    }
  };

  const handlePlatform = (e: any) => {
    let platform: string = e.target.defaultValue;
    platform = platform.split(" ")[0];
    let newPlatform: string[];
    if (e.target.checked) {
      newPlatform = [...currentPlatform, platform];
    } else {
      newPlatform = currentPlatform.filter((i) => i !== platform);
    }
    dispatch(changePlatform(newPlatform as Platform));
  };

  const handleSort = (e: any) => {
    const sort = e.target.defaultValue as Sort;
    dispatch(changeSort(sort));
  };

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems={"center"}
        position={"fixed"}
      >
        <Box
          sx={{
            p: { xs: 5, md: 0 },
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Filters the games :
          </Typography>
          <div>
            <FormLabel id="demo-radio-buttons-group-label">
              Platform :
            </FormLabel>
          </div>
          {platforms.map((platform, i) => (
            <FormControlLabel
              key={i}
              onChange={handlePlatform}
              value={platform}
              control={<Checkbox sx={{ color: "black" }} />}
              label={platform}
              labelPlacement="start"
            />
          ))}
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Gener :</FormLabel>
          </div>
          <Autocomplete
            onChange={handleGener}
            disablePortal
            id="combo-box-demo"
            options={geners}
            sx={{ width: 300, marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="gener" />}
          />
          <Box
            display="flex"
            width={"100%"}
            marginTop={"10px"}
            alignItems="start"
            justifyContent={"start"}
          >
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Sort by :
              </FormLabel>
              <RadioGroup
                onChange={handleSort}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="default"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="default"
                />
                <FormControlLabel
                  value="alpha"
                  control={<Radio />}
                  label="alpha"
                />
                <FormControlLabel
                  value="date"
                  control={<Radio />}
                  label="date"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Sidebar;
