import { Typography } from "@mui/material";
import React from "react";
import { titleStyle } from "../styles/styles";

const Title = ({ rootWidth }) => {
  return (
    <div>
      {" "}
      <Typography variant="h1" sx={titleStyle(rootWidth)} align="center">
        Hello TODO
      </Typography>
    </div>
  );
};

export default Title;
