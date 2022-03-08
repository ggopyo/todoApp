import { Alert, Avatar, Box, Stack } from "@mui/material";
import AccountBox from "@mui/icons-material/AccountBox";
import DoneOutline from "@mui/icons-material/DoneOutline";
import React from "react";
import { deepOrange, green } from "@mui/material/colors";
import {
  statContentStyle,
  statTitleStyle,
  zeroTasksStyle,
} from "../styles/styles";
import { afs } from "../utils/afs";

const Statistic = ({ tasks, rootWidth, error }) => {
  //
  const statDirection = rootWidth < 500 ? "column" : "row";
  return (
    <Box sx={{ mb: 2 }}>
      {tasks.length === 0 ? (
        <Alert sx={zeroTasksStyle(rootWidth)}>
          입력된 할 일이 없습니다. 새로 작성해 주세요
        </Alert>
      ) : (
        <Stack direction={statDirection} spacing={2}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            spacing={2}
          >
            <Avatar sx={statTitleStyle(rootWidth)} variant="square">
              전체
            </Avatar>
            <Avatar sx={statContentStyle(rootWidth)} variant="rounded">
              {tasks.length}
            </Avatar>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            spacing={2}
          >
            <Avatar sx={statTitleStyle(rootWidth)} variant="square">
              완료
            </Avatar>
            <Avatar sx={statContentStyle(rootWidth)} variant="rounded">
              {tasks.filter((task) => task.done).length}
            </Avatar>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            spacing={2}
          >
            <Avatar sx={statTitleStyle(rootWidth)} variant="square">
              미완료
            </Avatar>
            <Avatar sx={statContentStyle(rootWidth)} variant="rounded">
              {tasks.filter((task) => !task.done).length}
            </Avatar>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Statistic;
