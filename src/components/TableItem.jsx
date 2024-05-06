import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const theme = createTheme();
const TableItem = (props) => {
  const { deleteItem } = props;
  return (
    <div >
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label="delete item"
          color="error"
          sx={{ backgroundColor: "#ececec" }}
          onClick={deleteItem}
        >
          <ClearIcon />
        </IconButton>
      </ThemeProvider>
    </div>
  );
};

export default TableItem;
