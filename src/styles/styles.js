export const rootDivStyle = (rootWidth) => {
  return {
    maxWidth: 500,
    minWidth: 400,
    margin: "auto",
  };
};
export const taskContainerStyle = (rootWidth) => {
  return {
    width: rootWidth < 500 ? 300 : 500,
  };
};
export const statTitleStyle = (rootWidth) => {
  return {
    bgcolor: "#181C3B",
    width: rootWidth < 500 ? 200 : 100,
  };
};
export const statContentStyle = (rootWidth) => {
  return {
    bgcolor: "#16ABB9",
    width: rootWidth < 500 ? 84 : null,
  };
};

export const numberingStyle = {
  ml: -1,
  width: 30,
  height: 25,
  backgroundColor: "#BDBDBD",
  borderRadius: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};
export const alertStyle = (error, rootWidth) => {
  return {
    display: error.value ? null : "none",
    mb: 1,
    width: rootWidth < 500 ? 268 : 469,
  };
};

export const listStyle = (rootWidth) => {
  return {
    border: "0.1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
    alignItems: rootWidth < 500 ? "flex-start" : null,
    minHeight: rootWidth < 500 ? "50px" : null,
    display: "flex",
    justifyContent: "flex-end",
    height: rootWidth < 500 ? 120 : null,
  };
};
export const noneTextStyle = (rootWidth) => {
  return {};
};
export const dividerStyle = (rootWidth) => {
  return {
    "&::before, &::after": {
      borderColor: "#16ABB9",
      minWidth: rootWidth < 500 ? 115 : 215,
      maxWidth: rootWidth < 500 ? 115 : 215,
    },
  };
};
export const zeroTasksStyle = (rootWidth) => {
  return {
    mt: 1,
    mb: 1,
    width: rootWidth < 500 ? 268 : 469,
  };
};
export const buttonStyle = (rootWidth) => {
  return {
    backgroundColor: "#16ABB9",
    color: "white",
    borderRadius: 2,
    width: rootWidth < 500 ? 300 : 200,
    height: 50,
  };
};
export const boxStyle = (rootWidth) => {
  return {
    display: "flex",
    flexDirection: rootWidth < 500 ? "column" : "row",
    mb: 1,
  };
};

export const inputStyle = (rootWidth) => {
  return {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ffe8b3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffe8b3",
      },
      backgroundColor: "white",
      border: "solid 0.1px #16ABB9",
      borderRadius: 2,
      mr: 1,
      width: 300,
      height: 50,
      mb: rootWidth < 500 && 1,
    },
  };
};

export const titleStyle = (rootWidth) => {
  return { width: rootWidth < 500 ? 300 : 500 };
};
