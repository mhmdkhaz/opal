import React from "react";

// MUI
import { Box } from "@mui/material";

// import style
import { styles } from "./loadingPage.styles";

function Loading({ video }) {
  return (
    <Box sx={styles.root}>
      <img src={video} alt="Loading" />
    </Box>
  );
}

export default Loading;
