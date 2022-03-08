import { Divider, Typography } from "@mui/material";
import React from "react";
import { dividerStyle } from "../styles/styles";

const CustomDivider = ({ rootWidth, text }) => {
  return (
    <Divider sx={{ ...dividerStyle(rootWidth), mb: 2 }}>
      <Typography>{text}</Typography>
    </Divider>
  );
};

export default CustomDivider;
