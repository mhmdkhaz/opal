import React from "react";
// import images
import ShopImg from "../../../../../../assets/Shop/shopHero.jpeg";
// start in MUI
import { Box } from "@mui/material";
// import style
import { Styles } from "./ShopHero.styles";

function ShopHero() {
  return (
    <Box sx={{ mt: 7 }}>
      <Box component="figure">
        <Box component="img" src={ShopImg} sx={Styles.imgHero} />
      </Box>
    </Box>
  );
}

export default ShopHero;
