import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";

const ActionButtons = ({
  handleDelete,
  task,
  check,
  id,
  handleToggle,
  done,
  rootWidth,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mr: rootWidth < 500 ? 11 : null,
        mt: rootWidth < 500 ? 8 : null,
      }}
    >
      <ButtonBase>
        <Delete
          edge="end"
          onClick={() => {
            handleDelete(task);
          }}
          sx={{ mr: 1 }}
        />
      </ButtonBase>

      <Button
        sx={{ color: "#16ABB9", width: 40, p: 0 }}
        onClick={() => handleToggle(id)}
        variant="outlined"
      >
        {done ? "완료" : "미완료"}
      </Button>
    </Box>
  );
};

export default ActionButtons;
